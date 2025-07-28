import { Component, inject, OnInit} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbModal, NgbModalModule, NgbPaginationModule,  } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { CommonModule, DatePipe, NgClass, SlicePipe } from '@angular/common';
import { ListFilterPipe } from '../../../shared/pipes/list-filter.pipe';
import { FormsModule } from '@angular/forms';
import { IcontactForm } from '../../../shared/IcontactForm/icontact-form';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { ContactService } from '../../../core/services/Contact/contact.service';
@Component({
  selector: 'app-dashdoard-contact-submissions',
  imports: [ RouterLink , RouterLinkActive   ,NgbPaginationModule, NgbModalModule, ListFilterPipe  , NgClass , FormsModule   , CommonModule],
  templateUrl: './dashdoard-contact-submissions.component.html',
  styleUrl: './dashdoard-contact-submissions.component.scss'
})
export class DashdoardContactSubmissionsComponent implements OnInit {

private readonly authService = inject(AuthService);
  private readonly contactService = inject(ContactService);
  private readonly router = inject(Router);
  rows: IcontactForm[] = [];
  filteredRows: IcontactForm[] = [];
  filterText: string = '';
  currentPage: number = 1;
  pageSize: number = 5; 
  totalCount: number = 0;
  totalPages: number = 1;
  sortBy: string = 'createdAt';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedSubmission: IcontactForm | null = null;
  isLoading: boolean = false;
  filterSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  columns = [
    { name: '#', prop: 'id', sortable: true },
    { name: 'Name', prop: 'name', sortable: true },
    { name: 'Email', prop: 'email', sortable: true },
    { name: 'Mobile', prop: 'mobile', sortable: true },
    { name: 'Company', prop: 'company', sortable: true },
    { name: 'Date Received', prop: 'createdAt', sortable: true },
    { name: 'Actions', prop: 'actions', sortable: false }
  ];

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.filterSubject.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe(value => {
      this.filterText = value;
      this.currentPage = 1;
      this.loadData();
    });

    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData() {
    this.isLoading = true;
    this.contactService.getContactSubmissions(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.rows = res.data;
        this.totalCount = res.totalCount;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize) || 1;
        this.filteredRows = this.filterRows([...this.rows]);
        this.sortData();
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          const refreshToken = this.authService.getRefreshToken();
          if (refreshToken) {
            this.authService.refreshToken(refreshToken).subscribe({
              next: (authResponse) => {
                this.authService.saveTokens(authResponse);
                if (!this.authService.getUser()) {
                  this.authService.clearTokens();
                  this.router.navigate(['/login']);
                } else {
                  this.loadData();
                }
              },
              error: () => {
                this.authService.clearTokens();
                this.router.navigate(['/login']);
              }
            });
          } else {
            this.authService.clearTokens();
            this.router.navigate(['/login']);
          }
        }
      } 
    });

  }

  filterRows(rows: IcontactForm[]): IcontactForm[] {
    if (!this.filterText) return rows;
    const searchText = this.filterText.toLowerCase();
    return rows.filter(item =>
      item.name.toLowerCase().includes(searchText) ||
      item.email.toLowerCase().includes(searchText) ||
      item.mobile.toLowerCase().includes(searchText) ||
      item.company.toLowerCase().includes(searchText)
    );
  }

  sortData() {
    this.filteredRows = [...this.filteredRows].sort((a, b) => {
      const valueA: any = a[this.sortBy as keyof IcontactForm];
      const valueB: any = b[this.sortBy as keyof IcontactForm];

      if (this.sortBy === 'createdAt') {
        const dateA = valueA instanceof Date ? valueA : new Date(String(valueA));
        const dateB = valueB instanceof Date ? valueB : new Date(String(valueB));
        const timeA = isNaN(dateA.getTime()) ? 0 : dateA.getTime();
        const timeB = isNaN(dateB.getTime()) ? 0 : dateB.getTime();
        return this.sortDirection === 'asc' ? timeA - timeB : timeB - timeA;
      }

      const strA = String(valueA);
      const strB = String(valueB);
      return this.sortDirection === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
    });
  }

  onSort(prop: string) {
    if (this.sortBy === prop) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = prop;
      this.sortDirection = 'asc';
    }
    this.sortData();
  }

  filter(value: string) {
    this.filterSubject.next(value);
  }

  openModal(submission: IcontactForm, content: any) {
    this.selectedSubmission = { ...submission };
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

  deleteSubmission(id: number | undefined) {
    if (id === undefined) return;
    this.isLoading = true;
    this.contactService.deleteContactSubmission(id).subscribe({
      next: () => {
        this.rows = this.rows.filter(row => row.id !== id);
        this.filteredRows = this.filterRows([...this.rows]);
        this.totalCount = Math.max(this.totalCount - 1, 0);
        this.totalPages = Math.ceil(this.totalCount / this.pageSize) || 1;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) {
          const refreshToken = this.authService.getRefreshToken();
          if (refreshToken) {
            this.authService.refreshToken(refreshToken).subscribe({
              next: (authResponse) => {
                this.authService.saveTokens(authResponse);
              },
              error: () => {
                this.authService.clearTokens();
                this.router.navigate(['/login']);
              }
            });
          } else {
            this.authService.clearTokens();
            this.router.navigate(['/login']);
          }
        } 
      }
    });
  }

  markAsRead(id: number) {
    const submission = this.rows.find(row => row.id === id);
    if (submission) submission.isRead = true;
    this.rows = [...this.rows];
    this.filteredRows = this.filterRows([...this.rows]);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadData();
    } 
  }

  updateTotalPages() {
    this.totalPages = Math.ceil(this.totalCount / this.pageSize) || 1;
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}



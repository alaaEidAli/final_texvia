export interface IcontactForm {
  id: number;
  name: string;
  mobile: string;
  email: string;
  title: string;
  company: string;
  region: string;
  solution: number;
  industries: string;
  message: string;
   isRead: boolean
  createdAt: string; // ISO 8601 timestamp
}
export interface CreateIcontactForm {
 
   name: string;
  mobile: string;
  email: string;
  title: string;
  company: string;
  region: string;
  solutionid: number; // Changed to match JSON
  Industries: string; // Kept as is to match JSON
  message: string;
 

}
// export interface PaginatedResponse<T> {
//   data: T[];
//   total: number;
//   page: number;
//   limit: number;
// }
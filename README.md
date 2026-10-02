
# Texvia

Angular 19 project that adapts and implements client pages originally designed in Odoo into a modern web application.


## Getting Started

### Prerequisites
- Node.js 18 or 20
- Angular CLI 19

### Installation

```bash
npm install --legacy-peer-deps
Run the project
Bashng serve
Open your browser at: http://localhost:4200
Build for production
Bashng build --configuration production
Project Structure
textsrc/app/
├── core/           # Environment, Interceptors, Services, Guards
├── layouts/        # Navbar & Footer
└── pages/          # Application pages
Notes

This project does not use Angular Material.
Some unused dependencies were cleaned before uploading.
Main environment file: src/app/core/environment/environment.ts
Use npm install --legacy-peer-deps if you face dependency conflicts.
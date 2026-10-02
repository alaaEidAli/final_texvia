
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
commend : ng serve

Open your browser at: http://localhost:4200
Build for production
commend : ng build --configuration production
Project Structure
textsrc/app/
├── core/           # Environment, Interceptors, Services, Guards
├── layouts/        # Navbar & Footer
└── pages/          # Application pages


## Important Note about Environment

Some API connections in the environment configuration only work when the project is deployed on the server.  
They may not work properly when running the project locally (`ng serve`).

Notes
This project does not use Angular Material.
Some unused dependencies were cleaned before uploading.
Main environment file: src/app/core/environment/environment.ts
Use npm install --legacy-peer-deps if you face dependency conflicts.
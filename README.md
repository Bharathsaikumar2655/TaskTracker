# Task Tracker

A small full-stack project to genuinely pick up the stack used in the Frontend Developer (React) role: **React** front end, **ASP.NET Core (C#) Web API** with **Razor Pages**, **SQL Server**, and optional **Azure** deployment.

## Structure

```
TaskTracker/
  backend/TaskTracker.Api/   ASP.NET Core Web API + Razor Pages + EF Core
  frontend/                  React app (Vite)
```

## Prerequisites

- .NET 8 SDK — https://dotnet.microsoft.com/download
- Node.js 18+ and npm
- SQL Server LocalDB (installed automatically with Visual Studio, or via "SQL Server Express LocalDB" standalone installer on Windows)

## 1. Run the backend

```bash
cd backend/TaskTracker.Api
dotnet restore
dotnet tool install --global dotnet-ef   # one-time, if you don't have it
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
```

This starts the API on `http://localhost:5000` (check your console output — newer SDKs sometimes pick a different port; update `frontend/src/api.js` if so).

- API endpoints: `GET/POST /api/tasks`, `GET/PUT/DELETE /api/tasks/{id}`
- Swagger UI (API explorer): `http://localhost:5000/swagger`
- Razor Pages admin view: `http://localhost:5000/Admin/Tasks`

## 2. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`. The app calls the API to list, add, complete, and delete tasks.

## 3. (Optional) Deploy to Azure

This step is what lets you genuinely add "Azure" to your CV backed by something real, rather than just the local exposure above.

1. Create a free Azure account if you don't have one (https://azure.microsoft.com/free).
2. Create an **Azure SQL Database** (free tier available) and copy its connection string into `appsettings.json`.
3. Create an **Azure App Service** (free F1 tier) and deploy the backend:
   ```bash
   cd backend/TaskTracker.Api
   az webapp up --name <your-app-name> --resource-group <your-rg> --runtime "DOTNETCORE:8.0"
   ```
4. Deploy the React build (`npm run build` output in `frontend/dist`) to **Azure Static Web Apps** (also has a free tier), or to Netlify if you'd rather reuse your existing portfolio setup.
5. Update `API_BASE_URL` in `frontend/src/api.js` to point at your deployed API URL before rebuilding.

## What this demonstrates for your CV

- **C#** — models, controllers, EF Core queries
- **ASP.NET Core MVC-style Web API** — `TasksController` with full CRUD
- **Razor Pages** — `/Admin/Tasks` server-rendered view
- **SQL Server** — via EF Core and migrations
- **React** — the task management UI, calling the API
- **Azure** (if you complete step 3) — live-hosted backend and database

Suggested resume bullet once built and (ideally) deployed:

> Built a full-stack task management application with a React front end and an ASP.NET Core (C#) Web API back end, using Razor Pages for an admin view and SQL Server/Entity Framework Core for data persistence; deployed to Azure App Service and Azure SQL.

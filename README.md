# Satellite Mission Tracker

A full-stack mission tracking system for managing satellites and space missions. Built with Angular and ASP.NET Core.

## Tech Stack

**Frontend:** Angular 17, TypeScript, Angular Material, RxJS  
**Backend:** ASP.NET Core 8, Entity Framework Core, SQLite, JWT Auth

## Features

- JWT authentication with BCrypt password hashing
- Create and manage satellites across LEO, MEO, GEO, and HEO orbits
- Assign missions to satellites and track status through Planned → Active → Completed/Failed
- Real-time launch countdown and status display via custom Angular pipes
- User-scoped data isolation — each user only sees their own satellites and missions

## Architecture

**OOP Patterns:**
- Abstract `BaseApiService` — all Angular services inherit shared HTTP logic
- Abstract `BaseEntity` — all backend models inherit `Id` and `CreatedAt`
- Custom pipes for data transformation (`missionStatus`, `orbitType`, `launchCountdown`)
- HTTP interceptor for global JWT attachment
- Route guards for authentication protection

## Running Locally

**Backend:**
```bash
cd MissionTracker.API
dotnet run
# API runs at http://localhost:5084
# Swagger UI at http://localhost:5084/swagger
```

**Frontend:**
```bash
cd mission-tracker-client
npm install
ng serve
# App runs at http://localhost:4200
```

## Project Structure
```
SatelliteMissionTracker/
  MissionTracker.API/        ← ASP.NET Core Web API
    Controllers/             ← Auth, Satellites, Missions endpoints
    Models/                  ← BaseEntity, Satellite, Mission, User
    DTOs/                    ← Request/response shapes
    Data/                    ← Entity Framework DbContext
    Services/                ← JWT token generation
  mission-tracker-client/    ← Angular frontend
    src/app/
      core/
        models/              ← TypeScript interfaces
        services/            ← BaseApiService + domain services
        interceptors/        ← JWT auth interceptor
        guards/              ← Route protection
      features/
        auth/                ← Login page
        satellites/          ← Satellite management
        missions/            ← Mission tracking
      shared/
        pipes/               ← Custom display pipes
```
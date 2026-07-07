# Salary Management HR System

## Overview
This repository contains a dedicated HR salary management system with a React single-page application (frontend) and an ASP.NET Core Web API (backend). The solution tracks employees, salary components, payroll processing, approvals, and reporting so HR can efficiently manage pay cycles.

## Backend Setup (ASP.NET Core)
1. Install [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download).
2. `cd backend`
3. `dotnet restore`
4. `dotnet run`

The API listens on the default HTTPS URL (usually `https://localhost:5001`). Swagger documentation is available at `/swagger` in the development environment.

## Frontend Setup (React)
1. Install Node.js 18+.
2. `cd frontend`
3. `npm install`
4. `npm start`

The React app runs on `http://localhost:3000` by default. It talks to the backend at `https://localhost:5001/api`; adjust the proxy or the base URL if you host the API elsewhere.

## Default HR Access
- **Username:** `hradmin`
- **Password:** `Password123`

## Features
- JWT-protected API with example HR credentials
- Employee directory and salary component configuration
- Payroll generation with gross/net calculations and component audit details
- Approval workflow for special payroll requests
- Dashboard/top-level reporting for payroll totals and pending approvals

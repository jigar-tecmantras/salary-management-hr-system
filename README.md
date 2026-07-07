# Salary Management HR System

## Overview
This repository contains a dedicated HR salary management system with a React single-page application (frontend) and an ASP.NET Core Web API (backend). The solution tracks employees, salary components, payroll processing, approvals, and reporting so HR can efficiently manage pay cycles from a single screen without any authentication barrier for personal use.

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

The React app runs on `http://localhost:3000` by default and calls the API at `https://localhost:5001/api`.

## Usage
- Open the React UI directly in the browser; no login prompts appear since the app is for personal use.
- Use the dashboard, payroll processing form, approvals, and reports to manage salaries with immediate access.

## Features
- Open (unauthenticated) HR interface for personal productivity
- Employee directory and salary component configuration
- Payroll generation with gross/net calculations and component audit details
- Approval workflow for special payroll requests
- Dashboard/top-level reporting for payroll totals and pending approvals

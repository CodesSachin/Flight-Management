# Flight Schedule Management System

Enterprise-style React dashboard for viewing, filtering, and managing flight schedules.

This project focuses on a polished airline operations UI while preserving a simple and maintainable frontend architecture. It supports schedule search, multi-criteria filtering, inline editing, and a structured dashboard experience for operations teams.

## Highlights

- Dashboard-style flight operations interface
- Search by flight number, route, destination, and operator
- Multi-filter workflow for date range, days, status, AOC, and body type
- Inline row editing for schedule updates
- Reusable table and filter components
- Bootstrap-powered responsive UI
- Context-driven state management for flight data

## Tech Stack

- React 18
- Bootstrap 5
- React Context API
- Custom hooks
- Create React App

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm 9+ recommended

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Create a production build

```bash
npm run build
```

## Available Scripts

- `npm start`: starts the local development server
- `npm run build`: creates an optimized production build
- `npm test`: runs the test runner

## Core Features

### Dashboard

- Operational overview cards
- Flight health and performance summaries
- Upcoming flight previews
- Module-level overview cards for booking, crew, passengers, operations, reports, admin, communication, and documents

### Flight Management

- Search across core flight fields
- Filter by:
  - date range
  - day of operation
  - status
  - AOC
  - aircraft body type
- Inline editing for selected schedule attributes
- Visual operational states such as on-time, boarding, delayed, arrived, and cancelled

### UX

- Fixed sidebar layout
- Independently scrollable main content area
- Responsive Bootstrap layout
- Badge- and card-driven information hierarchy

## Screenshots

### Dashboard Overview

The main dashboard provides a comprehensive view of airline operations with key metrics and performance indicators.

![Dashboard Overview - Part 1](/src/assets/images/image-2.png)

_Displays today's metrics, crew availability status, flight operational statistics, and incident reports_

### Dashboard Extended View

Additional operational insights including booking management, crew data, passenger flow, and real-time operations monitoring.

![Dashboard Overview - Part 2](/src/assets/images/image-3.png)

_Shows comprehensive module overview with booking confirmations, crew management, passenger processing, and administrative panels_

### Flight Management Interface

The flight listing table with advanced search, filtering capabilities, and inline editing for schedule management.

![Flight Listing Table](/src/assets/images/image.png)

_Enterprise-grade flight operations interface with multi-criteria filtering, status indicators, and action controls for flight schedule management_

## Project Structure

```text
src/
├── assets/                Static data
├── components/            Reusable UI components
│   ├── Common/            Shared UI primitives
│   ├── Filters/           Filter controls
│   ├── Search/            Search input
│   └── Table/             Table, rows, header, edit row
├── context/               React context providers
├── hooks/                 Custom hooks
├── utils/                 Filtering and helper logic
├── App.jsx                Main dashboard shell
└── index.js               Application entry point
```

## Architecture Notes

- `App.jsx` coordinates dashboard composition and screen-level state
- `FlightContext` provides access to flight data and update actions
- `useFlights()` encapsulates the data/state interaction layer
- `applyAllFilters()` centralizes filtering logic to keep components presentation-focused
- Table rendering is componentized into header, row, edit row, and container layers for maintainability

## Design Principles

- Keep functionality and UI concerns clearly separated
- Favor reusable presentational components over page-specific duplication
- Preserve business behavior while iterating on the visual layer
- Use Bootstrap as the primary UI foundation, supplemented by small inline design tokens where needed

## Assumptions

- Flight data is currently sourced from local/static project data
- Inline editing updates the frontend-managed dataset through the existing context flow
- The current codebase is optimized for a frontend assessment/demo workflow rather than a fully integrated production backend

## Future Improvements

- Route-based module pages
- Dark mode theme support
- Stronger table accessibility and keyboard workflows
- API-backed persistence for edits and admin actions
- Charting support for operational analytics

## License

This project is provided for assessment and development purposes.

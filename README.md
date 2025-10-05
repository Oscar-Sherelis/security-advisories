# GitHub Security Advisories Viewer

A React application for viewing and searching GitHub security advisories.

## Features

- **Advisories Overview**: View the 50 most recent security advisories
- **Real-time Filtering**: Filter by advisory name and severity
- **Package Search**: Search for advisories affecting specific packages
- **Severity Indicators**: Color-coded severity levels with icons
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- React 19.1.1 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Lucide React (icons)
- GitHub REST API

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Oscar-Sherelis/security-advisories
cd github-advisories-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to http://localhost:5173

## Building for Production
```bash
npm run build
npm run preview
```
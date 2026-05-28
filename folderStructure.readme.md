# Project Folder Structure

```
typescript-frontend-example/
│
├── public/                      # Static assets served directly (favicon, images, etc.)
│
├── src/                         # Source code directory
│   ├── assets/                  # Static assets used in components (images, fonts, icons)
│   ├── components/              # Reusable UI components
│   ├── constants/               # Application constants and configuration
│   ├── contexts/                # React Context providers
│   ├── hooks/                   # Custom React hooks
│   ├── pages/                   # Page-level components (if using routing)
│   ├── services/                # API calls and external service integrations
│   ├── styles/                  # Global styles, theme, CSS modules
│   ├── types/                   # TypeScript type definitions and interfaces
│   ├── utils/                   # Utility functions and helpers
│   ├── App.tsx                  # Root application component
│   ├── App.css                  # Root application styles
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
│
├── dist/                        # Build output (generated, not in source control)
│
├── node_modules/                # npm dependencies (generated, not in source control)
│
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML entry point
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript base configuration
├── tsconfig.app.json            # TypeScript configuration for application code
├── tsconfig.node.json           # TypeScript configuration for build tools
├── vite.config.ts               # Vite bundler configuration
└── README.md                    # Project documentation
```

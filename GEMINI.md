# GEMINI.md

## Project Overview

This is a chat application's frontend built with Next.js, TypeScript, and Tailwind CSS. It uses `shadcn-ui` and `radix-ui` for UI components, `react-hook-form` and `zod` for forms and validation, and `axios` for making API requests to a separate backend. The application supports user authentication (login and registration), real-time chat, and chat rooms.

## Building and Running

To get the development server running, use the following command:

```bash
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Other available scripts:

*   `yarn build`: Creates a production build of the application.
*   `yarn start`: Starts the production server.
*   `yarn lint`: Lints the codebase for potential errors.

## Development Conventions

*   **Styling**: The project uses Tailwind CSS for styling. Utility classes are preferred over custom CSS.
*   **Components**: The project uses `shadcn-ui` and `radix-ui` for UI components. New components should be created in the `components` directory.
*   **State Management**: The project uses `zustand` for state management.
*   **Data Fetching**: The project uses `axios` and `@tanstack/react-query` for data fetching. API requests are centralized in the `apiRequest` directory.
*   **Authentication**: Authentication is handled via JWTs (access and refresh tokens) stored in local storage. The backend API is expected to be running on the URL specified in the `NEXT_PUBLIC_API_ENDPOINT` environment variable.
*   **Linting**: The project uses ESLint for linting. Please run `yarn lint` before committing any changes.

## Development Guide

### 1. Installing Dependencies

First, you need to install all the dependencies defined in `package.json`. Open your terminal and run the following command:

```bash
yarn install
```

### 2. Running the Development Server

To start developing, run the local development server. This will start the application in development mode with hot-reloading enabled.

```bash
yarn dev
```

After running the command, the application will be available at [http://localhost:3000](http://localhost:3000).

### 3. Development Workflow

*   **Creating New Components**: When creating new UI components, please adhere to the established conventions using `shadcn-ui` and `radix-ui`. Place new components in the `components` directory.
*   **State Management**: Use `zustand` for global state management.
*   **Data Fetching**: For interacting with APIs, use `axios` and `@tanstack/react-query`. API requests should be centralized in the `apiRequest` directory.
*   **Styling**: Use Tailwind CSS utility classes for styling instead of writing custom CSS.

### 4. Linting and Code Style

To ensure code quality and consistency, run the linter before committing any changes.

```bash
yarn lint
```

This command will check for potential errors and formatting issues in your code.

### 5. Building for Production

When you are ready to deploy your application, create a production build.

```bash
yarn build
```

This command will create an optimized version of the application in the `.next` directory.

### 6. Debugging

*   **Browser Developer Tools**: Use your browser's developer tools (Chrome DevTools, Firefox Developer Tools) to inspect DOM elements, debug JavaScript issues, and analyze network traffic.
*   **React DevTools**: Install the React DevTools browser extension to inspect the React component hierarchy, props, and state.
*   **TanStack Query DevTools**: Use `@tanstack/react-query-devtools` to debug and visualize the state of your `react-query` queries.
*   **`console.log` Statements**: For quick debugging, you can use `console.log` statements to log values and execution flow in your code.
# Velox frontend

Velox is the React frontend for a project management workspace, adapted from [Worklenz](https://github.com/Worklenz/worklenz). It uses TypeScript, Ant Design, and Vite.

## Table of Contents

- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Learn More](#learn-more)
- [License](#license)

## Getting Started

Use Node.js 22.12 or newer. Run these commands from the repository root.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Sign-in and workspace data require a compatible backend. Set `VITE_API_URL` and `VITE_SOCKET_URL` in `.env.local` to point to it. For a backend configured for Employee ID sign-in, set `VITE_VELOX_EMPLOYEE_LOGIN=true`.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run serve`

Serves the production build locally for testing.\
Open [http://localhost:4173](http://localhost:4173) to preview the build.

## Project Structure

The project is organized around a feature-based structure:

```
src/
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── lib/               # Feature-specific logic
├── pages/             # Route components
├── services/          # API services
├── shared/            # Shared utilities, constants, and types
├── app/               # App configuration and state
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── App.tsx            # Main application component
└── index.tsx          # Application entry point
```

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

## Learn More

To learn more about the technologies used in this project:

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Ant Design Documentation](https://ant.design/docs/react/introduce)
- [Vite Documentation](https://vitejs.dev/guide/)

## License

This frontend includes work from Worklenz and is distributed under the [GNU Affero General Public License Version 3 (AGPLv3)](LICENSE).

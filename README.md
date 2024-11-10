# Portfolio Maker Website

This project is a portfolio-maker website designed to help students showcase their skills, projects, and achievements. Built with modern technologies such as ReactJS, TypeScript, and ViteJS, this application aims to promote industry-standard tools and practices for class instructional projects. The website will be deployed on AWS Amplify, AWS Lightsail, and AWS Beanstalk.

## Tech Stack

- **ReactJS**
- **TypeScript**
- **ViteJS**
- **Tailwind CSS**
- **Various npm packages**

## Features

- Create and customize professional portfolios
- Add links and projects
- Generate QR codes for easy sharing with recruiters
- Responsive design for optimal viewing on all devices

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Development

To start the development server with hot module replacement:

```sh
npm run dev
```

### Building for Production

To build the project for production:

```sh
npm run build
```

### Previewing the Production Build

To preview the production build locally:

```sh
npm run preview
```

## ESLint Configuration

This project uses ESLint for code linting. If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules.

### Expanding the ESLint Configuration

1. Configure the top-level `parserOptions` property like this:

   ```js
   export default tseslint.config({
     languageOptions: {
       // other options...
       parserOptions: {
         project: ["./tsconfig.node.json", "./tsconfig.app.json"],
         tsconfigRootDir: import.meta.dirname,
       },
     },
   });
   ```

2. Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.
3. Optionally add `...tseslint.configs.stylisticTypeChecked`.
4. Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

   ```js
   // eslint.config.js
   import react from "eslint-plugin-react";

   export default tseslint.config({
     // Set the react version
     settings: { react: { version: "18.3" } },
     plugins: {
       // Add the react plugin
       react,
     },
     rules: {
       // other rules...
       // Enable its recommended rules
       ...react.configs.recommended.rules,
       ...react.configs["jsx-runtime"].rules,
     },
   });
   ```

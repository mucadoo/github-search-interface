# GitHub Search Interface

A modern, responsive web application for searching GitHub repositories using the GitHub GraphQL API. Built with React, TypeScript, Apollo Client, and Material UI.

## 🚀 Features

-   **Repository Search**: Search for any GitHub repository using keywords.
-   **GraphQL Integration**: Uses Apollo Client to interact with the GitHub GraphQL API for efficient data fetching.
-   **Detailed Results**: View repository descriptions, star counts, fork counts, and primary languages.
-   **Responsive UI**: A clean and modern interface built with Material UI and Emotion.
-   **Pagination**: Smooth navigation through search results using GitHub's cursor-based pagination.
-   **Rating System**: Includes a rating modal for repository feedback.

## 🛠️ Tech Stack

-   **Frontend**: [React](https://reactjs.org/) (TypeScript)
-   **State Management & API**: [Apollo Client](https://www.apollographql.com/docs/react/) (GraphQL)
-   **Styling**: [Material UI](https://mui.com/), [Emotion](https://emotion.sh/), [Sass](https://sass-lang.com/)
-   **Icons**: [Primer Octicons](https://primer.style/octicons/)
-   **Routing**: [React Router](https://reactrouter.com/)

## 🏁 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or higher recommended)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
-   A [GitHub Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) with `public_repo` scope.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/github-search-interface.git
    cd github-search-interface
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables:
    Create a `.env` file in the root directory and add your GitHub Personal Access Token:
    ```env
    REACT_APP_GITHUB_TOKEN=your_personal_access_token_here
    ```

### Running the App

Start the development server:
```bash
npm start
```
The app will be available at [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

-   `src/components`: Reusable UI components (Header, SearchForm, RepositoryItem, etc.).
-   `src/queries`: GraphQL query definitions using `gql`.
-   `src/services`: API service configurations (Apollo Client setup).
-   `src/themes`: Material UI theme customizations.
-   `src/interfaces`: TypeScript type definitions and interfaces.
-   `src/data`: Static data or mock data.

## 📜 Available Scripts

-   `npm start`: Runs the app in development mode.
-   `npm build`: Builds the app for production to the `build` folder.
-   `npm test`: Launches the test runner in interactive watch mode.
-   `npm run eject`: Removes the single build dependency from your project.

## 📄 License

This project is licensed under the MIT License.

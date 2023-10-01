import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Define your GraphQL endpoint URL
const GRAPHQL_URL = 'https://api.github.com/graphql';

// Set up a link to the GraphQL endpoint with your Bearer token
const httpLink = createHttpLink({
    uri: GRAPHQL_URL,
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`, // Replace with your actual token
    },
});

// Create an Apollo Client instance
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default client;
import { gql } from '@apollo/client';
export const SEARCH_REPOSITORIES = gql`
  query SearchRepositories($query: String!, $first: Int, $after: String) {
      search(query: $query, type: REPOSITORY, first: $first, after: $after) {
          repositoryCount
          pageInfo {
              hasNextPage
              endCursor
          }
          edges {
              node {
                  ... on Repository {
                      name
                      description
                      url
                      stargazerCount
                      forkCount
                      primaryLanguage {
                          name
                          color
                      }
                  }
              }
          }
      }
  }
`;
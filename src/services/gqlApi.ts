import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8082/api/v1/task', // Replace with your GraphQL endpoint
  }),
  cache: new InMemoryCache(),
});

export default client;
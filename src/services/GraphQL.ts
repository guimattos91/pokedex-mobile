import { ApolloClient, InMemoryCache } from '@apollo/client';
import { API_BASE_URL } from '@env';

const GraphQLClient = new ApolloClient({
  uri: API_BASE_URL,
  cache: new InMemoryCache(),
});

export default GraphQLClient;

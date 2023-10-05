import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Config } from 'src/Config';

const GraphQLClient = new ApolloClient({
  uri: Config.baseUrl,
  cache: new InMemoryCache(),
});

export default GraphQLClient;

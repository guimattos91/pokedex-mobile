import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Config } from 'Config/index';

const GraphQLClient = new ApolloClient({
  uri: Config.baseUrl,
  cache: new InMemoryCache(),
});

export default GraphQLClient;

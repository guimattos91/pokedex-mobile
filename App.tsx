/* eslint-disable react/style-prop-object */
import { ApolloProvider } from '@apollo/client';
import { GluestackUIProvider, config } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { PokemonProvider } from 'contexts/PokemonContext';
import Routes from 'routes/index';
import GraphQLClient from 'services/GraphQL';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config.theme}>
        <ApolloProvider client={GraphQLClient}>
          <PokemonProvider>
            <Routes />
          </PokemonProvider>
        </ApolloProvider>
      </GluestackUIProvider>
    </NavigationContainer>
  );
};

export default App;

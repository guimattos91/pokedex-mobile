import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BaseScreen } from 'screens/BaseScreen';

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Base" component={BaseScreen} />
    </Stack.Navigator>
  );
};

export default Routes;

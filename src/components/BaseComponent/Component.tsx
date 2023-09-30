import { memo } from 'react';
import { View, Text } from '@gluestack-ui/themed';

interface IBaseComponentProps {
  someProp?: string;
}

const Component: React.FC<IBaseComponentProps> = ({ someProp }) => (
  <View>{someProp && <Text> {someProp} </Text>}</View>
);

export default memo(Component);

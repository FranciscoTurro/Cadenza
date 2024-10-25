import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function HomeScreen() {
  return (
    <View className="flex items-center gap-2">
      <Text>Home screen</Text>
      <Button className="w-2/4" variant={'destructive'}>
        <Text>Hell yesa</Text>
      </Button>
    </View>
  );
}

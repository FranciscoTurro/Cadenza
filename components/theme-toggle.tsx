import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable, View } from 'react-native';
import { setAndroidNavigationBar } from '@/theming/android-navigation-bar';
import { MoonStar } from '@/theming/icons/Moonstar';
import { Sun } from '@/theming/icons/Sun';
import { useColorScheme } from '@/theming/useColorScheme';
import { cn } from '@/theming/utils';
import { Button } from './ui/button';

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  return (
    <Button
      onPress={() => {
        const newTheme = isDarkColorScheme ? 'light' : 'dark';
        setColorScheme(newTheme);
        setAndroidNavigationBar(newTheme);
        AsyncStorage.setItem('theme', newTheme);
      }}
      className="bg-inherit w-0 h-0 web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
    >
      {({ pressed }) => (
        <View
          className={cn(
            'flex-1 aspect-square pt-0.5 justify-center items-start web:px-5',
            pressed && 'opacity-70'
          )}
        >
          {isDarkColorScheme ? (
            <MoonStar
              className="text-foreground"
              size={23}
              strokeWidth={1.25}
            />
          ) : (
            <Sun className="text-foreground" size={24} strokeWidth={1.25} />
          )}
        </View>
      )}
    </Button>
  );
}

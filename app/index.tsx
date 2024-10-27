import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Audio } from 'expo-av';
import useSWR from 'swr';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../components/ui/button';
import Slider from '@react-native-community/slider';
import { useColorScheme } from '../theming/useColorScheme';

const soundPromise = Audio.Sound.createAsync(
  require('../assets/sounds/click.wav')
);

function useSound() {
  const { data } = useSWR(['click'], () => soundPromise);
  return data?.status.isLoaded ? data?.sound : undefined;
}

export default function HomeScreen() {
  const { isDarkColorScheme } = useColorScheme();

  const sound = useSound();
  const [bpm, setBpm] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);

  const msPerBeat = useCallback(() => (1 / bpm) * 60 * 1000, [bpm]);

  useEffect(() => {
    if (!isPlaying || !sound) return;

    const intervalId = setInterval(() => {
      sound.replayAsync();
    }, msPerBeat());

    return () => clearInterval(intervalId);
  }, [sound, msPerBeat, isPlaying]);

  return (
    <View className="flex w-full h-full items-center justify-start">
      <Text className="pt-10 text-3xl">{bpm}</Text>

      <View className="flex flex-row">
        <Button onPress={() => setBpm(bpm - 1)}>
          <Text>-</Text>
        </Button>
        <Slider
          onValueChange={(e) => {
            setBpm(Math.round(e));
          }}
          value={bpm}
          style={{ width: 200, height: 40 }}
          minimumValue={35}
          maximumValue={200}
          minimumTrackTintColor={isDarkColorScheme ? '#FFF' : '#000'}
          maximumTrackTintColor={isDarkColorScheme ? '#FFF' : '#000'}
        />
        <Button onPress={() => setBpm(bpm + 1)}>
          <Text>+</Text>
        </Button>
      </View>

      <Button onPress={() => setIsPlaying(!isPlaying)}>
        <Text>{isPlaying ? 'Stop' : 'Play'}</Text>
      </Button>
    </View>
  );
}

import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Figtree-Regular': require('../assets/fonts/Figtree-Regular.ttf'),
    'Figtree-Bold': require('../assets/fonts/Figtree-Bold.ttf'),
    'Figtree-Medium': require('../assets/fonts/Figtree-Medium.ttf'),
    'Figtree-SemiBold': require('../assets/fonts/Figtree-SemiBold.ttf'),
    'Figtree-ExtraBold': require('../assets/fonts/Figtree-ExtraBold.ttf'),
  });

  // ✅ Wait for fonts to load before showing app
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFAE00" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="AvatarIntro" />
      <Stack.Screen name="AvatarBuilder" />
    </Stack>
  );
}

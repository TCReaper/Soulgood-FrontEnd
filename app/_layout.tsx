import { Stack, Redirect } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="AvatarIntro"/>
      <Stack.Screen name="AvatarBuilder" />
    </Stack>
  );
}

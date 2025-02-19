import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="checkin" />
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="reachout" />
    </Tabs>
  );
}

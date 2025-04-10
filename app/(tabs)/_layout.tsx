import { Tabs } from 'expo-router';
import HomeIcon from '@/assets/icons/tabs/home';
import ActivityIcon from '@/assets/icons/tabs/activity';
import MusicIcon from '@/assets/icons/tabs/music';
import ReachOutIcon from '@/assets/icons/tabs/reachout';
import ChatIcon from '@/assets/icons/tabs/chat';
import { View, Platform } from 'react-native';

const TabBarIcon = ({ Icon, focused }: { Icon: any; focused: boolean }) => (
  <Icon thisColor={focused ? '#FFAE00' : '#B5B5B5'} width={24} height={24} />
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FDFBF5',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 100,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 10, // Android shadow
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'System',
        },
        tabBarActiveTintColor: '#FFAE00',
        tabBarInactiveTintColor: '#B5B5B5',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon Icon={HomeIcon} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          tabBarLabel: 'Activity',
          tabBarIcon: ({ focused }) => <TabBarIcon Icon={ActivityIcon} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="music"
        options={{
          tabBarLabel: 'Music',
          tabBarIcon: ({ focused }) => <TabBarIcon Icon={MusicIcon} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="reachout"
        options={{
          tabBarLabel: 'ReachOut',
          tabBarIcon: ({ focused }) => <TabBarIcon Icon={ReachOutIcon} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ focused }) => <TabBarIcon Icon={ChatIcon} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="testpage"
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ focused }) => <TabBarIcon Icon={ChatIcon} focused={focused} />,
        }}
      />
    </Tabs>
  );
}

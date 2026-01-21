import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#757575',
        tabBarShowLabel: Platform.OS === 'web' ? true : false, // 모바일에서는 텍스트 숨김
        tabBarLabelStyle: {
          fontSize: Platform.OS === 'web' ? 11 : 9,
          marginBottom: Platform.OS === 'web' ? 2 : 0,
          marginTop: Platform.OS === 'web' ? 0 : -2,
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === 'web' ? 0 : 0,
        },
        tabBarStyle: {
          height: Platform.OS === 'web' ? 60 : 60,
          paddingBottom: Platform.OS === 'web' ? 5 : 5,
          paddingTop: Platform.OS === 'web' ? 5 : 5,
        },
        headerStyle: {
          backgroundColor: '#4CAF50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          headerTitle: 'Nutri8',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="input"
        options={{
          title: '입력',
          headerTitle: '식단 입력',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: '기록',
          headerTitle: '식단 기록',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: '통계',
          headerTitle: '통계 및 분석',
          tabBarIcon: ({ color, size}) => (
            <MaterialCommunityIcons name="chart-line" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="weight"
        options={{
          title: '체중',
          headerTitle: '체중 기록',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="weight-kilogram" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: '알림',
          headerTitle: '알림 설정',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '설정',
          headerTitle: '목표 설정',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

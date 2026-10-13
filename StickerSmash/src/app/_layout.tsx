import { Tabs } from 'expo-router';
import { TabBar } from '../../components/TabBar';

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      {/* Keep this order: it is the order of the tabs */}
      <Tabs.Screen name="index" />
      <Tabs.Screen name="products" />
      <Tabs.Screen name="scan" />
      <Tabs.Screen name="verify" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
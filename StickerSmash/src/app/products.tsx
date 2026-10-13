import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme';
import { FocusedStatusBar } from '../../components/FocusedStatusBar';

export default function Products() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <FocusedStatusBar style="dark" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.navy }}>Products</Text>
        <Text style={{ fontSize: 13, color: colors.gray, marginTop: 4 }}>Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
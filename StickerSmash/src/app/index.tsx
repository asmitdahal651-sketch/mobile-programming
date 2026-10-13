import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '../../theme';
import { products } from '../../data';
import { ProductRow } from '../../components/ProductRow';
import { FocusedStatusBar } from '../../components/FocusedStatusBar';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <FocusedStatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
      >
        <Text style={{ fontSize: 13, color: colors.gray }}>MeroBill</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.navy, marginTop: 4 }}>
          Your product wallet
        </Text>
        <Text style={{ fontSize: 13, color: colors.gray, marginTop: 4, marginBottom: 20 }}>
          Keep your purchases, warranties and repairs in one place.
        </Text>

        <View
          style={{
            backgroundColor: colors.tealSoft,
            borderRadius: 14,
            padding: 16,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 13, color: colors.gray }}>Products tracked</Text>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.navy, marginTop: 2 }}>
            {products.length}
          </Text>
        </View>

        <Text style={{ fontSize: 17, fontWeight: 'bold', color: colors.navy, marginBottom: 12 }}>
          Your products
        </Text>
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            onPress={() => router.push({ pathname: '/product', params: { id: product.id } })}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

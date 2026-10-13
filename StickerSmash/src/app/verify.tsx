import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';
import { products, getWarrantyInfo, formatDate, daysLeftLabel } from '../../data';
import { StatusChip } from '../../components/StatusChip';
import { Timeline } from '../../components/Timeline';
import { FocusedStatusBar } from '../../components/FocusedStatusBar';

type RowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  children: React.ReactNode;
  last?: boolean;
};

const Row = ({ icon, label, children, last }: RowProps) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: last ? 0 : 1,
      borderBottomColor: colors.border,
    }}
  >
    <Ionicons name={icon} size={22} color={colors.teal} style={{ width: 34 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 12, color: colors.gray, marginBottom: 2 }}>{label}</Text>
      {children}
    </View>
    <Ionicons name="chevron-forward" size={18} color={colors.gray} />
  </View>
);

const valueStyle = { fontSize: 14, fontWeight: '600', color: colors.navy } as const;

const VerifyScreen = () => {
  const router = useRouter();

  // Demo: pretend this is the product that was just scanned.
  const product = products[0];
  const info = getWarrantyInfo(product);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <FocusedStatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.navy }}>Verify Before Buying</Text>
        <Text style={{ fontSize: 13, color: colors.gray, marginTop: 2, marginBottom: 16 }}>
          Scan and check product authenticity
        </Text>

        {/* Result hero */}
        <View
          style={{
            backgroundColor: colors.tealSoft,
            borderRadius: 16,
            alignItems: 'center',
            paddingVertical: 20,
            paddingHorizontal: 16,
            marginBottom: 14,
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: colors.teal,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <Ionicons name="checkmark" size={36} color={colors.white} />
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.navy }}>Verified product</Text>
          <Text style={{ fontSize: 13, color: colors.gray, textAlign: 'center', marginTop: 4 }}>
            This phone&apos;s purchase and warranty details are verified.
          </Text>
        </View>

        {/* Details */}
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 14,
            paddingHorizontal: 14,
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 14,
          }}
        >
          <Row icon="calendar-outline" label="Original purchase date">
            <Text style={valueStyle}>{formatDate(product.purchaseDate)}</Text>
          </Row>
          <Row icon="shield-checkmark-outline" label="Warranty">
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <StatusChip status={info.status} />
              <Text style={{ fontSize: 12, color: colors.gray, marginLeft: 8 }}>
                {info.status === 'expired' ? 'Ended' : daysLeftLabel(info.daysLeft)}
              </Text>
            </View>
          </Row>
          <Row icon="build-outline" label="Repairs">
            <Text style={valueStyle}>{product.repairs.length}</Text>
          </Row>
          <Row icon="people-outline" label="Previous owners" last>
            <Text style={valueStyle}>{product.previousOwners}</Text>
          </Row>
        </View>

        {/* Ownership history */}
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: 14,
            padding: 14,
            borderWidth: 1,
            borderColor: colors.border,
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.navy, marginBottom: 12 }}>
            Ownership history
          </Text>
          <Timeline
            items={[
              { title: 'Purchased new', sub: formatDate(product.purchaseDate), color: colors.navy },
              { title: 'Current owner (details private)', sub: 'You', color: colors.teal },
            ]}
          />
        </View>

        <TouchableOpacity
          onPress={() => router.push('/tabs/scan')}
          style={{ backgroundColor: colors.teal, borderRadius: 12, paddingVertical: 14, alignItems: 'center' }}
        >
          <Text style={{ color: colors.white, fontWeight: '600', fontSize: 15 }}>Scan another product</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyScreen;
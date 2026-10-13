import { useState } from 'react';
import { Alert, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-svg';
import { colors, statusStyle } from '../theme';
import { products, getWarrantyInfo, formatDate, daysLeftLabel } from '../data';
import { StatusChip } from '../components/StatusChip';
import { Timeline, TimelineItem } from '../components/Timeline';
import { FocusedStatusBar } from '../components/FocusedStatusBar';

const Card = ({ children }: { children: React.ReactNode }) => (
  <View
    style={{
      backgroundColor: colors.white,
      borderRadius: 14,
      padding: 14,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    }}
  >
    {children}
  </View>
);

const ProductPassportScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const info = getWarrantyInfo(product);
  const s = statusStyle[info.status];
  const qrValue = `merobill://passport/${product.id}`;

  const copyImei = async () => {
    if (!product.imei) return;
    await Clipboard.setStringAsync(product.imei);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const events: TimelineItem[] = [
    { title: `Purchased · ${formatDate(product.purchaseDate)}`, sub: product.shop, color: colors.teal },
    ...product.repairs.map((r) => ({
      title: `${r.title} · ${formatDate(r.date)}`,
      sub: r.place,
      color: colors.amber,
    })),
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.navy }} edges={['top']}>
      <FocusedStatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* Navy header */}
          <View style={{ backgroundColor: colors.navy, paddingHorizontal: 16, paddingBottom: 20, paddingTop: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18 }}>
              <TouchableOpacity
                onPress={() => router.back()}
                accessibilityLabel="Go back"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="chevron-back" size={20} color={colors.white} />
              </TouchableOpacity>
              <Text
                style={{ flex: 1, textAlign: 'center', color: colors.white, fontSize: 16, fontWeight: '600' }}
              >
                Product Passport
              </Text>
              <View style={{ width: 36 }} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 88,
                  height: 116,
                  borderRadius: 12,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}
              >
                <Text style={{ fontSize: 48 }}>{product.icon}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.white }}>{product.name}</Text>
                {product.model ? (
                  <Text style={{ fontSize: 13, color: colors.lightBlue, marginTop: 2 }}>{product.model}</Text>
                ) : null}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-start',
                    backgroundColor: colors.teal,
                    borderRadius: 10,
                    paddingVertical: 3,
                    paddingHorizontal: 9,
                    marginVertical: 8,
                  }}
                >
                  <Ionicons name="shield-checkmark" size={12} color={colors.white} />
                  <Text style={{ fontSize: 11, fontWeight: '600', color: colors.white, marginLeft: 4 }}>
                    Verified ownership
                  </Text>
                </View>

                {product.imei ? (
                  <View>
                    <Text style={{ fontSize: 11, color: colors.lightBlue }}>IMEI</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 15, fontWeight: '600', color: colors.white }}>{product.imei}</Text>
                      <TouchableOpacity onPress={copyImei} accessibilityLabel="Copy IMEI">
                        <Ionicons
                          name={copied ? 'checkmark' : 'copy-outline'}
                          size={18}
                          color={colors.lightBlue}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            {/* Warranty */}
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={s.icon} size={26} color={s.bar} style={{ marginRight: 12 }} />
                <View style={{ flex: 1 }}>
                  <StatusChip status={info.status} />
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.navy, marginTop: 4 }}>
                    {info.status === 'expired' ? 'Warranty ended' : daysLeftLabel(info.daysLeft)}
                  </Text>
                  <Text style={{ fontSize: 12, color: colors.gray }}>
                    {info.status === 'expired' ? 'Ended' : 'Ends'} {formatDate(info.end)}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                <View
                  style={{
                    flex: 1,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: colors.lightBlue,
                    overflow: 'hidden',
                  }}
                >
                  <View
                    style={{ width: `${info.progress}%`, height: '100%', backgroundColor: s.bar, borderRadius: 4 }}
                  />
                </View>
                <Text style={{ fontSize: 12, color: colors.gray, marginLeft: 8 }}>{info.progress}%</Text>
              </View>
            </Card>

            {/* QR */}
            <Card>
              <View style={{ alignItems: 'center', paddingVertical: 6 }}>
                <QRCode value={qrValue} size={110} color={colors.navy} />
                <Text style={{ fontSize: 12, color: colors.gray, marginTop: 10 }}>
                  Scan to view product passport
                </Text>
              </View>
            </Card>

            {/* Timeline */}
            <View
              style={{
                backgroundColor: colors.lightBlue,
                borderRadius: 14,
                padding: 14,
                marginBottom: 14,
              }}
            >
              <Timeline items={events} />
            </View>

            {/* Actions */}
            <TouchableOpacity
              onPress={() => setQrOpen(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.teal,
                borderRadius: 12,
                paddingVertical: 14,
                marginBottom: 10,
              }}
            >
              <Ionicons name="qr-code-outline" size={18} color={colors.white} />
              <Text style={{ color: colors.white, fontWeight: '600', fontSize: 15, marginLeft: 8 }}>Show QR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Alert.alert('Transfer ownership', 'The transfer flow is the next screen to build.')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: colors.teal,
                borderRadius: 12,
                paddingVertical: 14,
              }}
            >
              <Ionicons name="share-outline" size={18} color={colors.teal} />
              <Text style={{ color: colors.teal, fontWeight: '600', fontSize: 15, marginLeft: 8 }}>
                Transfer ownership
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Big QR */}
      <Modal visible={qrOpen} transparent animationType="fade" onRequestClose={() => setQrOpen(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(11,46,79,0.85)',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <View style={{ backgroundColor: colors.white, borderRadius: 20, padding: 24, alignItems: 'center' }}>
            <QRCode value={qrValue} size={240} color={colors.navy} />
            <Text style={{ fontSize: 16, fontWeight: '600', color: colors.navy, marginTop: 16 }}>
              {product.name}
            </Text>
            <TouchableOpacity
              onPress={() => setQrOpen(false)}
              style={{
                marginTop: 16,
                backgroundColor: colors.teal,
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 28,
              }}
            >
              <Text style={{ color: colors.white, fontWeight: '600' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProductPassportScreen;
import { useState } from 'react';
import { Alert, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';
import { products, getWarrantyInfo, formatDate } from '../../data';
import { FocusedStatusBar } from '../../components/FocusedStatusBar';

type IconName = keyof typeof Ionicons.glyphMap;

// Edit these details to match the real user
const user = {
  name: 'Asmit',
  phone: '+977 98XXXXXXXX',
  email: 'asmit@example.com',
  city: 'Kathmandu, Nepal',
  memberSince: '2025-10-18',
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.navy, marginBottom: 8 }}>{title}</Text>
    <View
      style={{
        backgroundColor: colors.white,
        borderRadius: 14,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      {children}
    </View>
  </View>
);

const rowBase = (last?: boolean) =>
  ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: last ? 0 : 1,
    borderBottomColor: colors.border,
  }) as const;

const InfoRow = ({ icon, label, value, last }: { icon: IconName; label: string; value: string; last?: boolean }) => (
  <View style={rowBase(last)}>
    <Ionicons name={icon} size={20} color={colors.teal} style={{ width: 32 }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 12, color: colors.gray }}>{label}</Text>
      <Text style={{ fontSize: 14, fontWeight: '600', color: colors.navy, marginTop: 1 }}>{value}</Text>
    </View>
  </View>
);

const ToggleRow = ({
  icon,
  label,
  value,
  onChange,
  last,
}: {
  icon: IconName;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
  last?: boolean;
}) => (
  <View style={rowBase(last)}>
    <Ionicons name={icon} size={20} color={colors.teal} style={{ width: 32 }} />
    <Text style={{ flex: 1, fontSize: 14, color: colors.navy }}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onChange}
      trackColor={{ false: colors.border, true: colors.teal }}
      thumbColor={colors.white}
    />
  </View>
);

const LinkRow = ({
  icon,
  label,
  right,
  onPress,
  last,
}: {
  icon: IconName;
  label: string;
  right?: string;
  onPress?: () => void;
  last?: boolean;
}) => (
  <TouchableOpacity onPress={onPress} style={rowBase(last)}>
    <Ionicons name={icon} size={20} color={colors.teal} style={{ width: 32 }} />
    <Text style={{ flex: 1, fontSize: 14, color: colors.navy }}>{label}</Text>
    {right ? <Text style={{ fontSize: 13, color: colors.gray, marginRight: 6 }}>{right}</Text> : null}
    <Ionicons name="chevron-forward" size={18} color={colors.gray} />
  </TouchableOpacity>
);

const ProfileScreen = () => {
  const [expiryAlerts, setExpiryAlerts] = useState(true);
  const [repairUpdates, setRepairUpdates] = useState(true);

  const initials = user.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const underWarranty = products.filter((p) => getWarrantyInfo(p).status === 'active').length;
  const repairs = products.reduce((sum, p) => sum + p.repairs.length, 0);

  const stats = [
    { label: 'Products', value: products.length },
    { label: 'Under warranty', value: underWarranty },
    { label: 'Repairs', value: repairs },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.navy }} edges={['top']}>
      <FocusedStatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 16 }}>
          {/* Header */}
          <View style={{ backgroundColor: colors.navy, alignItems: 'center', paddingTop: 16, paddingBottom: 28 }}>
            <View
              style={{
                width: 76,
                height: 76,
                borderRadius: 38,
                backgroundColor: colors.teal,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 3,
                borderColor: 'rgba(255,255,255,0.3)',
              }}
            >
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.white }}>{initials}</Text>
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.white, marginTop: 10 }}>{user.name}</Text>
            <Text style={{ fontSize: 13, color: colors.lightBlue, marginTop: 2 }}>{user.phone}</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255,255,255,0.12)',
                borderRadius: 12,
                paddingVertical: 4,
                paddingHorizontal: 10,
                marginTop: 10,
              }}
            >
              <Ionicons name="shield-checkmark" size={13} color={colors.teal} />
              <Text style={{ fontSize: 12, color: colors.white, marginLeft: 5 }}>
                Member since {formatDate(user.memberSince)}
              </Text>
            </View>
          </View>

          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            {/* Stats */}
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
              {stats.map((s) => (
                <View
                  key={s.label}
                  style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    borderRadius: 14,
                    paddingVertical: 14,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.navy }}>{s.value}</Text>
                  <Text style={{ fontSize: 12, color: colors.gray, marginTop: 2 }}>{s.label}</Text>
                </View>
              ))}
            </View>

            <Section title="Account">
              <InfoRow icon="person-outline" label="Full name" value={user.name} />
              <InfoRow icon="call-outline" label="Phone" value={user.phone} />
              <InfoRow icon="mail-outline" label="Email" value={user.email} />
              <InfoRow icon="location-outline" label="Location" value={user.city} last />
            </Section>

            <Section title="Notifications">
              <ToggleRow
                icon="time-outline"
                label="Warranty expiry alerts"
                value={expiryAlerts}
                onChange={setExpiryAlerts}
              />
              <ToggleRow
                icon="build-outline"
                label="Repair updates"
                value={repairUpdates}
                onChange={setRepairUpdates}
              />
              <LinkRow icon="notifications-outline" label="Remind me before expiry" right="30 days" last />
            </Section>

            <Section title="Support">
              <LinkRow
                icon="help-circle-outline"
                label="Help and support"
                onPress={() => Alert.alert('Help and support', 'Contact: support@merobill.app')}
              />
              <LinkRow
                icon="lock-closed-outline"
                label="Privacy and data"
                onPress={() => Alert.alert('Privacy', 'Your ownership details stay private to you.')}
              />
              <LinkRow icon="information-circle-outline" label="About MeroBill" right="v1.0.0" last />
            </Section>

            <TouchableOpacity
              onPress={() => Alert.alert('Log out', 'Login is not built yet.')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: colors.red,
                borderRadius: 12,
                paddingVertical: 13,
              }}
            >
              <Ionicons name="log-out-outline" size={18} color={colors.red} />
              <Text style={{ color: colors.red, fontWeight: '600', fontSize: 15, marginLeft: 8 }}>Log out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
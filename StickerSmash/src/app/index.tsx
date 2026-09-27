import { useState } from 'react';

import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const colors = {
  navy: '#102A43',
  teal: '#00A896',
  white: '#FFFFFF',
  lightBlue: '#EAF6F6',
  amber: '#F4B942',
  gray: '#334E68',
};

type QuickActionProps = {
  label: string;
  icon: string;
  onPress: () => void;
};

const QuickAction = ({ label, icon, onPress }: QuickActionProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      alignItems: 'center',
      marginRight: 18,
    }}
  >
    <View
      style={{
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: colors.lightBlue,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
      }}
    >
      <Text style={{ fontSize: 20 }}>{icon}</Text>
    </View>
    <Text style={{ fontSize: 12, color: colors.gray }}>{label}</Text>
  </TouchableOpacity>
);

type EmptyStateProps = {
  icon: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

const EmptyState = ({ icon, message, actionLabel, onAction }: EmptyStateProps) => (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 30,
      backgroundColor: colors.lightBlue,
      borderRadius: 14,
    }}
  >
    <View
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
      }}
    >
      <Text style={{ fontSize: 18, color: colors.teal }}>{icon}</Text>
    </View>
    <Text style={{ fontSize: 13, color: colors.gray, marginBottom: 12 }}>
      {message}
    </Text>
    {actionLabel ? (
      <TouchableOpacity
        onPress={onAction}
        style={{
          borderWidth: 1,
          borderColor: colors.teal,
          borderRadius: 10,
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: '600', color: colors.teal }}>
          {actionLabel}
        </Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

const App = () => {

  const [text, setText] = useState('Welcome to MeroBill!');

  return (
    <ScrollView style={{ backgroundColor: colors.white }}>

      <View style={{ padding: 20, paddingTop: 60 }}>

        {/* Top bar */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <View>
            <Text style={{ fontSize: 13, color: colors.gray }}>Good morning</Text>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.navy }}>
      
            </Text>
          </View>

          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: colors.navy,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>MB</Text>
          </View>
        </View>

        {/* Warranty health strip - empty state */}
        <View
          style={{
            backgroundColor: colors.navy,
            borderRadius: 18,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <Text style={{ fontSize: 13, color: colors.lightBlue, marginBottom: 4 }}>
            Warranty Health
          </Text>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#fff' }}>
            0 / 0
          </Text>
          <Text style={{ fontSize: 13, color: colors.lightBlue, marginTop: 4, marginBottom: 14 }}>
            add a product to start tracking
          </Text>

          <View
            style={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(255,255,255,0.15)',
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                width: '0%',
                height: '100%',
                backgroundColor: colors.teal,
                borderRadius: 4,
              }}
            />
          </View>
        </View>

        {/* Quick actions - horizontal scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 26 }}
        >
          <QuickAction icon="＋" label="Add" onPress={() => setText('Add a new product')} />
          <QuickAction icon="▢" label="Scan QR" onPress={() => setText('Scan a product QR code')} />
          <QuickAction icon="🛠" label="Repairs" onPress={() => setText('View repair history')} />
          <QuickAction icon="⇄" label="Transfer" onPress={() => setText('Start ownership transfer')} />
          <QuickAction icon="⏰" label="Reminders" onPress={() => setText('View reminders')} />
        </ScrollView>

        {/* Products - empty */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.navy }}>
            Your Products
          </Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <EmptyState
            icon="📦"
            message="No products added yet"
            actionLabel="Add your first product"
            onAction={() => setText('Add a new product')}
          />
        </View>

        {/* Repairs - empty */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.navy, marginBottom: 8 }}>
          Repair History
        </Text>
        <View style={{ marginBottom: 20 }}>
          <EmptyState icon="🛠" message="No repair records yet" />
        </View>

        {/* Transfers - empty */}
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.navy, marginBottom: 8 }}>
          Ownership Transfers
        </Text>
        <View style={{ marginBottom: 26 }}>
          <EmptyState icon="⇄" message="No transfers in progress" />
        </View>

        {/* State result */}
        <Text
          style={{
            fontSize: 14,
            color: colors.teal,
            marginBottom: 20,
            fontStyle: 'italic',
          }}
        >
          {text}
        </Text>

        {/* Footer */}
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 16,
          }}
        >
          <Text style={{ fontSize: 12, color: colors.gray }}>
            MeroBill • Digital Product Ownership & Warranty Wallet
          </Text>
        </View>

      </View>

    </ScrollView>
  );
};

export default App;
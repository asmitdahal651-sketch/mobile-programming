import { useRef, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from 'expo-router/react-navigation';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { colors } from '../../theme';
import { FocusedStatusBar } from '../../components/FocusedStatusBar';

const Corner = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const w = 5;
  const styles = {
    tl: { top: 0, left: 0, borderTopWidth: w, borderLeftWidth: w, borderTopLeftRadius: 18 },
    tr: { top: 0, right: 0, borderTopWidth: w, borderRightWidth: w, borderTopRightRadius: 18 },
    bl: { bottom: 0, left: 0, borderBottomWidth: w, borderLeftWidth: w, borderBottomLeftRadius: 18 },
    br: { bottom: 0, right: 0, borderBottomWidth: w, borderRightWidth: w, borderBottomRightRadius: 18 },
  } as const;

  return (
    <View
      style={[
        { position: 'absolute', width: 46, height: 46, borderColor: colors.teal },
        styles[position],
      ]}
    />
  );
};

const ScanBillScreen = () => {
  const insets = useSafeAreaInsets();
  const focused = useIsFocused();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [busy, setBusy] = useState(false);

  const onCapture = async () => {
    if (!permission?.granted) {
      requestPermission();
      return;
    }
    try {
      setBusy(true);
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.7 });
      if (photo) {
        // TODO: send photo.uri to your OCR step to read the date, price and shop
        Alert.alert('Bill captured', 'Reading the bill (OCR) is the next step to build.');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.navy }}>
      <FocusedStatusBar style="light" />

      {/* Camera area */}
      <View style={{ flex: 1, backgroundColor: '#1B2B3A' }}>
        {permission?.granted && focused ? (
          <CameraView ref={cameraRef} facing="back" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 }}>
            <Text style={{ color: colors.white, textAlign: 'center', marginBottom: 14 }}>
              MeroBill needs camera access to scan your bill.
            </Text>
            <TouchableOpacity
              onPress={requestPermission}
              style={{ backgroundColor: colors.teal, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20 }}
            >
              <Text style={{ color: colors.white, fontWeight: '600' }}>Allow camera</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Frame */}
        <View
          style={{
            position: 'absolute',
            top: insets.top + 24,
            left: 36,
            right: 36,
            bottom: 40,
            pointerEvents: 'none',
          }}
        >
          <Corner position="tl" />
          <Corner position="tr" />
          <Corner position="bl" />
          <Corner position="br" />
        </View>
      </View>

      {/* Bottom panel */}
      <View
        style={{
          backgroundColor: colors.navy,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          marginTop: -24,
          paddingTop: 12,
          paddingBottom: 4,
          alignItems: 'center',
        }}
      >
        <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.25)', marginBottom: 14 }} />
        <Text style={{ fontSize: 17, fontWeight: 'bold', color: colors.white }}>Place the bill inside the frame</Text>
        <Text style={{ fontSize: 13, color: colors.lightBlue, marginTop: 4, marginBottom: 16 }}>
          We&apos;ll read the date, price and shop for you.
        </Text>

        <TouchableOpacity
          onPress={onCapture}
          disabled={busy}
          accessibilityLabel="Capture bill"
          style={{
            width: 78,
            height: 78,
            borderRadius: 39,
            borderWidth: 3,
            borderColor: 'rgba(255,255,255,0.4)',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: busy ? 0.6 : 1,
          }}
        >
          <View style={{ width: 62, height: 62, borderRadius: 31, backgroundColor: colors.white }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScanBillScreen;
import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { styles } from '../styles/ScannerScreen.styles';
import { verificarPatrimonioCSV } from '../services/inventoryService';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const isProcessingRef = useRef(false);

  const iniciarLeitura = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert('Permissão Negada', 'É necessário permitir o acesso à câmera para ler os códigos.');
        return;
      }
    }
    isProcessingRef.current = false;
    setLoading(false);
    setIsScanning(true);
  };

  const handleBarcodeScanned = ({ type, data }) => {
    if (isProcessingRef.current) return;

    isProcessingRef.current = true;
    setLoading(true);

    setTimeout(async () => {
      // --- MUDANÇA AQUI: Adicionado await para esperar a leitura do arquivo ---
      const resultado = await verificarPatrimonioCSV(data);

      setIsScanning(false);
      setLoading(false);

      Alert.alert(
        resultado.titulo,
        `Código: ${data}\n${resultado.mensagem}`,
        [
          {
            text: 'OK',
            onPress: () => {
              isProcessingRef.current = false;
            },
          },
        ]
      );
    }, 2000);
  };

  if (isScanning) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.cameraView}
          facing="back"
          onBarcodeScanned={handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['code128', 'ean13', 'ean8', 'qr'],
          }}
        />

        {!loading && (
          <View style={styles.scannerMask} pointerEvents="none">
            <View style={styles.maskFrame} />
            <Text style={styles.instructionText}>Aponte o código para o centro</Text>
          </View>
        )}

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.loadingText}>Buscando no inventário...</Text>
          </View>
        )}

        {!loading && (
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => {
              isProcessingRef.current = false;
              setIsScanning(false);
            }}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Leitor de Inventário</Text>
          <Text style={styles.description}>
            Aponte a câmera para o código de barras ou QR Code do patrimônio para realizar a conferência dos itens.
          </Text>

          <TouchableOpacity style={styles.buttonPrimary} onPress={iniciarLeitura}>
            <Text style={styles.buttonPrimaryText}>Ler Código</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { styles } from '../styles/ScannerScreen.styles';

import { verificarPatrimonioCSV } from '../services/inventoryService';
import { scanSessionService } from '../services/scanSessionService';

export default function ScannerScreen({ onEncerrar }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [lendo, setLendo] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [temLeituras, setTemLeituras] = useState(false);
  
  const processandoLeitura = useRef(false);

  useEffect(() => {
    if (scanSessionService?.temLeituras) {
      setTemLeituras(scanSessionService.temLeituras());
    }
  }, []);

  const iniciarLeitura = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert('Permissão Negada', 'É preciso permitir o uso da câmera para ler os códigos.');
        return;
      }
    }
    processandoLeitura.current = false;
    setLendo(true);
  };

  const handleBarCodeScanned = async ({ data }) => {
    if (processandoLeitura.current) return;
    processandoLeitura.current = true;

    setLendo(false);
    setCarregando(true);

    setTimeout(async () => {
      try {
        const resultado = await verificarPatrimonioCSV(data);
        setCarregando(false);

        if (scanSessionService?.adicionarLeitura) {
          scanSessionService.adicionarLeitura(data, resultado.encontrado, resultado.descricao);
        }
        setTemLeituras(true);

        Alert.alert(
          resultado.titulo,
          `Código: ${data}\n${resultado.mensagem}`,
          [
            {
              text: 'OK',
              onPress: () => {
                processandoLeitura.current = false;
              },
            },
          ],
          { cancelable: false }
        );
      } catch (error) {
        setCarregando(false);
        Alert.alert(
          'Erro ❌',
          'Falha ao processar a leitura no arquivo CSV.',
          [
            {
              text: 'OK',
              onPress: () => {
                processandoLeitura.current = false;
              },
            },
          ]
        );
      }
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {carregando && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#00FF66" />
          <Text style={styles.loadingText}>Lendo código, aguarde...</Text>
        </View>
      )}

      {lendo ? (
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.cameraView}
            facing="back"
            onBarcodeScanned={handleBarCodeScanned}
          />
          
          <View style={styles.scannerMask}>
            <View style={styles.maskFrame} />
            <Text style={styles.instructionText}>Aponte o código para o centro</Text>
          </View>

          <TouchableOpacity style={styles.cancelButton} onPress={() => setLendo(false)}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.title}>Leitor de Inventário</Text>
            <Text style={styles.description}>
              Aponte a câmera para o código de barras ou QR Code do patrimônio para realizar a conferência dos itens.
            </Text>

            <TouchableOpacity style={styles.buttonPrimary} onPress={iniciarLeitura}>
              <Text style={styles.buttonPrimaryText}>Ler Código</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              disabled={!temLeituras}
              style={[
                styles.buttonPrimary, 
                { 
                  marginTop: 12,
                  backgroundColor: temLeituras ? '#00A8FF' : '#E2E8F0',
                }
              ]} 
              onPress={onEncerrar}
            >
              <Text style={[styles.buttonPrimaryText, !temLeituras && { color: '#94A3B8' }]}>
                Encerrar Leitura
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
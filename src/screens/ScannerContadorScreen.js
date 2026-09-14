import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { styles } from '../styles/ScannerContadorScreen.styles';

// Importa a função do novo arquivo criado
import { exportarRelatorioCSV } from '../services/exportService';

export default function ScannerContadorScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [patrimoniosLidos, setPatrimoniosLidos] = useState([]);
  const [ultimoFeedback, setUltimoFeedback] = useState(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.textoPermissao}>Precisamos de permissão para a câmera</Text>
        <Button onPress={requestPermission} title="Conceder Permissão" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    if (patrimoniosLidos.includes(data)) {
      setUltimoFeedback(`⚠️ O patrimônio ${data} já foi contado.`);
    } else {
      // Aqui você pode integrar o inventoryService para validar no CSV depois
      setPatrimoniosLidos((prev) => [...prev, data]);
      setUltimoFeedback(`✅ Patrimônio ${data} registrado com sucesso!`);
    }

    setTimeout(() => {
      setScanned(false);
    }, 2000);
  };

  const limparContagem = () => {
    setPatrimoniosLidos([]);
    setUltimoFeedback(null);
  };

  const finalizarInventario = async () => {
    // Dados mockados temporários para teste (substituiremos pelos dados do CSV depois)
    const dadosOriginaisMocados = [
      { codigo: '12345', descricao: 'Mesa de Professor' },
      { codigo: '67890', descricao: 'Cadeira' }
    ]; 
    await exportarRelatorioCSV(patrimoniosLidos, dadosOriginaisMocados);
  };

 return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.contadorTexto}>Total Lidos: {patrimoniosLidos.length}</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button title="Zerar" onPress={limparContagem} color="#ff4444" />
          <Button title="Exportar" onPress={finalizarInventario} color="#00C851" />
        </View>
      </View>

      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
      </View>

      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackTexto}>
          {ultimoFeedback ? ultimoFeedback : 'Aponte para um código de barras'}
        </Text>
      </View>
    </SafeAreaView>
  );
}
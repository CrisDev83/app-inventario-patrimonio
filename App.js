import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView, StatusBar } from 'react-native';

import UploadScreen from './src/screens/UploadScreen';
import ScannerScreen from './src/screens/ScannerScreen';
import ScannerContadorScreen from './src/screens/ScannerContadorScreen';
import { styles } from './src/styles/App.styles';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('upload');
  const [mostrarSplash, setMostrarSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarSplash(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (mostrarSplash) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <Image
          source={require('./assets/logoEdu.png')}
          style={styles.splashLogo}
          resizeMode="contain"
        />
        <Text style={styles.splashTitle}>Inventário - Sec. Educação</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        {currentScreen === 'upload' && (
          <UploadScreen onSucesso={() => setCurrentScreen('scanner')} />
        )}
        {currentScreen === 'scanner' && (
          <ScannerScreen onEncerrar={() => setCurrentScreen('contador')} />
        )}
        {currentScreen === 'contador' && (
          <ScannerContadorScreen onVoltar={() => setCurrentScreen('scanner')} />
      )}
      </View>
    </SafeAreaView>
  );
}
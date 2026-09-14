import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import ScannerScreen from './src/screens/ScannerScreen';
import UploadScreen from './src/screens/UploadScreen';
import { styles } from './src/styles/App.styles';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('upload');
  const [mostrarSplash, setMostrarSplash] = useState(true);

  useEffect(() => {
    // Contador exato de 4 segundos (4000 ms)
    const timer = setTimeout(() => {
      setMostrarSplash(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Tela de Abertura Customizada (Exibida durante os 10 segundos)
  if (mostrarSplash) {
    return (
      <View style={splashStyles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <Image
          source={require('./assets/logoEdu.png')}
          style={splashStyles.logo}
          resizeMode="contain"
        />
        <Text style={splashStyles.title}>Inventário - Sec. Educação</Text>
      </View>
    );
  }

  // Aplicação Normal
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.navBar}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentScreen === 'upload' && styles.navButtonActive,
          ]}
          onPress={() => setCurrentScreen('upload')}
        >
          <Text
            style={[
              styles.navButtonText,
              currentScreen === 'upload' && styles.navButtonTextActive,
            ]}
          >
            Carregar CSV
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            currentScreen === 'scanner' && styles.navButtonActive,
          ]}
          onPress={() => setCurrentScreen('scanner')}
        >
          <Text
            style={[
              styles.navButtonText,
              currentScreen === 'scanner' && styles.navButtonTextActive,
            ]}
          >
            Ler Patrimônio
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {currentScreen === 'upload' ? <UploadScreen /> : <ScannerScreen />}
      </View>
    </SafeAreaView>
  );
}

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 300,
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 100,
    marginBottom: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
  },
});
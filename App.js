import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';

import ScannerScreen from './src/screens/ScannerScreen';
import UploadScreen from './src/screens/UploadScreen';
import { styles } from './src/styles/App.styles';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('upload');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Seletor / Botões de Navegação entre as telas */}
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

      {/* Renderização da Tela Ativa */}
      <View style={styles.content}>
        {currentScreen === 'upload' ? <UploadScreen /> : <ScannerScreen />}
      </View>
    </SafeAreaView>
  );
}
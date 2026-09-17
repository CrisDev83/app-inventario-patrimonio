import { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, StatusBar, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { styles } from '../styles/UploadScreen.styles';
import { salvarCSVImportado } from '../services/inventoryService';

// 1. Recebe a propriedade 'onSucesso' enviada pelo App.js
export default function UploadScreen({ onSucesso }) {
  const [arquivo, setArquivo] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const selecionarArquivoCSV = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync({
        type: ['text/csv', 'text/comma-separated-values', 'application/csv', '*/*'],
        copyToCacheDirectory: true,
      });

      if (!resultado.canceled && resultado.assets?.[0]) {
        setArquivo(resultado.assets[0]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao selecionar o arquivo CSV.');
    }
  };

  const enviarCSV = async () => {
    if (!arquivo) {
      Alert.alert('Atenção', 'Selecione um arquivo CSV primeiro.');
      return;
    }

    setCarregando(true);

    try {
      const sucesso = await salvarCSVImportado(arquivo.uri);

      if (sucesso) {
        // 2. Adiciona a ação onPress no botão OK para mudar de tela
        Alert.alert(
          'Sucesso! 🎉',
          `O arquivo "${arquivo.name}" foi importado. Agora o leitor utilizará essa nova lista!`,
          [
            {
              text: 'OK',
              onPress: () => {
                if (onSucesso) onSucesso();
              },
            },
          ]
        );
      } else {
        Alert.alert('Erro', 'Não foi possível salvar a nova lista de inventário.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao processar o arquivo importado.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Carregar Inventário</Text>
          <Text style={styles.subtitle}>Selecione um arquivo .csv contendo a lista de bens para importar.</Text>

          <TouchableOpacity style={styles.uploadArea} onPress={selecionarArquivoCSV} disabled={carregando}>
            <Text style={styles.uploadTextIcon}>📄</Text>
            <Text style={styles.uploadTitle}>
              {arquivo ? arquivo.name : 'Toque para selecionar o arquivo CSV'}
            </Text>
            {arquivo?.size && (
              <Text style={styles.uploadSize}>
                {(arquivo.size / 1024).toFixed(2)} KB
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, carregando && { opacity: 0.7 }]} 
            onPress={enviarCSV}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Subir Lista de Inventário</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
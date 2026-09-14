import { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, StatusBar } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { styles } from '../styles/UploadScreen.styles';
import { salvarCSVImportado } from '../services/inventoryService';

export default function UploadScreen() {
  const [arquivo, setArquivo] = useState(null);

  const selecionarArquivoCSV = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync({
        type: ['text/csv', 'text/comma-separated-values', 'application/csv', '*/*'],
        copyToCacheDirectory: true,
      });

      if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
        const file = resultado.assets[0];
        setArquivo(file);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao selecionar o arquivo CSV.');
    }
  };

  // --- Função envelope criada corretamente aqui ---
  const enviarCSV = async () => {
    if (!arquivo) {
      Alert.alert('Atenção', 'Selecione um arquivo CSV primeiro.');
      return;
    }

    const sucesso = await salvarCSVImportado(arquivo.uri);

    if (sucesso) {
      Alert.alert(
        'Sucesso! 🎉',
        `O arquivo "${arquivo.name}" foi importado. Agora o leitor utilizará essa nova lista!`
      );
    } else {
      Alert.alert('Erro', 'Não foi possível salvar a nova lista de inventário.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Carregar Inventário</Text>
          <Text style={styles.subtitle}>Selecione um arquivo .csv contendo a lista de bens para importar.</Text>

          <TouchableOpacity style={styles.uploadArea} onPress={selecionarArquivoCSV}>
            <Text style={styles.uploadTextIcon}>📄</Text>
            <Text style={styles.uploadTitle}>
              {arquivo ? arquivo.name : 'Toque para selecionar o arquivo CSV'}
            </Text>
            {arquivo && (
              <Text style={styles.uploadSize}>
                {(arquivo.size / 1024).toFixed(2)} KB
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={enviarCSV}>
            <Text style={styles.buttonText}>Subir Lista de Inventário</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
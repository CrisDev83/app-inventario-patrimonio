import Papa from 'papaparse';
// Importa da API legada do expo-file-system para manter compatibilidade no SDK 54
import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';

import csvFileModule from '../data/inventory.csv';
const CUSTOM_CSV_PATH = `${FileSystem.documentDirectory}custom_inventory.csv`;
/**
 * Carrega o texto do arquivo CSV e busca pelo código do patrimônio.
 * @param {string} codigoLido - O código escaneado pela câmera.
 */

/**
 * Salva o arquivo selecionado pelo usuário no armazenamento interno.
 */
export const salvarCSVImportado = async (uriOriginal) => {
  try {
    const conteudoContent = await FileSystem.readAsStringAsync(uriOriginal);
    await FileSystem.writeAsStringAsync(CUSTOM_CSV_PATH, conteudoContent);
    return true;
  } catch (error) {
    console.error('Erro ao salvar CSV importado:', error);
    return false;
  }
};

export const verificarPatrimonioCSV = async (codigoLido) => {
  try {
  let csvContent = '';

    // Verificamos se existe um arquivo personalizado salvo no dispositivo
    const fileInfo = await FileSystem.getInfoAsync(CUSTOM_CSV_PATH);

    if (fileInfo.exists) {
      csvContent = await FileSystem.readAsStringAsync(CUSTOM_CSV_PATH);
    } else {
      // Caso contrário, usa o arquivo padrão da pasta src/data
      const asset = Asset.fromModule(csvFileModule);
      await asset.downloadAsync();
      csvContent = await FileSystem.readAsStringAsync(asset.localUri || asset.uri);
    }
    
    // 3. O PapaParse faz a conversão do texto para Array de Objetos
    const parsedData = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,

    });

    // 4. Procura pela linha que contém o código informado
    const itemEncontrado = parsedData.data.find(
      (row) => row.codigo?.trim() === codigoLido?.trim()

    );
    if (itemEncontrado) {
      return {
        encontrado: true,
        titulo: 'Patrimônio Encontrado! ✅',
        mensagem: `Descrição: ${itemEncontrado.descricao}`,
      };
    }

    return {
      encontrado: false,
      titulo: 'Patrimônio Não Encontrado! ⚠️',
      mensagem: 'O código escaneado não consta no arquivo CSV.',
    };

  } catch (error) {
    console.error('Erro ao ler o arquivo CSV:', error);
    return {
      encontrado: false,
      titulo: 'Erro na Leitura ❌',
      mensagem: 'Não foi possível carregar a base de dados do CSV.',
    };
  }

};
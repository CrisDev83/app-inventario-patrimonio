import Papa from 'papaparse';
import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';

import csvFileModule from '../data/inventory.csv';
const CUSTOM_CSV_PATH = `${FileSystem.documentDirectory}custom_inventory.csv`;

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

/**
 * Normaliza textos removendo acentos, espaços, aspas e caracteres ocultos (BOM UTF-8)
 */
const normalizarTexto = (texto) =>
  texto
    ? texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^a-zA-Z0-9]/g, '')    // Remove caracteres invisíveis (BOM) e símbolos
        .toLowerCase()
        .trim()
    : '';

/**
 * Carrega o texto do arquivo CSV e busca pelo código do patrimônio.
 */
export const verificarPatrimonioCSV = async (codigoLido) => {
  try {
    let csvContent = '';

    const fileInfo = await FileSystem.getInfoAsync(CUSTOM_CSV_PATH);

    if (fileInfo.exists) {
      csvContent = await FileSystem.readAsStringAsync(CUSTOM_CSV_PATH);
    } else {
      const asset = Asset.fromModule(csvFileModule);
      await asset.downloadAsync();
      csvContent = await FileSystem.readAsStringAsync(asset.localUri || asset.uri);
    }

    const parsedData = Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
    });

    const codigoBuscado = String(codigoLido || '').trim();

    // Busca flexível e imune a caracteres oculta/BOM
    const itemEncontrado = parsedData.data.find((row) => {
      const chaveCodigo = Object.keys(row).find((key) => {
        const keyNormalizada = normalizarTexto(key);
        return keyNormalizada.includes('cod') || keyNormalizada.includes('patrimon');
      });

      if (!chaveCodigo || row[chaveCodigo] === undefined) return false;

      return String(row[chaveCodigo]).trim() === codigoBuscado;
    });

    // --- DIAGNÓSTICO DO CSV ---
    console.log('--- DIAGNÓSTICO DO CSV ---');
    console.log('Arquivo personalizado existe?', fileInfo.exists);
    console.log('Total de linhas lidas:', parsedData.data.length);
    console.log('Estrutura da 1ª linha:', parsedData.data[0]);
    console.log('Código procurado:', codigoBuscado);
    console.log('Patrimônio encontrado?', itemEncontrado ? 'SIM ✅' : 'NÃO ❌');
    // --------------------------

    if (itemEncontrado) {
      const chaveDescricao = Object.keys(itemEncontrado).find((key) => {
        const keyNormalizada = normalizarTexto(key);
        return keyNormalizada.includes('desc') || keyNormalizada.includes('item');
      });

      const descricao = chaveDescricao ? itemEncontrado[chaveDescricao] : 'Sem descrição disponível';

      return {
        encontrado: true,
        titulo: 'Patrimônio Encontrado! ✅',
        mensagem: `Descrição: ${descricao}`,
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
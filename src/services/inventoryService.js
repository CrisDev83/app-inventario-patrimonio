import Papa from 'papaparse';
import * as FileSystem from 'expo-file-system/legacy';
import { Asset } from 'expo-asset';

import csvFileModule from '../data/inventory.csv';
const CUSTOM_CSV_PATH = `${FileSystem.documentDirectory}custom_inventory.csv`;

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

const normalizarTexto = (texto) =>
  texto
    ? texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLowerCase()
        .trim()
    : '';

export const obterTotalItensBase = async () => {
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

    return parsedData.data ? parsedData.data.length : 0;
  } catch (error) {
    console.error('Erro ao contar itens do CSV:', error);
    return 0;
  }
};

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

    const itemEncontrado = parsedData.data.find((row) => {
      const chaveCodigo = Object.keys(row).find((key) => {
        const keyNormalizada = normalizarTexto(key);
        return keyNormalizada.includes('cod') || keyNormalizada.includes('patrimon');
      });

      if (!chaveCodigo || row[chaveCodigo] === undefined) return false;

      return String(row[chaveCodigo]).trim() === codigoBuscado;
    });

    if (itemEncontrado) {
      const chaveDescricao = Object.keys(itemEncontrado).find((key) => {
        const keyNormalizada = normalizarTexto(key);
        return keyNormalizada.includes('desc') || keyNormalizada.includes('item');
      });

      const descricao = chaveDescricao ? itemEncontrado[chaveDescricao] : 'Sem descrição';

      return {
        encontrado: true,
        titulo: 'Patrimônio Encontrado! ✅',
        mensagem: `Descrição: ${descricao}`,
        descricao: descricao,
      };
    }

    return {
      encontrado: false,
      titulo: 'Patrimônio Não Encontrado! ⚠️',
      mensagem: 'O código escaneado não consta no arquivo CSV.',
      descricao: 'Item não cadastrado',
    };
  } catch (error) {
    console.error('Erro ao ler o arquivo CSV:', error);
    return {
      encontrado: false,
      titulo: 'Erro na Leitura ❌',
      mensagem: 'Não foi possível carregar a base de dados do CSV.',
      descricao: 'Erro de leitura',
    };
  }
};



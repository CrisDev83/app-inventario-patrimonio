import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

export const exportarRelatorioCSV = async (listaLidos = []) => {
  try {
    const itens = Array.isArray(listaLidos) ? listaLidos : [];

    if (itens.length === 0) {
      Alert.alert('Exportar', 'Não há leituras registradas para exportar.');
      return;
    }

    // \uFEFF força o Excel a ler os acentos em UTF-8 corretamente
    let csvContent = '\uFEFFCodigo;Descricao;Status\n';

    itens.forEach((item) => {
      const codigoRaw = typeof item === 'object' ? item?.codigo : item;
      const descricaoRaw = typeof item === 'object' ? (item?.descricao || 'Sem descrição') : 'Sem descrição';
      const statusRaw = typeof item === 'object' && item?.encontrado ? 'Encontrado' : 'Não Encontrado';

      // 1. Duplica as aspas internas (") -> ("") para não quebrar as colunas no Excel
      // 2. Substitui quebras de linha por espaço para manter o item numa única linha
      const codigo = String(codigoRaw || '').replace(/"/g, '""');
      const descricao = String(descricaoRaw || '').replace(/"/g, '""').replace(/[\r\n]+/g, ' ');
      const status = String(statusRaw || '').replace(/"/g, '""');

      csvContent += `"${codigo}";"${descricao}";"${status}"\n`;
    });

    const filePath = `${FileSystem.documentDirectory}relatorio_inventario.csv`;

    await FileSystem.writeAsStringAsync(filePath, csvContent, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const podeCompartilhar = await Sharing.isAvailableAsync();
    if (podeCompartilhar) {
      await Sharing.shareAsync(filePath, {
        mimeType: 'text/csv',
        dialogTitle: 'Exportar Relatório do Inventário',
        UTI: 'public.comma-separated-values-text',
      });
    } else {
      Alert.alert('Sucesso ✅', `Relatório salvo em: ${filePath}`);
    }
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    Alert.alert('Erro ❌', 'Ocorreu um problema ao gerar o arquivo do relatório.');
  }
};
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const exportarRelatorioCSV = async (patrimoniosLidos, dadosOriginais) => {
  try {
    // Monta o cabeçalho com a nova coluna
    let csvString = 'Codigo;Descricao;Status\n';

    // Percorre o CSV original verificando o status
    dadosOriginais.forEach((item) => {
      // Adapte 'codigo' para o nome exato da chave usada no seu CSV lido
      const codigoItem = item.codigo ? item.codigo.toString() : ''; 
      const descricao = item.descricao ? item.descricao : 'Sem descrição';
      
      const status = patrimoniosLidos.includes(codigoItem) 
        ? 'Encontrado' 
        : 'Não Encontrado';

      csvString += `${codigoItem};${descricao};${status}\n`;
    });

    // Define o caminho para salvar o novo arquivo
    const fileUri = FileSystem.documentDirectory + 'relatorio_inventario.csv';
    
    // Escreve o arquivo no armazenamento local
    await FileSystem.writeAsStringAsync(fileUri, csvString, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // Abre a janela de compartilhamento do celular
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: 'Exportar Relatório de Inventário',
      });
    }
  } catch (error) {
    console.error("Erro ao gerar relatório:", error);
  }
};
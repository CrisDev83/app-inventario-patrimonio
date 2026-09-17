import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/ScannerContadorScreen.styles';
import { exportarRelatorioCSV } from '../services/exportService';
import { scanSessionService } from '../services/scanSessionService';

export default function ScannerContadorScreen({ onVoltar }) {
  const [resumo, setResumo] = useState({
    totalLidos: 0,
    encontrados: 0,
    naoEncontrados: 0,
    listaLidos: [],
  });

  useEffect(() => {
    carregarDadosDashboard();
  }, []);

  const carregarDadosDashboard = () => {
    if (scanSessionService?.obterResumo) {
      const dados = scanSessionService.obterResumo();
      setResumo(dados);
    }
  };

  const handleLimparContagem = () => {
    Alert.alert(
      'Zerar Contagem',
      'Tem certeza de que deseja zerar os dados da conferência atual?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Zerar',
          style: 'destructive',
          onPress: () => {
            if (scanSessionService?.resetarSessao) scanSessionService.resetarSessao();
            carregarDadosDashboard();
          },
        },
      ]
    );
  };

  const handleExportar = async () => {
    if (typeof exportarRelatorioCSV === 'function') {
      await exportarRelatorioCSV(resumo.listaLidos);
    } else {
      Alert.alert('Exportar', 'Relatório gerado com sucesso.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Dashboard do Inventário</Text>
        <Text style={styles.subtitle}>Resumo em tempo real dos itens conferidos</Text>

        <View style={styles.cardsContainer}>
          <View style={[styles.card, styles.cardTotal]}>
            <Text style={styles.cardValor}>{resumo.totalLidos}</Text>
            <Text style={styles.cardRotulo}>Total Lidos</Text>
          </View>

          <View style={[styles.card, styles.cardSucesso]}>
            <Text style={styles.cardValor}>{resumo.encontrados}</Text>
            <Text style={styles.cardRotulo}>Encontrados</Text>
          </View>

          <View style={[styles.card, styles.cardAlerta]}>
            <Text style={styles.cardValor}>{resumo.naoEncontrados}</Text>
            <Text style={styles.cardRotulo}>Não Encontrados</Text>
          </View>
        </View>

        <View style={styles.acoesContainer}>
          <TouchableOpacity style={styles.btnExportar} onPress={handleExportar}>
            <Text style={styles.btnTexto}>Exportar Relatório CSV</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnZerar} onPress={handleLimparContagem}>
            <Text style={styles.btnZerarTexto}>Zerar Contagem</Text>
          </TouchableOpacity>

          {/* Botão Discreto de Navegação */}
          <TouchableOpacity style={styles.btnVoltarDiscreto} onPress={onVoltar}>
            <Text style={styles.btnVoltarTexto}>← Voltar para Leitura</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
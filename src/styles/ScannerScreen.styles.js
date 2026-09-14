import { StyleSheet, Dimensions } from 'react-native';

// Captura a largura (width) e a altura (height) exatas da tela do dispositivo
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // Container principal da tela de entrada (Landing Page)
  container: {
    flex: 1, // Ocupa todo o espaço vertical disponível
    backgroundColor: '#F5F7FA', // Cor de fundo cinza claro/suave
  },

  // Área interna de conteúdo centralizado da tela inicial
  content: {
    flex: 1,
    padding: 20, // Espaçamento nas laterais
    justifyContent: 'center', // Centraliza o Card verticalmente
    alignItems: 'center', // Centraliza o Card horizontalmente
  },

  // Estilo do Cartão Principal da tela inicial
  card: {
    width: '100%', // Ocupa toda a largura interna com padding
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 16, // Bordas arredondadas
    padding: 24, // Espaçamento interno
    alignItems: 'center',
    
    // Sombras para Android e iOS
    elevation: 3, // Sombra no Android
    shadowColor: '#000', // Cor da sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  // Título dentro do Card
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A202C', // Escuro para alto contraste
    marginBottom: 10,
    textAlign: 'center',
  },

  // Texto descritivo/instruções dentro do Card
  description: {
    fontSize: 14,
    color: '#718096', // Cinza intermediário
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20, // Altura entre linhas para facilitar a leitura
  },

  // Botão "Ler Código" da tela inicial
  buttonPrimary: {
    width: '100%',
    backgroundColor: '#0066CC', // Azul corporativo
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  // Texto interno do botão principal
  buttonPrimaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Container pai da visualização de Câmera
  cameraContainer: {
    width: width, // Força a largura total do dispositivo
    height: height, // Força a altura total do dispositivo
    backgroundColor: '#000000', // Fundo preto enquanto a câmera inicializa
  },

  // Elemento real do leitor da Câmera
  cameraView: {
    width: width,
    height: height,
    position: 'absolute', // Fica fixo cobrindo toda a tela por trás dos outros elementos
    top: 0,
    left: 0,
  },

  // Camada sobreposta para alinhar a Mira no centro absoluto da tela
  scannerMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    justifyContent: 'center', // Centraliza o quadrado na vertical
    alignItems: 'center', // Centraliza o quadrado na horizontal
    backgroundColor: 'transparent', // Fundo totalmente transparente para ver a câmera
    zIndex: 2, // Fica acima da tela da câmera
  },

  // Quadrado (Mira) onde o código de barras deve ser mirado
  maskFrame: {
    width: 260, // Largura do quadrado da mira
    height: 260, // Altura do quadrado da mira
    borderWidth: 3, // Espessura da borda
    borderColor: '#00FF66', // Verde fluor/destaque para a mira
    borderRadius: 16, // Cantos levemente arredondados
    backgroundColor: 'transparent', // Mantém o centro transparente para ver o código
  },

  // Caixinha com o texto instrucional abaixo do quadrado da mira
  instructionText: {
    color: '#FFFFFF',
    fontSize: 15,
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fundo escuro semi-transparente para legibilidade
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },

  // Botão vermelho de "Cancelar" na câmera
  cancelButton: {
    position: 'absolute',
    bottom: 60, // Distância em relação à borda inferior
    alignSelf: 'center', // Centraliza o botão no rodapé
    backgroundColor: '#FF3B30', // Vermelho de alerta/cancelamento
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 8,
    zIndex: 10, // Garante que o botão fique acima da máscara e seja clicável
  },

  // Texto interno do botão cancelar
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Tela de Carregamento (Overlay escuro exibido por 2 segundos após bipar)
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fundo preto escurecido com 80% de opacidade
    justifyContent: 'center', // Centraliza o spinner e o texto
    alignItems: 'center',
    zIndex: 20, // Sobrepõe todos os outros elementos da tela durante o delay
  },

  // Texto "Lendo código, aguarde..."
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
});
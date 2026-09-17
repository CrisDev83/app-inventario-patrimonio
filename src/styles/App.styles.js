import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  // Estilos da Splash (Tela de Abertura)
  splashContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogo: {
    width: 220,
    height: 100,
    marginBottom: 20,
  },
  splashTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
  },
  // Estilos da Navegação
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  navButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  navButtonActive: {
    backgroundColor: '#0066CC',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#718096',
  },
  navButtonTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
});
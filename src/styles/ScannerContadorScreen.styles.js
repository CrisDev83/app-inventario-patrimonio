import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#003366',
  },
  contadorTexto: { fontSize: 20, fontWeight: 'bold', color: '#ffffff' },
  cameraContainer: { flex: 1, margin: 15, borderRadius: 10, overflow: 'hidden' },
  camera: { flex: 1 },
  feedbackContainer: { padding: 20, alignItems: 'center', backgroundColor: '#ffffff' },
  feedbackTexto: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  textoPermissao: { textAlign: 'center', marginBottom: 20, fontSize: 16 },
});
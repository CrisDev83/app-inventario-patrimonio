import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 24,
  },
  cardsContainer: {
    gap: 14,
    marginBottom: 28,
  },
  card: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTotal: {
    backgroundColor: '#2563EB',
  },
  cardSucesso: {
    backgroundColor: '#10B981',
  },
  cardAlerta: {
    backgroundColor: '#EF4444',
  },
  cardValor: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardRotulo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 4,
    opacity: 0.95,
  },
  acoesContainer: {
    gap: 12,
  },
  btnExportar: {
    backgroundColor: '#0066FF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnZerar: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnZerarTexto: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnVoltarDiscreto: {
    marginTop: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnVoltarTexto: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
});
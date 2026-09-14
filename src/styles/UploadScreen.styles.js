import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  uploadArea: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#0066CC',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#F0F7FF',
    marginBottom: 20,
  },
  uploadTextIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  uploadTitle: {
    fontSize: 15,
    color: '#0066CC',
    fontWeight: '600',
    textAlign: 'center',
  },
  uploadSize: {
    fontSize: 12,
    color: '#718096',
    marginTop: 4,
  },
  button: {
    width: '100%',
    backgroundColor: '#0066CC',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
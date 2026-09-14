import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
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
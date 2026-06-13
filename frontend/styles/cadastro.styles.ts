import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: 'auto',
    justifyContent: 'center',
  padding: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    width: 'auto',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2F5BB7',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },

  description: {
    textAlign: 'center',
    color: '#636E72',
    marginTop: 8,
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDE3EA',
    borderRadius: 10,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  roleContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 15,
  },

  roleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDE3EA',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  roleButtonSelected: {
    backgroundColor: '#3C096C',
    borderColor: '#2F5BB7',
  },

  roleText: {
    color: '#636E72',
    fontWeight: '600',
  },

  roleTextSelected: {
    color: '#FFF',
  },

  button: {
    backgroundColor: '#3C096C',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDE3EA',
  },

  dividerText: {
    marginHorizontal: 10,
    color: '#636E72',
    fontSize: 12,
  },

  socialButton: {
    borderWidth: 1,
    borderColor: '#DDE3EA',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#FFF',
  },

  socialText: {
    color: '#333',
    fontWeight: '600',
  },
});
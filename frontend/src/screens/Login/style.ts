import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#FFFFFF', // Branco puro garantido
    padding: 20,
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#1F4EA3',
    textAlign: 'center',
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 25,
    borderWidth: 1,
    borderColor: '#8c3f9b',
    // Configuração de sombra para destaque
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#8c3f9b',
    fontWeight: '500',
  },

  input: {
    borderWidth: 1,
    borderColor: '#305cb1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    color: '#000',
  },

  link: {
    color: '#8c3f9b',
    marginBottom: 20,
    fontSize: 14,
    textAlign: 'right',
  },

  botaoLogin: {
    backgroundColor: '#1F4EA3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  textoBotaoLogin: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
  },

  botaoCadastro: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#A33AA3',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  textoBotaoCadastro: {
    fontWeight: '500',
    fontSize: 15,
    color: '#8c3f9b',
  }
});

export default styles;

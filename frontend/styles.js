import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 60,
    alignSelf: 'center',
    marginBottom: 30,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#1F4EA3',
  },
  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 25,
    borderWidth: 1,
    borderColor: '#8c3f9b',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#305cb1',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#305cb1',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 18,
    backgroundColor: '#fff',
  },
  link: {
    color: '#8c3f9b',
    marginBottom: 18,
    fontSize: 13,
  },
  botaoLogin: {
    backgroundColor: '#1F4EA3',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  textoBotaoLogin: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffffff',
  },
  botaoCadastro: {
    marginTop: 25,
    borderWidth: 1,
    borderColor: '#A33AA3',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textoBotaoCadastro: {
    fontWeight: '500',
    fontSize: 15,
    color: '#8c3f9b',
  }
});

export default styles;
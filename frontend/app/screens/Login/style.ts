import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 20,
    paddingTop: 40,
    
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333', 
    marginBottom: 20,
  },
  input: { 
    height: 50,
    borderColor: '#CCC', 
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  button: { 
    backgroundColor: '#2F5BB7',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { 
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

})

export { styles } 

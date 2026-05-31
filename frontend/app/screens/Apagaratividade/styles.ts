import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    paddingHorizontal: 22,
    justifyContent: 'center',
  },
    subtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8E44AD',
    marginBottom: 12,
  },
    title: {
  fontSize: 56,
  fontWeight: 'bold',
  color: '#111',
  marginBottom: 20,
},

description: {
  fontSize: 18,
  lineHeight: 34,
  color: '#6E6E73',
  marginBottom: 40,
},

 infoContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 25,
  marginBottom: 30,
},
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  boxContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#EAEAEA', 
    marginVertical: 16,
  },
  infoNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000000',
  },
  infoText: {
    fontSize: 15,
    color: '#555555',
    fontWeight: '500',
    marginTop: 4,
  },
  infoSubText: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '400',
  },
  confirmButton: {
    backgroundColor: '#3B43FF', 
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, 
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
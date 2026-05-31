import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FB',
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 50,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 50,
  },

  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5B5BD6',

    shadowColor: '#6D3FD3',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },

  logoIcon: {
    fontSize: 26,
  },

  logoText: {
    marginLeft: 12,
    fontSize: 22,
    fontWeight: '700',
    color: '#5A55D2',
  },

  hero: {
    alignItems: 'center',
    marginBottom: 48,
  },

  title: {
    textAlign: 'center',
    fontSize: 42,
    lineHeight: 48,
    fontWeight: '800',
    color: '#1F2937',
  },

  titleGradient: {
    fontSize: 42,
    fontWeight: '800',
    color: '#6752DB',
  },

  description: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 34,
    color: '#6B7280',
    paddingHorizontal: 10,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 28,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 8,
  },

  cardTitle: {
    textAlign: 'center',
    fontSize: 34,
    fontWeight: '800',
    color: '#1F2937',
  },

  cardSubtitle: {
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 32,
    fontSize: 18,
    color: '#6B7280',
  },

  loginButton: {
    height: 74,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  loginIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconText: {
    color: '#FFF',
    fontSize: 20,
  },

  loginText: {
    flex: 1,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 30,
    fontWeight: '700',
  },

  arrow: {
    color: '#FFF',
    fontSize: 34,
    fontWeight: '700',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 45,
    marginBottom: 35,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  dividerText: {
    marginHorizontal: 12,
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },

  signupText: {
    textAlign: 'center',
    color: '#3457D5',
    fontSize: 20,
    fontWeight: '700',
  },

  terms: {
    textAlign: 'center',
    marginTop: 35,
    color: '#9CA3AF',
    fontSize: 14,
    lineHeight: 24,
  },

  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 45,
    alignItems: 'center',
  },

  helpIcon: {
    color: '#6B7280',
    fontSize: 18,
  },

  helpText: {
    marginLeft: 8,
    color: '#4B5563',
    fontSize: 18,
    fontWeight: '500',
  },

  stores: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  storeButton: {
    width: '47%',
    height: 56,
    borderRadius: 12,
    backgroundColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
  },

  storeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
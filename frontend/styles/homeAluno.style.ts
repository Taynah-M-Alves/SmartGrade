import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },

  scrollContent: {
    paddingBottom: 120,
  },

  // HEADER
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 10,
  },

  headerTextContainer: {
    flex: 1,
  },

  hello: {
    fontSize: 18,
    color: '#2D3142',
    fontWeight: '500',
  },

  title: {
    fontSize: 38,
    fontWeight: '700',
    color: '#1F2440',
    marginTop: 8,
  },

  subtitle: {
    fontSize: 16,
    color: '#7C8192',
    marginTop: 10,
    lineHeight: 24,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  // CARD VISÃO GERAL
  overviewCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    padding: 20,
    overflow: 'hidden',
  },

  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  overviewTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },

  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },

  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 14,
    borderRadius: 16,
  },

  statNumber: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFF',
  },

  statLabel: {
    color: '#FFF',
    marginTop: 5,
    fontSize: 14,
  },

  // SECTION
  sectionHeader: {
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2440',
  },

  seeAll: {
    color: '#6D5DF6',
    fontWeight: '600',
    fontSize: 14,
  },

  // CARD ATIVIDADE
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 14,
    padding: 16,
    borderRadius: 18,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,

    elevation: 2,
  },

  activityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EDE9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  activityIconSuccess: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F8ED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  activityInfo: {
    flex: 1,
    marginLeft: 14,
  },

  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2440',
  },

  activitySubject: {
    marginTop: 2,
    color: '#7C8192',
    fontSize: 14,
  },

  deadline: {
    marginTop: 6,
    color: '#FF5F5F',
    fontSize: 13,
    fontWeight: '500',
  },

  completedDate: {
    marginTop: 6,
    color: '#7C8192',
    fontSize: 13,
  },

  // STATUS
  statusPending: {
    backgroundColor: '#FFF3DD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  statusPendingText: {
    color: '#FF8A00',
    fontSize: 12,
    fontWeight: '600',
  },

  statusSuccess: {
    backgroundColor: '#E8F8ED',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  statusSuccessText: {
    color: '#2FA75A',
    fontSize: 12,
    fontWeight: '600',
  },

  // TAB BAR
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    height: 90,
    backgroundColor: '#FFF',

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    borderTopWidth: 1,
    borderTopColor: '#ECECEC',
  },

  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabText: {
    marginTop: 4,
    fontSize: 12,
    color: '#7C8192',
  },

  tabTextActive: {
    marginTop: 4,
    fontSize: 12,
    color: '#6D5DF6',
    fontWeight: '600',
  },

  fabButton: {
    width: 60,
    height: 60,
    borderRadius: 30,

    backgroundColor: '#6D5DF6',

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: -25,

    shadowColor: '#6D5DF6',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,

    elevation: 8,
  },
});
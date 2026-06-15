import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // ── Container ────────────────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  // ── Page Title ────────────────────────────────────────────────────────────
  pageTitleBlock: {
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.4,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },

  // ── Card ──────────────────────────────────────────────────────────────────
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  // ── Progress Steps ────────────────────────────────────────────────────────
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepConnector: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 10,
  },
  stepCircleActive: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleInactive: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberActive: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  stepNumberInactive: {
    color: '#9CA3AF',
    fontSize: 13,
    fontWeight: '600',
  },
  stepLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  stepLabelActive: {
    color: '#111827',
    fontWeight: '700',
  },

  // ── Progress Bar ──────────────────────────────────────────────────────────
  progressBarBg: {
    height: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 5,
    borderRadius: 3,
  },

  // ── Section Title ─────────────────────────────────────────────────────────
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#9333EA',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 14,
  },

  // ── Form Fields ───────────────────────────────────────────────────────────
  fieldBlock: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  required: {
    color: '#EF4444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 11,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#FAFAFA',
  },
  inputMultiline: {
    minHeight: 100,
    paddingTop: 11,
  },
  charCount: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: 4,
  },
  inputIconWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputIconLeft: {
    position: 'absolute',
    left: 13,
    zIndex: 1,
  },
  inputWithIcon: {
    paddingLeft: 38,
  },

  // ── Row fields (Etapa 2) ──────────────────────────────────────────────────
  rowFields: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  fieldPeso: {
    flex: 1,
  },
  fieldDescRubrica: {
    flex: 2,
  },

  // ── Gradient Button ───────────────────────────────────────────────────────
  btnGradient: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  btnGradientText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // ── Back Button ───────────────────────────────────────────────────────────
  btnBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    marginTop: 2,
  },
  btnBackText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },

  // ── Rubrica Card ──────────────────────────────────────────────────────────
  rubricaCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 10,
  },
  rubricaNumCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  rubricaNumText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  rubricaInfo: {
    flex: 1,
  },
  rubricaTitulo: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  rubricaPeso: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  rubricaDescricao: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 3,
    lineHeight: 17,
  },
});

export default styles;
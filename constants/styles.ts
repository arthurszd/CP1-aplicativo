export const colors = {
  primary: '#E02041',
  primaryDark: '#B01833',
  background: '#F0F0F5',
  card: '#FFFFFF',
  text: '#13131A',
  textLight: '#737380',
  success: '#04D361',
  danger: '#E02041',
  warning: '#FFB84D',
  border: '#ECDEDF',
};

export const globalStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 20,
    lineHeight: 24,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: colors.text,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold' as 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
  }
};

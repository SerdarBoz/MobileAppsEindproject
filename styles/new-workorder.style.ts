import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },

  input: {
    marginBottom: 8,
  },

  button: {
    marginTop: 12,
  },

  fieldError: {
    color: 'red',
    fontSize: 12,
    marginBottom: 4,
  },

  errorMessage: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
});
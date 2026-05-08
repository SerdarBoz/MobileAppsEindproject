import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
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
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 4,
  },

  checkboxLabel: {
    fontSize: 14,
    flexShrink: 1,
  },
});
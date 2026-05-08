import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },

  input: {
    marginBottom: 8,
  },

  button: {
    marginTop: 12,
  },

  fieldError: {
    color: "red",
    marginBottom: 4,
    fontSize: 12,
  },

  errorMessage: {
    color: "red",
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "bold",
  },

  successMessage: {
    color: "green",
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "bold",
  },
});
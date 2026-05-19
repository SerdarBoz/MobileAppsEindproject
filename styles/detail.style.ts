import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  saveButton: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 8,
  },
  cancelButton: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 8,
  },
  reopenButton: {
    color: '#1565c0',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  repairText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  textarea: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontSize: 14,
    textAlignVertical: 'top',
    minHeight: 120,
  },
  errorMessage: {
    color: 'red',
    fontSize: 13,
    marginTop: 6,
  },
  editButton: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 8,
  },
});
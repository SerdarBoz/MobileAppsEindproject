import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 16,
    padding: 12,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
  },
  cell: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    fontSize: 13,
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  cellCity: {
    width: 70,
  },
  cellDevice: {
    width: 80,
  },
  cellCode: {
    width: 70,
  },
  cellName: {
    flex: 1,
  },
  cellProcessed: {
    width: 60,
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
});
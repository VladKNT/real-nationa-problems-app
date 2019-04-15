import { StyleSheet } from 'react-native';
import COLORS from '../../../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: COLORS.BACKGROUND
  },
  title: {
    color: COLORS.HIGHLIGHT,
    fontSize: 20,
    marginBottom: 10
  },
  arrowBack: {
    position: "absolute",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    height: 42,
    width: 80,
    top: 20,
    left: 6,
    padding: 10
  },
})
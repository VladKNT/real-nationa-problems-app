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
  questionText: {
    color: COLORS.HIGHLIGHT,
    fontSize: 16,
    alignSelf: 'center'
  },
  title: {
    color: COLORS.HIGHLIGHT,
    fontSize: 20,
    marginBottom: 10
  }
})
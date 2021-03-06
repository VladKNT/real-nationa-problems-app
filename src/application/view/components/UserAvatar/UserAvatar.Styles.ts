import { StyleSheet } from 'react-native';
import COLORS from '../../../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: COLORS.BACKGROUND
  },
  image: {
    borderWidth: 2,
    borderColor: COLORS.HIGHLIGHT
  }
})
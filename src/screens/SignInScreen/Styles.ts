import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: COLORS.PRIMARY_BACKGROUND
  },
  questionText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    alignSelf: 'center'
  },
  title: {
    color: COLORS.PRIMARY,
    fontSize: 20,
    marginBottom: 10
  }
})
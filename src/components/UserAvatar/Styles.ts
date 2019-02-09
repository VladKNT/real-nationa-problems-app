import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: COLORS.PRIMARY_BACKGROUND
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY
  }
})
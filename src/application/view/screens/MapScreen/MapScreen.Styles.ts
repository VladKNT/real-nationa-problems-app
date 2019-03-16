import { StyleSheet } from 'react-native';
import COLORS from '../../../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.BACKGROUND
  },

  headerRight: {
    marginRight: 20,
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden'
  },
});

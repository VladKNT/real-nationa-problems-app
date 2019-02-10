import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.BACKGROUND
  },

  headerLeft: {
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.BLACK
  },

  headerRight: {
    marginRight: 20,
  },

  wallPosterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
  },

  personalInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  fullName: {
    marginTop: 5,
    fontSize: 18,
    color: COLORS.HIGHLIGHT
  }
})
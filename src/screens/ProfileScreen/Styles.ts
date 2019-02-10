import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.PRIMARY_BACKGROUND
  },

  headerLeft: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.BLACK
  },

  headerRight: {
    marginRight: 10,
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
    color: COLORS.PRIMARY
  }
})
import { StyleSheet, Dimensions } from 'react-native';
import COLORS from '../../../../constants/colors';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.BACKGROUND,
    paddingVertical: 10
  },

  dateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },

  dateText: {
    color: COLORS.TITLE
  },

  headerSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,
    paddingHorizontal: 10
  },

  avatarTextContainer: {
    paddingLeft: 5,
    flexDirection: 'column',
    justifyContent: 'center'
  },

  eventName: {
    color: COLORS.TEXT,
    fontSize: 18,
    fontWeight: 'bold'
  },

  username: {
    color: COLORS.TITLE
  },

  image: {
    width: '100%',
    height: height * 0.4
  },

  descriptionSection: {
    paddingHorizontal: 10
  },

  description: {
    color: COLORS.TEXT,
    fontSize: 16,
    marginTop: 10
  }
})
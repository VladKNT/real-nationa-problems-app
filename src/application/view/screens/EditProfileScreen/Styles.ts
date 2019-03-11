import { StyleSheet } from 'react-native';
import COLORS from '../../../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: COLORS.BACKGROUND
  },

  avatarContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 20
  },

  changePhotoBtn: {
    marginTop: 5
  },

  changePhotoBtnText: {
    fontSize: 18,
    color: COLORS.HIGHLIGHTED_TEXT
  },

  headerRight: {
    marginRight: 20
  },

  logout: {
    marginTop: 20
  },

  logoutText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

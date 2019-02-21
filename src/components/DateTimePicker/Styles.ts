import { StyleSheet, PixelRatio } from 'react-native';
import COLORS from '../../constants/colors';

export default StyleSheet.create({
  container: {
    zIndex: 1,
    borderTopWidth: 1 / PixelRatio.get(),
    borderColor: 'rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 0,
    backgroundColor: 'white'
  },

  headerContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
    marginTop: 10
  },

  pickerContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },

  title: {
    color: COLORS.TEXT,
    fontWeight: 'bold',
    fontSize: 15
  },

  button: {
    width: 60,
    backgroundColor: COLORS.HIGHLIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 2
  },

  buttonText: {
    color: COLORS.WHITE
  }
})
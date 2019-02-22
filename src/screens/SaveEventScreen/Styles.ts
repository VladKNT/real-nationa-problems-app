import {Dimensions, StyleSheet} from 'react-native';
import COLORS from '../../constants/colors';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.BACKGROUND
  },

  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    height: height * 0.3
  },

  image: {
    width: '100%',
    height: '100%'
  },

  addPhotoContainer:  {
    alignItems: 'center'
  },

  addPhotoText: {
    color: COLORS.TEXT,
    fontSize: 16
  },

  fieldsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 10
  },

  addPlaceContainer: {
    marginVertical: 10
  },

  addPlaceText: {
    color: COLORS.TEXT,
    fontSize: 18
  },

  datePickerOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  }
})
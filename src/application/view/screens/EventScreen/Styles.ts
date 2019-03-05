import {Dimensions, StyleSheet} from "react-native";
import COLORS from "../../../../constants/colors";
import colors from "../../../../constants/colors";

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.BACKGROUND
  },

  headerRight: {
    marginRight: 20
  },

  participantsContainer: {
    paddingVertical: 10
  },

  participantAvatar: {
    marginHorizontal: 10
  },

  imageContainer: {
    // marginTop: 10
  },

  image: {
    width: "100%",
    height: height * 0.4
},

  infoContainer: {
    padding: 10
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.TEXT,
    marginBottom: 10
  },

  infoText: {
    fontSize: 18,
    color: COLORS.TEXT
  },

  mapButton: {
    marginTop: 10
  }
});

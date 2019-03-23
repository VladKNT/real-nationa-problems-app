import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../../../constants/colors";


const { height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  listContainer: {
    paddingHorizontal: 10,
    height: height * 0.75
  },

  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  input: {
    borderColor: COLORS.BORDER,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 10,
    width: "100%"
  }
})

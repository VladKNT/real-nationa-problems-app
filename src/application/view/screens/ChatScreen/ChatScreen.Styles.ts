import { StyleSheet } from "react-native";
import COLORS from "../../../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  listContainer: {
    flex: 1,
    paddingHorizontal: 10
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  inputBody: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: COLORS.BORDER,
    borderRadius: 30,
    borderWidth: 1,
    paddingHorizontal: 20,
  },

  input: {
    flex: 1,
    fontSize: 16
  },

  buttonText: {
    fontWeight: "bold"
  }
})

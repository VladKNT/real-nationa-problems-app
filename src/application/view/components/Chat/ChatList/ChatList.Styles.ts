import { StyleSheet } from "react-native";
import COLORS from "../../../../../constants/colors";

export default StyleSheet.create({
  messageContainer: {
    flex: 1,
    flexDirection: "column"
  },

  dateContainer: {
    alignSelf: "center",
    alignItems: "center"
  },

  messageBody: {
    alignSelf: "flex-start",
    borderColor: COLORS.BORDER,
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    padding: 5
  },

  userMessageBody: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.BORDER
  },

  messageText: {
    color: COLORS.TEXT
  },

  timeText: {
    fontSize: 12
  }
})

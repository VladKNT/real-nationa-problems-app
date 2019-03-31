import { StyleSheet } from "react-native";
import COLORS from "../../../../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: COLORS.BORDER
  },

  infoContainer: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 10
  },

  firstRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },

  username: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "bold",
    color: COLORS.TEXT
  },

  date: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.TITLE
  },

  message: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "bold",
    color: COLORS.TITLE
  },

  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.HIGHLIGHT,
  },

  badgeText: {
    color: COLORS.WHITE
  }
});

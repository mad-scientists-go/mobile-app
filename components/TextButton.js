import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { purple, white, blue } from "../utils/colors";

export default function TextButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  reset: {
    textAlign: "center",
    color: white,
    padding: 10,
    fontSize: 20,
    backgroundColor: blue
  },
  button: {
    alignSelf: "stretch",
    backgroundColor: white,
    padding: 20,
    alignItems: "center",
    marginBottom: 50
  }
});

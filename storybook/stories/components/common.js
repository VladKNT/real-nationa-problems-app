import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { Button, HighlightButton, Input } from "../../../src/application/view/components/common";

storiesOf("Common components", module)
  .add("Button", () => (
    <View style={{ padding: 10 }}>
      <Button>
        Button
      </Button>
    </View>
  ))
  .add("HighlightButton", () => (
    <View style={{ padding: 10 }}>
       <HighlightButton>
         Highlight Button
       </HighlightButton>
    </View>
  ))
  .add("Input", () => (
    <View style={{ padding: 10 }}>
      <Input title={"Title"} />
    </View>
  ));

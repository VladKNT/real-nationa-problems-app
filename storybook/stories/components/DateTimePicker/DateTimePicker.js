import React from "react";
import moment from "moment";
import { storiesOf } from "@storybook/react-native";
import { action } from '@storybook/addon-actions';
import DateTimePicker from "../../../../src/application/view/components/DateTimePicker/DateTimePicker.Component";
import STRINGS from "../../../../src/constants/strings";

storiesOf("Date Time Picker", module)
  .add("DateTimePicker", () => (
    <DateTimePicker
      title={STRINGS.DATE_START}
      date={moment()}
      minimumDate={moment()}
      maximumDate={moment().add(1, "days")}
      onBack={() => {}}
      onNext={(date) => {}}
    />
  ));
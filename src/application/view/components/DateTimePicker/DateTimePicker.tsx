import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import STRINGS from '../../../../constants/strings';
import COLORS from '../../../../constants/colors';

import styles from './Styles';

interface Props {
  style?: any,
  date: moment.Moment,
  minimumDate: moment.Moment,
  maximumDate: moment.Moment,
  onBack: () => void,
  onNext: (date: moment.Moment) => void,
  title: string
}

interface State {
  date: moment.Moment
}

export default class DateTimePicker extends Component <Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      date: props.date,
    }
  }

  render() {
    const { date } = this.state;
    const { minimumDate, maximumDate, onBack, onNext, title } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onBack}>
            <Icon name={'md-close-circle-outline'} size={30} color={COLORS.HIGHLIGHT}/>
          </TouchableOpacity>

          <Text style={styles.title}>{title}</Text>

          <TouchableOpacity
            onPress={() => onNext(date)}
            style={styles.button}>
            <Text style={styles.buttonText}>{title == STRINGS.DATE_START ? STRINGS.NEXT : STRINGS.DONE}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pickerContainer}>
          <View style={{ flex: 1 }}>
            <DatePicker
              date={date}
              minuteInterval={5}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              mode="datetime"
              onDateChange={(date: moment.Moment) => {
                this.setState({ date })
              }}
            />
          </View>
        </View>
      </View>
    )
  }
}

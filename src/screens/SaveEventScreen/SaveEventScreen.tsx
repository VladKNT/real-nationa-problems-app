import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import _ from 'lodash';
import moment from 'moment';
import styles from './Styles';
import { Input, Button } from '../../components/common';
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';
import STRINGS from '../../constants/strings';
import { ISaveEventParameters } from '../../constants/types';

interface Props {
  style?: any
}

interface State {
  eventInfo: ISaveEventParameters,
  startDatePickerVisible: boolean,
  endDatePickerVisible: boolean
}


export default class SaveEventScreen extends Component <Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      eventInfo: {
        id: '',
        name: '',
        description: '',
        photo: 'https://i.photographers.ua/thumbnails/pictures/42779/800xdsc_1087_1200.jpg',
        dateStart: null,
        dateEnd: null
      },
      startDatePickerVisible: false,
      endDatePickerVisible: false
    }
  }

  onInputChange = (name: string, data: any) => {
    let eventInfo = this.state.eventInfo;
    _.set(eventInfo, name, data);

    this.setState({ eventInfo });
  };

  onOpenDatePicker = () => {
    this.setState({ startDatePickerVisible: true });
  };

  renderDatePickerOverlay = () => {
    const { startDatePickerVisible, endDatePickerVisible } = this.state;

    if (startDatePickerVisible || endDatePickerVisible) {
      return (
        <TouchableOpacity
          onPress={() => this.setState({
            startDatePickerVisible: false,
            endDatePickerVisible: false,
          })}
          activeOpacity={1}
          style={styles.datePickerOverlay}
        />
      )
    }

    return null;
  };

  showStartDatePicker = (value: boolean) => {
    this.setState({ startDatePickerVisible: value });
  };

  showEndDatePicker = (value: boolean) => {
    this.setState({ endDatePickerVisible: value });
  };

  renderDateStartPicker = () => {
    const { startDatePickerVisible } = this.state;

    if (startDatePickerVisible) {
      const { dateStart } = this.state.eventInfo;
      const date = dateStart || moment();

      return (
        <DateTimePicker
          title={STRINGS.DATE_START}
          date={date}
          minimumDate={moment(date)}
          maximumDate={moment(date).add(7, 'days')}
          onBack={() => {
            this.showStartDatePicker(false);
          }}
          onNext={(date: moment.Moment) => {
            this.onInputChange('dateStart', moment(date));
            this.showStartDatePicker(false);
            this.showEndDatePicker(true);
          }}
        />
      )
    }

    return null;
  };

  renderDateEndPicker = () => {
    const { endDatePickerVisible } = this.state;

    if (endDatePickerVisible) {
      const { dateStart, dateEnd } = this.state.eventInfo;
      let date = moment(dateStart).add(30, 'minutes');

      if (dateEnd && dateStart < dateEnd) {
        date = dateEnd;
      }

      return (
        <DateTimePicker
          title={STRINGS.DATE_END}
          date={date}
          minimumDate={moment(date)}
          maximumDate={moment(date).add(1, 'days')}
          onBack={() => {
            this.showEndDatePicker(false)
          }}
          onNext={(date) => {
            this.onInputChange('dateEnd', new Date(date));
            this.showEndDatePicker(false);
          }}
        />
      )
    }

    return null;
  };

  render() {
    const { name, description, photo } = this.state.eventInfo;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image source={{ uri: photo }} style={styles.image}/>
        </TouchableOpacity>

        <View style={styles.fieldsContainer}>
          <Input title={STRINGS.EVENT_NAME}
                 value={name}
                 onChangeText={(data: string) => this.onInputChange('name', data)}/>
          <Input title={STRINGS.DESCRIPTION}
                 value={description}
                 onChangeText={(data: string) => this.onInputChange('description', data)} />
          <Button onPress={this.onOpenDatePicker}>
            Select Date/Time
          </Button>
        </View>

        {this.renderDatePickerOverlay()}
        {this.renderDateStartPicker()}
        {this.renderDateEndPicker()}

      </View>
    )
  }
}
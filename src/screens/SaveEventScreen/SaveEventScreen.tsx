import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';

import _ from 'lodash';
import moment from 'moment';
import { Input, Button } from '../../components/common';
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';
import STRINGS from '../../constants/strings';
import COLORS from '../../constants/colors';
import { ISaveEventParameters } from '../../constants/types';
import styles from './Styles';

interface Props {
  style?: any,
  navigation: any
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
        photo: '',
        dateStart: null,
        dateEnd: null
      },
      startDatePickerVisible: false,
      endDatePickerVisible: false
    };
  }

  onAddPlacePressed = () => {
    const { navigate } = this.props.navigation;
    navigate("MapScreen");
  };

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


  onImagePicker = () => {
    ImagePicker.openPicker({}).then((image: any) => {
      this.onInputChange('photo', image.path);
    }).catch((error) => {
      if (error) {
        console.log('ImagePicker Error: ', error.toString())
      }
    })
  };

  onPhotoPicker = () => {
    ImagePicker.openCamera({}).then((image: any) => {
      this.onInputChange('photo', image.path);
    }).catch((error) => {
      if (error) {
        console.log('ImagePicker Error: ', error.toString())
      }
    })
  };

  ACTION_SHEET_OPTIONS = [
    'Photo Library',
    'Camera',
  ];

  handleActionSheetPress(index: number) {
    switch (index) {
      case 0:
        this.onImagePicker();
        break;

      case 1:
        this.onPhotoPicker();
        break;
    }
  }

  renderActionSheet() {
    return (
      <ActionSheet
        ref={(ref) => this.ActionSheet = ref}
        options={[...this.ACTION_SHEET_OPTIONS, 'Cancel']}
        cancelButtonIndex={this.ACTION_SHEET_OPTIONS.length}
        onPress={(index: number) => this.handleActionSheetPress(index)}
      />
    );
  }

  onImagePressed = () => {
    this.ActionSheet.show();
  };


  renderImage = () => {
    const { photo } = this.state.eventInfo;

    if (photo) {
      return  <Image source={{ uri: photo }} style={styles.image}/>
    }

    return (
      <View style={styles.addPhotoContainer}>
        <Icon name={'ios-camera'} size={40} color={COLORS.TEXT} />
        <Text style={styles.addPhotoText}>
          {STRINGS.ADD_PHOTO}
        </Text>
      </View>
    )
  };

  render() {
    const { name, description, photo } = this.state.eventInfo;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onImagePressed} style={styles.imageContainer}>
          {this.renderImage()}
        </TouchableOpacity>

        <View style={styles.fieldsContainer}>
          <Input title={STRINGS.EVENT_NAME}
                 value={name}
                 onChangeText={(data: string) => this.onInputChange('name', data)}/>
          <Input title={STRINGS.DESCRIPTION}
                 value={description}
                 onChangeText={(data: string) => this.onInputChange('description', data)} />
          <TouchableOpacity onPress={this.onAddPlacePressed} style={styles.addPlaceContainer}>
            <Text style={styles.addPlaceText}>
              <Icon name={'md-map'} size={25} color={COLORS.TEXT} /> {STRINGS.ADD_PLACE}
            </Text>
          </TouchableOpacity>

          <Button onPress={this.onOpenDatePicker}>
            Select Date/Time
          </Button>
        </View>

        {this.renderDatePickerOverlay()}
        {this.renderDateStartPicker()}
        {this.renderDateEndPicker()}
        {this.renderActionSheet()}
      </View>
    )
  }
}
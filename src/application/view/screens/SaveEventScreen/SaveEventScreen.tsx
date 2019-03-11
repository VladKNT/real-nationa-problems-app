import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ReactNativeFileOptions } from "extract-files";
import _ from "lodash";
import moment from "moment";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IReducerStates } from "../../../data/store/rootReducer";
import { setSaveEventData, createEvent } from "../../../data/store/event/eventActions";


import {Input, HiglightButton} from "../../components/common";
import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import ImagePhotoPicker from "../../components/ImagePhotoPicker/ImagePhotoPicker";
import STRINGS from "../../../../constants/strings";
import COLORS from "../../../../constants/colors";
import { ISaveEvent, ISaveEventParams } from "../../../../constants/types/event";
import styles from "./Styles";

interface IProps {
  navigation: any;
  saveEvent: ISaveEvent;
  createEvent(): void;
  setSaveEventDate(saveEvent: ISaveEventParams): void;
}

interface IState {
  eventInfo: ISaveEvent;
  startDatePickerVisible: boolean;
  endDatePickerVisible: boolean;
}

class SaveEventScreen extends Component <IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const { id, name, description, photo, dateStart, dateEnd, imageFile, latitude, longitude } = props.saveEvent;

    this.state = {
      eventInfo: {
        id,
        name,
        description,
        photo,
        dateStart,
        dateEnd,
        imageFile,
        latitude,
        longitude
      },
      startDatePickerVisible: false,
      endDatePickerVisible: false
    };
  };

  static getDerivedStateFromProps(props: IProps) {
    const { id, name, description, photo, dateStart, dateEnd, imageFile, latitude, longitude  } = props.saveEvent;

    return {
      eventInfo: {
        id,
        name,
        description,
        photo,
        dateStart,
        dateEnd,
        imageFile,
        latitude,
        longitude
      },
    }
  }

  onSavePressed = () => {
    const { setSaveEventDate, createEvent } = this.props;

    setSaveEventDate(this.state.eventInfo);
    createEvent();
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      onSavePressed: this.onSavePressed
    });
  };

  static navigationOptions = ({ navigation }: any) => ({
    headerRight: (
      <TouchableOpacity style={styles.headerRight} onPress={navigation.getParam("onSavePressed")}>
        <Icon name={"md-checkmark"} size={25} color={COLORS.HIGHLIGHT}/>
      </TouchableOpacity>
    )
  });

  onAddPlacePressed = () => {
    const { navigation, setSaveEventDate } = this.props;
    setSaveEventDate(this.state.eventInfo);

    navigation.navigate("MapScreen", { showMode: false });
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
          date={moment(date)}
          minimumDate={moment(date)}
          maximumDate={moment(date).add(7, "days")}
          onBack={() => {
            this.showStartDatePicker(false);
          }}
          onNext={(date: moment.Moment) => {
            this.onInputChange("dateStart", moment(date));
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
      let minimumDate = moment(dateStart).add(30, "minutes");
      let date = minimumDate;

      if (dateEnd && dateStart < dateEnd) {
        date = moment(dateEnd);
      }

      return (
        <DateTimePicker
          title={STRINGS.DATE_END}
          date={date}
          minimumDate={minimumDate}
          maximumDate={moment(date).add(1, "days")}
          onBack={() => {
            this.showEndDatePicker(false)
          }}
          onNext={(date) => {
            this.onInputChange("dateEnd", moment(date));
            this.showEndDatePicker(false);
          }}
        />
      )
    }

    return null;
  };

  onImagePicked = (uri: string, imageFile: ReactNativeFileOptions) => {
    this.onInputChange("photo", uri);
    this.onInputChange("imageFile", imageFile);
  };

  renderImage = () => {
    const { photo } = this.state.eventInfo;

    if (photo) {
      return  <Image source={{ uri: photo }} style={styles.image}/>
    }

    return (
      <View style={styles.addPhotoContainer}>
        <Icon name={"ios-camera"} size={40} color={COLORS.TEXT} />
        <Text style={styles.addPhotoText}>
          {STRINGS.ADD_PHOTO}
        </Text>
      </View>
    )
  };

  mapIcon = () => {
    const { latitude, longitude } = this.state.eventInfo;

    if (latitude && longitude) {
      return "md-checkmark";
    }

    return "md-pin";
  };

  renderDateTimeText = () => {
    const { dateStart, dateEnd } = this.state.eventInfo;

    if (dateStart && dateStart) {
      return `${moment(dateStart).format("MMMM Do, LT")} - ${moment(dateEnd).format("MMMM Do, LT")}`
    }

    return STRINGS.SELECT_DATE_TIME;
  };

  render() {
    const { name, description } = this.state.eventInfo;

    return (
      <View style={styles.container}>
        <ImagePhotoPicker  onPick={this.onImagePicked} style={styles.imageContainer}>
          {this.renderImage()}
        </ImagePhotoPicker>

        <View style={styles.fieldsContainer}>
          <Input title={STRINGS.EVENT_NAME}
                 value={name}
                 onChangeText={(data: string) => this.onInputChange("name", data)}/>
          <Input title={STRINGS.DESCRIPTION}
                 value={description}
                 onChangeText={(data: string) => this.onInputChange("description", data)} />

          <HiglightButton onPress={this.onAddPlacePressed} style={styles.addPlaceContainer}>
            <Icon name={this.mapIcon()} size={25} color={COLORS.HIGHLIGHT} /> {STRINGS.ADD_PLACE}
          </HiglightButton>



          <HiglightButton onPress={this.onOpenDatePicker}>
            {this.renderDateTimeText()}
          </HiglightButton>
        </View>

        {this.renderDatePickerOverlay()}
        {this.renderDateStartPicker()}
        {this.renderDateEndPicker()}
      </View>
    )
  }
}

const mapStateToProps = (state: IReducerStates) => {
  return {
    saveEvent: state.eventReducer.saveEvent
  };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setSaveEventDate: (saveEvent: ISaveEventParams) => dispatch(setSaveEventData(saveEvent)),
    createEvent: () => dispatch(createEvent())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveEventScreen);

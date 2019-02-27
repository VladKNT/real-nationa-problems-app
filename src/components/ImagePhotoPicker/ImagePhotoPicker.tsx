import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';

interface Props {
  onPick: (uri: string) => void,
  children: any,
  style?: any
}

export default class ImagePhotoPicker extends Component <Props> {
  onImagePicker = () => {
    ImagePicker.openPicker({}).then((image: any) => {
      this.props.onPick(image.path);
    }).catch((error) => {
      if (error) {
        console.log('ImagePicker Error: ', error.toString())
      }
    })
  };

  onPhotoPicker = () => {
    ImagePicker.openCamera({}).then((image: any) => {
      this.props.onPick(image.path);
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

  onImagePressed = () => {
    this.ActionSheet.show();
  };

  render() {
    return (
      <TouchableOpacity onPress={this.onImagePressed} style={this.props.style}>
        { this.props.children }
        <ActionSheet
          ref={(ref) => this.ActionSheet = ref}
          options={[...this.ACTION_SHEET_OPTIONS, 'Cancel']}
          cancelButtonIndex={this.ACTION_SHEET_OPTIONS.length}
          onPress={(index: number) => this.handleActionSheetPress(index)}
        />
      </TouchableOpacity>
    );
  }
}
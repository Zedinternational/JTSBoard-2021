import {Alert, Platform} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import {request, openSettings, PERMISSIONS, RESULTS} from "react-native-permissions";

const imagePickerConfig = {
    cropping: true,
    compressImageQuality: 0.8,
    enableRotationGesture: true,
    avoidEmptySpaceAroundImage: false,
    cropperChooseText: 'Choose',
    cropperCancelText: 'Cancel',
    mediaType: 'photo',
    includeBase64: true
};

const fetchCameraPermission = () => {
    return new Promise((resolve, reject) => {
        request(Platform.select({
            ios: PERMISSIONS.IOS.CAMERA,
            android: PERMISSIONS.ANDROID.CAMERA
        }))
            .then((result) => {
                console.log('permission', result);
                if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) resolve(true);
                else resolve(false);
            })
            .catch((error) => {
                resolve(false);
            })
    })
}

const fetchPhotosPermission = () => {
    return new Promise((resolve, reject) => {
        request(Platform.select({
            ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
            android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        }))
            .then((result) => {
                console.log('permission', result);
                if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) resolve(true);
                else resolve(false);
            })
            .catch((error) => {
                resolve(false);
            })
    })
}

export const checkCameraPermission = async () => {
    if(!await fetchCameraPermission()){
        Alert.alert(
            'Visit settings and allow camera permission',
            '',
            [
                {
                    text: "OK", onPress: () => {
                        openSettings();
                    }
                },
                {
                    text: "CANCEL", onPress: () => {
                    }
                }
            ]);
        return false;
    }
    return true;
}

export const checkPhotosPermission = async () => {
    if(!await fetchPhotosPermission()){
        Alert.alert(
            'Visit settings and allow photos permission',
            '',
            [
                {
                    text: "OK", onPress: () => {
                        openSettings();
                    }
                },
                {
                    text: "CANCEL", onPress: () => {
                    }
                }
            ]);
        return false;
    }
    return true;
}

export const takePhoto = async (callback) => {
    if(await checkCameraPermission()){
        ImagePicker.openCamera(imagePickerConfig).then(image => {
            if(callback){
                callback(image);
            }
        });
    }
}

export const chooseFromLibrary = async (callback) => {
    if(await checkPhotosPermission()) {
        ImagePicker.openPicker(imagePickerConfig).then(image => {
            if(callback){
                callback(image);
            }
        });
    }
}

export const uploadImageAction = (takePhotoCallback, chooseFromLibraryCallback) => {
    Alert.alert(
        '',
        'Upload Photo',
        [
            {
                text: "CANCEL", onPress: () => {
                }
            },
            {
                text: "TAKE A PHOTO", onPress: () => {
                    this.takePhoto(takePhotoCallback);
                }
            },
            {
                text: "FROM GALLERY", onPress: () => {
                    this.chooseFromLibrary(chooseFromLibraryCallback);
                }
            },
        ]);
}

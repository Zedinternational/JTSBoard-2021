import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";

import {withTheme} from "../../theme";
import TextInput from '../../containers/TextInput';
import KeyboardView from "../../containers/KeyboardView";
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import styles from "./styles";
import Button from "../../containers/Button";
import ImagePicker from "react-native-image-crop-picker";
import images from "../../assets/images";
import scrollPersistTaps from "../../utils/scrollPersistTaps";
import SafeAreaView from "../../containers/SafeAreaView";
import {showErrorAlert, showToast} from "../../lib/info";
import firebaseSdk, {DB_ACTION_UPDATE} from "../../lib/firebaseSdk";
import {setUser as setUserAction} from "../../actions/login";
import {GradientHeader} from "../../containers/GradientHeader";

class CustomerFormView extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        title: 'JSTBoard',
        headerBackground: () => <GradientHeader/>,
    })

    static propTypes = {
        navigation: PropTypes.object,
        user: PropTypes.object,
        setUser: PropTypes.func,
        theme: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            image_path: null,
            first_name: '',
            last_name: '',
            interests: '',
            location: '',
            age: '',
            bio: '',
            isLoading: false,
        }
    }

    isValid = () => {
        const {first_name, last_name, interests, location, age, bio} = this.state;
        if(!first_name.length){
            showToast('Please enter your first name.');
            this.emailInput.focus();
            return false;
        }
        if(!last_name.length){
            showToast('Please enter your last name.');
            this.lastInput.focus();
            return false;
        }
        if(!interests.length){
            showToast('Please enter your interests.');
            this.interestsInput.focus();
            return false;
        }
        if(!location.length){
            showToast('Please enter your location.');
            this.locationInput.focus();
            return false;
        }
        if(!age){
            showToast('Please enter your age.');
            this.ageInput.focus();
            return false;
        }
        if(!bio.length){
            showToast('Please enter your bio.');
            this.bioInput.focus();
            return false;
        }
        return true;
    }

    onSubmit = () => {
        if(this.isValid()){
            const {image_path} = this.state;
            this.setState({isLoading: true});
            if(image_path){
                firebaseSdk.uploadMedia(firebaseSdk.STORAGE_TYPE_AVATAR, image_path).then(image_url => {
                    this.saveUser(image_url);
                }).catch((err) => {
                    showErrorAlert(err, 'Error');
                    this.setState({isLoading: false});
                })
            } else {
                this.saveUser();
            }
        }
    }

    saveUser = (image_url = null) => {
        const {user, navigation, setUser} = this.props;
        const {first_name, last_name, interests, location, age, bio} = this.state;

        let userInfo = {
            id: user.id,
            firstName: first_name,
            lastName: last_name,
            interests: interests,
            address: location,
            age: Number(age),
            bio: bio
        }

        if(image_url){
            userInfo = {...userInfo, avatar: image_url};
        }

        firebaseSdk.setData(firebaseSdk.TBL_users, DB_ACTION_UPDATE, userInfo)
            .then(() => {
                showToast('Success');
                this.setState({isLoading: false});
                const updateUser = {...user, ...userInfo};
                setUser(updateUser);
                navigation.pop();
            })
            .catch(err => {
                showToast(err.message);
                this.setState({isLoading: false});
            })
    }

    render(){
        const {theme} = this.props;
        const { first_name, last_name, interests, location, age, bio, isLoading} = this.state;
        return (
            <KeyboardView
                style={{ backgroundColor: themes[theme].backgroundColor}}
                contentContainerStyle={sharedStyles.container}
                keyboardVerticalOffset={128}
            >
                <StatusBar/>
                <ScrollView contentContainerStyle={{flexGrow: 1}} {...scrollPersistTaps}>
                    <SafeAreaView>
                        <View style={styles.formContainer}>
                            <View style={styles.formRow}>
                                <TextInput
                                    inputRef={(e) => {
                                        this.firstNameInput = e;
                                    }}
                                    containerStyle={styles.inputContainer}
                                    value={first_name}
                                    label={'Name'}
                                    placeholder={'First Name'}
                                    returnKeyType='next'
                                    keyboardType='twitter'
                                    onChangeText={value => this.setState({first_name: value})}
                                    onSubmitEditing={() => {
                                        this.lastInput.focus();
                                    }}
                                    theme={theme}
                                />
                                <TextInput
                                    inputRef={(e) => {
                                        this.lastInput = e;
                                    }}
                                    containerStyle={styles.inputContainer}
                                    value={last_name}
                                    placeholder={'Last Name'}
                                    returnKeyType='next'
                                    keyboardType='twitter'
                                    onChangeText={value => this.setState({last_name: value})}
                                    onSubmitEditing={() => {
                                        this.ganaFirstNameInput.focus();
                                    }}
                                    theme={theme}
                                />
                            </View>
                            <View style={styles.formRow}>
                                <TextInput
                                    inputRef={(e) => {
                                        this.ganaFirstNameInput = e;
                                    }}
                                    value={first_name}
                                    label={'Gana Name'}
                                    placeholder={'Gana First Name'}
                                    returnKeyType='next'
                                    keyboardType='twitter'
                                    onChangeText={value => this.setState({first_name: value})}
                                    onSubmitEditing={() => {
                                        this.ganaLastInput.focus();
                                    }}
                                    theme={theme}
                                />
                                <TextInput
                                    inputRef={(e) => {
                                        this.ganaLastInput = e;
                                    }}
                                    value={last_name}
                                    placeholder={'Gana Last Name'}
                                    returnKeyType='next'
                                    keyboardType='twitter'
                                    onChangeText={value => this.setState({last_name: value})}
                                    onSubmitEditing={() => {
                                        // this.interestsInput.focus();
                                    }}
                                    theme={theme}
                                />
                            </View>
                            {/*<TextInput*/}
                            {/*    inputRef={(e) => {*/}
                            {/*        this.interestsInput = e;*/}
                            {/*    }}*/}
                            {/*    value={interests}*/}
                            {/*    placeholder={'Interests'}*/}
                            {/*    returnKeyType='next'*/}
                            {/*    keyboardType='twitter'*/}
                            {/*    onChangeText={interests => this.setState({interests})}*/}
                            {/*    onSubmitEditing={() => {*/}
                            {/*        this.locationInput.focus();*/}
                            {/*    }}*/}
                            {/*    theme={theme}*/}
                            {/*/>*/}
                            {/*<TextInput*/}
                            {/*    inputRef={(e) => {*/}
                            {/*        this.locationInput = e;*/}
                            {/*    }}*/}
                            {/*    value={location}*/}
                            {/*    placeholder={'Location'}*/}
                            {/*    returnKeyType='next'*/}
                            {/*    keyboardType='twitter'*/}
                            {/*    onChangeText={location => this.setState({location})}*/}
                            {/*    onSubmitEditing={() => {*/}
                            {/*        this.ageInput.focus();*/}
                            {/*    }}*/}
                            {/*    theme={theme}*/}
                            {/*/>*/}
                            {/*<TextInput*/}
                            {/*    inputRef={(e) => {*/}
                            {/*        this.ageInput = e;*/}
                            {/*    }}*/}
                            {/*    value={age}*/}
                            {/*    placeholder={'Age'}*/}
                            {/*    returnKeyType='next'*/}
                            {/*    keyboardType='numeric'*/}
                            {/*    onChangeText={age => this.setState({age: age.replace(/\D/gm, '')})}*/}
                            {/*    onSubmitEditing={() => {*/}
                            {/*        this.bioInput.focus();*/}
                            {/*    }}*/}
                            {/*    theme={theme}*/}
                            {/*/>*/}
                            {/*<TextInput*/}
                            {/*    inputRef={(e) => {*/}
                            {/*        this.bioInput = e;*/}
                            {/*    }}*/}
                            {/*    value={bio}*/}
                            {/*    placeholder={'Bio'}*/}
                            {/*    returnKeyType='send'*/}
                            {/*    keyboardType='twitter'*/}
                            {/*    onChangeText={bio => this.setState({bio})}*/}
                            {/*    theme={theme}*/}
                            {/*/>*/}
                            <Button
                                style={styles.submitBtn}
                                title={'Save'}
                                type='primary'
                                size='W'
                                onPress={this.onSubmit}
                                testID='login-view-submit'
                                loading={isLoading}
                                theme={theme}
                            />
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </KeyboardView>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})

const mapDispatchToProps = dispatch =>({
    setUser: params => dispatch(setUserAction(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(CustomerFormView));

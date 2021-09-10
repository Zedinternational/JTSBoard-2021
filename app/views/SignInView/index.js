import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import prompt from 'react-native-prompt-android';

import {withTheme} from "../../theme";
import KeyboardView from "../../containers/KeyboardView";
import StatusBar from "../../containers/StatusBar";
import sharedStyles from "../Styles";
import styles from "./styles";
import {themes} from "../../constants/colors";
import images from "../../assets/images";
import Button from "../../containers/Button";
import TextInput from "../../containers/TextInput";
import {loginSuccess as loginSuccessAction} from "../../actions/login";
import scrollPersistTaps from "../../utils/scrollPersistTaps";
import SafeAreaView from "../../containers/SafeAreaView";
import {showErrorAlert, showToast} from "../../lib/info";
import {isValidEmail} from "../../utils/validators";
import I18n from '../../i18n';
import firebaseSdk from "../../lib/firebaseSdk";
import AsyncStorage from "@react-native-community/async-storage";
import {CURRENT_USER} from "../../constants/keys";
import {appStart as appStartAction} from "../../actions/app";
import {GradientHeader} from "../../containers/GradientHeader";

class SingInView extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerBackground: () => <GradientHeader/>,
        title: I18n.t('Login')
    })

    static propTypes = {
        navigation: PropTypes.object,
        appStart: PropTypes.func,
        loginSuccess: PropTypes.func,
        theme: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email: '',
            password: ''
        }
    }

    onGoToSignUp = () => {
        const {navigation} = this.props;
        navigation.navigate('SignUpView');
    }

    forgotPassword = () => {
        prompt(
            'JTSBoard',
            I18n.t('Forgot_Password'),
            [
                {text: I18n.t('Cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: I18n.t('Send'), onPress: email => console.log('OK Pressed, password: ' + email)},
            ],
            {
                type: 'email-address',
                cancelable: false,
                placeholder: I18n.t('Email')
            }
        );
    }

    isValid = () => {
        const {email, password} = this.state;
        if(!email.length){
            showToast('メールアドレスは空白にすることはできません');
            return false;
        }
        if(!isValidEmail(email)){
            showToast('メールアドレスが有効でない');
            return false;
        }
        if(!password.length){
            showToast('パスワードは空白にできません');
            return false;
        }
        return true;
    }

    onSubmit = () => {
        if(this.isValid()){
            const {email, password} = this.state;
            const {loginSuccess, appStart} = this.props;
            this.setState({isLoading: true});

            firebaseSdk.signInWithEmail(email, password)
                .then(async (user) => {
                    await AsyncStorage.setItem(CURRENT_USER, JSON.stringify(user));
                    this.setState({isLoading: false});
                    loginSuccess(user);
                })
                .catch(err => {
                    this.setState({isLoading: false});
                    if(err.indexOf('auth/user-not-found')>0){
                        showErrorAlert('このユーザは登録されていません。');
                    } else if(err.indexOf('auth/wrong-password')>0){
                        showErrorAlert('パスワードは有効でない。');
                    } else {
                        showErrorAlert('このユーザは有効でない。');
                    }
                    console.log('error', err);
                })
        }
    }

    render() {
        const {theme} = this.props;
        const {isLoading} = this.state;
        return (
            <KeyboardView
                style={{backgroundColor: themes[theme].backgroundColor}}
                contentContainerStyle={sharedStyles.container}
                keyboardVerticalOffset={128}
            >
                <StatusBar/>
                <ScrollView contentContainerStyle={{flexGrow: 1}} {...scrollPersistTaps}>
                    <SafeAreaView>
                        <View style={[sharedStyles.headerContainer, {backgroundColor: themes[theme].headerBackground}]}>
                            <Image style={styles.logo} source={images.jts_board_produced}/>
                        </View>
                        <View style={styles.formContainer}>
                            <TextInput
                                inputRef={(e) => {
                                    this.emailInput = e;
                                }}
                                placeholder={I18n.t('Email')}
                                returnKeyType='next'
                                keyboardType='email-address'
                                textContentType='oneTimeCode'
                                onChangeText={email => this.setState({email})}
                                onSubmitEditing={() => {
                                    this.passwordInput.focus();
                                }}
                                large
                                theme={theme}
                            />
                            <TextInput
                                inputRef={(e) => {
                                    this.passwordInput = e;
                                }}
                                placeholder={I18n.t('Password')}
                                returnKeyType='send'
                                secureTextEntry
                                textContentType='oneTimeCode'
                                onChangeText={value => this.setState({password: value})}
                                large
                                theme={theme}
                            />
                            <View style={styles.forgotContainer}>
                                <TouchableOpacity onPress={() =>this.forgotPassword()}>
                                    <Text style={[sharedStyles.link, styles.forgotText, {color: themes[theme].bodyText}]} >{I18n.t('Forgot_Password')}</Text>
                                </TouchableOpacity>
                            </View>
                            <Button
                                style={styles.submitBtn}
                                title={I18n.t('Login')}
                                type='primary'
                                size='W'
                                onPress={this.onSubmit}
                                testID='login-view-submit'
                                loading={isLoading}
                                theme={theme}
                            />
                            <Button
                                style={styles.submitBtn}
                                title={I18n.t('Register')}
                                type='primary'
                                size='W'
                                onPress={this.onGoToSignUp}
                                testID='login-view-submit'
                                theme={theme}
                            />
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </KeyboardView>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    loginSuccess: params => dispatch(loginSuccessAction(params)),
    appStart: params => dispatch(appStartAction(params)),
});

export default connect(null, mapDispatchToProps)(withTheme(SingInView));

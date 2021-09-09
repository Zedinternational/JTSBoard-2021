import React from 'react';
import PropTypes from 'prop-types';


import {withTheme} from "../../theme";
import TextInput from '../../containers/TextInput';
import KeyboardView from "../../containers/KeyboardView";
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import styles from "./styles";
import {Image, ScrollView, Text, View} from "react-native";
import Button from "../../containers/Button";
import images from "../../assets/images";
import scrollPersistTaps from "../../utils/scrollPersistTaps";
import SafeAreaView from "../../containers/SafeAreaView";
import {isValidEmail} from "../../utils/validators";
import {showErrorAlert, showToast} from "../../lib/info";
import {GradientHeader} from "../../containers/GradientHeader";
import I18n from "../../i18n";
import firebaseSdk from "../../lib/firebaseSdk";

class SingUpView extends React.Component{
    static navigationOptions = ({ navigation }) => ({
        headerBackground: () => <GradientHeader/>,
        title: I18n.t('Register')
    })

    static propTypes = {
        navigation: PropTypes.object,
        theme: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            isLoading: false
        }
    }

    isValid = () => {
        const { name, email, password, password_confirm} = this.state;

        if(!name.length){
            showToast('ユーザー名を空白にすることはできません');
            return false;
        }
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
        if(password.length < 6){
            showToast('パスワードは6文字以上でなければなりません');
            return false;
        }
        if(!password_confirm.length){
            showToast('パスワードの確認は空白にできません');
            return false;
        }
        if(password_confirm !== password){
            showToast('パスワードと確認パスワードは同じである必要があります');
            return false;
        }
        return true;
    }

    onSubmit = () => {
        if(this.isValid()){
            this.setState({isLoading: true});
            const {navigation} = this.props;
            const {name, email, password} = this.state;

            const user = {
                name: name,
                email: email,
                password: password
            }

            firebaseSdk.signUp(user)
                .then(async () => {
                    this.setState({isLoading: false});
                    showToast('登録に成功しました。');
                    navigation.pop();
                })
                .catch((err) => {
                    console.log('error', err);
                    showErrorAlert('登録に失敗しました。', 'エラー');
                    this.setState({isLoading: false});
                })
        }
    }


    render(){
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
                        <View style={[sharedStyles.headerContainer, {height: 160, backgroundColor: themes[theme].headerBackground}]}>
                            <Image style={styles.logo} source={images.jts_board_produced}/>
                        </View>
                        <View style={styles.formContainer}>
                            <TextInput
                                inputRef={(e) => {
                                    this.nameInput = e;
                                }}
                                placeholder={I18n.t('Name')}
                                returnKeyType='next'
                                keyboardType='twitter'
                                textContentType='oneTimeCode'
                                onChangeText={value => this.setState({name: value})}
                                onSubmitEditing={() => {
                                    this.emailInput.focus();
                                }}
                                theme={theme}
                            />
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
                                theme={theme}
                            />
                            <TextInput
                                inputRef={(e) => {
                                    this.passwordInput = e;
                                }}
                                placeholder={I18n.t('Password')}
                                returnKeyType='next'
                                secureTextEntry
                                textContentType='oneTimeCode'
                                onChangeText={value => this.setState({password: value})}
                                onSubmitEditing={() => { this.passwordConfirmInput.focus(); }}
                                theme={theme}
                            />
                            <TextInput
                                inputRef={(e) => {
                                    this.passwordConfirmInput = e;
                                }}
                                placeholder={I18n.t('Confirm_Password')}
                                returnKeyType='send'
                                secureTextEntry
                                textContentType='oneTimeCode'
                                onChangeText={value => this.setState({password_confirm: value})}
                                theme={theme}
                            />
                            <View style={styles.bottomContainer}>
                                <Text style={{color: themes[theme].bodyText, textAlign: "left", fontSize: 20}}>{I18n.t("Password_Validation")}</Text>
                            </View>
                            <Button
                                style={styles.submitBtn}
                                title={I18n.t('Register')}
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

export default withTheme(SingUpView);

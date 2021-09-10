import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from "react-native";
import {connect} from "react-redux";

import {withTheme} from "../../theme";
import TextInput from '../../containers/TextInput';
import KeyboardView from "../../containers/KeyboardView";
import {themes} from "../../constants/colors";
import sharedStyles from "../Styles";
import StatusBar from "../../containers/StatusBar";
import styles from "./styles";
import Button from "../../containers/Button";
import scrollPersistTaps from "../../utils/scrollPersistTaps";
import SafeAreaView from "../../containers/SafeAreaView";
import {showErrorAlert, showToast} from "../../lib/info";
import firebaseSdk, {DB_ACTION_UPDATE} from "../../lib/firebaseSdk";
import {setUser as setUserAction} from "../../actions/login";
import {GradientHeader} from "../../containers/GradientHeader";
import RadioForm from "../../containers/RadioButton";
import DatePicker from "../../containers/DatePicker";
import {Select} from "../../containers/Select";

const sex_radio_props = [{ label: '男性', value: 0 }, { label: '女性', value: 1 }];
const mail_radio_props = [{ label: 'はい', value: 0 }, { label: 'いいえ', value: 1 }];
const jobOptions = [{value: 'アルバイト・パート', text: 'アルバイト・パート'}, {value: '学生', text: '学生'}, {value: '会社員', text: '会社員'}, {value: '自営業', text: '自営業'}, {value: '専業主婦', text: '専業主婦'}, {value: '会社役員', text: '会社役員'}, {value: 'その他', text: 'その他'}];
const howHeardOptions = [{value: 'ホットペッパー', text: 'ホットペッパー'}, {value: 'iSpot', text: 'iSpot'}, {value: 'EPARK', text: 'EPARK'}, {value: 'ウェブサイト', text: 'ウェブサイト'}, {value: 'その他', text: 'その他'}];
const howComeOptions = [{value: '車', text: '車'}, {value: 'タクシー', text: 'タクシー'}, {value: '電車', text: '電車'}, {value: '自転車', text: '自転車'}, {value: '徒歩', text: '徒歩'}, {value: 'その他', text: 'その他'}];
const todayCourseOptions = [{value: '', text: ''}];

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
            first_name: '',
            last_name: '',
            kana_first_name: '',
            kana_last_name: '',
            gender: 0,
            dob: null,
            age: 0,
            tel: '',
            zip_code: '',
            prefecture: '',
            city: '',
            address1: '',
            address2: '',
            email: '',
            subscription_of_news: 0,
            job: null,
            know_about_company: null,
            how_did_you_come: null,
            today_course: null,
            isLoading: false,
        }
    }

    isValid = () => {
        const {first_name, last_name, kana_first_name, kana_last_name, gender, dob, age, tel, zip_code, prefecture, city, address1, address2, email, subscription_of_news, job, know_about_company, how_did_you_com, today_course} = this.state;
        if(!first_name.length){
            showToast('Please enter your first name.');
            return false;
        }
        if(!last_name.length){
            showToast('Please enter your last name.');
            return false;
        }
        if(!kana_first_name.length){
            showToast('Please enter your interests.');
            return false;
        }
        if(!kana_last_name.length){
            showToast('Please enter your location.');
            return false;
        }
        if(!dob){
            showToast('Please enter your bio.');
            return false;
        }
        return true;
    }

    onSubmit = () => {
        if(this.isValid()){
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

            this.setState({isLoading: true});

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
    }

    render(){
        const {theme} = this.props;
        const { first_name, last_name, kana_first_name, kana_last_name, gender, dob, age, tel, zip_code, prefecture, city,address1, address2, email, subscription_of_news, job, know_about_company, how_did_you_come, today_course, isLoading} = this.state;
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
                                    label={'名前 :'}
                                    placeholder={'姓'}
                                    returnKeyType='next'
                                    keyboardType='twitter'
                                    onChangeText={value => this.setState({first_name: value})}
                                    onSubmitEditing={() => {
                                        this.lastNameInput.focus();
                                    }}
                                    theme={theme}
                                />
                                <TextInput
                                    inputRef={(e) => {
                                        this.lastNameInput = e;
                                    }}
                                    containerStyle={styles.inputContainer}
                                    value={last_name}
                                    placeholder={'名'}
                                    returnKeyType='next'
                                    keyboardType='twitter'
                                    onChangeText={value => this.setState({last_name: value})}
                                    onSubmitEditing={() => {
                                        this.kanaFirstNameInput.focus();
                                    }}
                                    theme={theme}
                                />
                            </View>
                            <View style={styles.formRow}>
                                <TextInput
                                    inputRef={(e) => {
                                        this.kanaFirstNameInput = e;
                                    }}
                                    containerStyle={styles.inputContainer}
                                    value={kana_first_name}
                                    label={'カナ :'}
                                    placeholder={'姓'}
                                    returnKeyType='next'
                                    keyboardType='twitter'
                                    onChangeText={value => this.setState({kana_first_name: value})}
                                    onSubmitEditing={() => {
                                        this.kanaLastNameInput.focus();
                                    }}
                                    theme={theme}
                                />
                                <TextInput
                                    inputRef={(e) => {
                                        this.kanaLastNameInput = e;
                                    }}
                                    containerStyle={styles.inputContainer}
                                    value={kana_last_name}
                                    placeholder={'名'}
                                    returnKeyType='next'
                                    keyboardType='twitter'
                                    onChangeText={value => this.setState({kana_last_name: value})}
                                    theme={theme}
                                />
                            </View>
                            <View style={styles.formRow}>
                                <RadioForm
                                    radio_props={sex_radio_props}
                                    initial={gender}
                                    containerStyle={styles.inputContainer}
                                    label={'性別 :'}
                                    buttonOuterSize={18}
                                    buttonColor={'#000'}
                                    buttonSize={10}
                                    labelHorizontal={true}
                                    formHorizontal={true}
                                    onPress={value => {
                                        this.setState({ gender: value });
                                    }}
                                    theme={theme}
                                />
                                <DatePicker
                                    style={{flex: 1}}
                                    placeholder={'年／月／日'}
                                    containerStyle={styles.inputContainer}
                                    label={'誕生日 :'}
                                    type={'date'}
                                    action={({value}) => {
                                        if(!value){
                                            return;
                                        }
                                        this.setState({ dob: value });
                                    }}
                                    theme={theme}
                                />
                            </View>
                            <View style={styles.formRow}>
                                <TextInput
                                    inputRef={(e) => {
                                        this.ageInput = e;
                                    }}
                                    containerStyle={styles.inputContainer}
                                    value={age}
                                    label={'年齢 :'}
                                    placeholder={'00'}
                                    returnKeyType='next'
                                    keyboardType='twitter'
                                    onChangeText={value => this.setState({age: value})}
                                    onSubmitEditing={() => {
                                        this.telInput.focus();
                                    }}
                                    theme={theme}
                                />
                                <TextInput
                                    inputRef={(e) => {
                                        this.telInput = e;
                                    }}
                                    containerStyle={styles.inputContainer}
                                    value={tel}
                                    label={'電話 :'}
                                    placeholder={'123456789'}
                                    returnKeyType='next'
                                    keyboardType='twitter'
                                    onChangeText={value => this.setState({tel: value})}
                                    onSubmitEditing={() => {
                                        this.zipCodeInput.focus();
                                    }}
                                    theme={theme}
                                />
                            </View>
                            <View style={styles.formRow}>
                                <TextInput
                                    inputRef={(e) => {
                                        this.zipCodeInput = e;
                                    }}
                                    containerStyle={styles.inputContainer}
                                    value={zip_code}
                                    label={'住所 :'}
                                    placeholder={'  〒  郵便番号'}
                                    returnKeyType='next'
                                    keyboardType='twitter'
                                    onChangeText={value => this.setState({zip_code: value})}
                                    onSubmitEditing={() => {
                                        this.prefectureInput.focus();
                                    }}
                                    theme={theme}
                                />
                                <TextInput
                                    inputRef={(e) => {
                                        this.prefectureInput = e;
                                    }}
                                    containerStyle={styles.inputContainer}
                                    value={prefecture}
                                    placeholder={'都道府県'}
                                    returnKeyType='next'
                                    keyboardType='twitter'
                                    onChangeText={value => this.setState({prefecture: value})}
                                    onSubmitEditing={() => {
                                        this.cityInput.focus();
                                    }}
                                    theme={theme}
                                />
                            </View>
                            <View style={styles.formRow}>
                                <TextInput
                                    inputRef={(e) => {
                                        this.cityInput = e;
                                    }}
                                    containerStyle={styles.inputContainer}
                                    value={city}
                                    placeholder={'市'}
                                    returnKeyType='next'
                                    keyboardType='twitter'
                                    onChangeText={value => this.setState({city: value})}
                                    onSubmitEditing={() => {
                                        this.address1Input.focus();
                                    }}
                                    theme={theme}
                                />
                                <TextInput
                                    inputRef={(e) => {
                                        this.address1Input = e;
                                    }}
                                    containerStyle={styles.inputContainer}
                                    value={address1}
                                    placeholder={'区・町・番地'}
                                    returnKeyType='next'
                                    keyboardType='twitter'
                                    onChangeText={value => this.setState({address1: value})}
                                    onSubmitEditing={() => {
                                        this.address2Input.focus();
                                    }}
                                    theme={theme}
                                />
                            </View>
                            <View style={styles.formRow}>
                                <TextInput
                                    inputRef={(e) => {
                                        this.address2Input = e;
                                    }}
                                    containerStyle={styles.inputFullContainer}
                                    value={address2}
                                    placeholder={'アパート・マンション名'}
                                    returnKeyType='next'
                                    keyboardType='twitter'
                                    onChangeText={value => this.setState({address2: value})}
                                    onSubmitEditing={() => {
                                        this.phoneInput.focus();
                                    }}
                                    theme={theme}
                                />
                            </View>
                            <View style={styles.formRow}>
                                <TextInput
                                    inputRef={(e) => {
                                        this.phoneInput = e;
                                    }}
                                    containerStyle={styles.inputContainer}
                                    value={email}
                                    label={'メール :'}
                                    placeholder={'info@jtsboard.com'}
                                    returnKeyType='next'
                                    keyboardType='twitter'
                                    onChangeText={value => this.setState({email: value})}
                                    onSubmitEditing={() => {
                                        // this.interestsInput.focus();
                                    }}
                                    theme={theme}
                                />
                                <RadioForm
                                    radio_props={mail_radio_props}
                                    initial={subscription_of_news}
                                    containerStyle={styles.inputContainer}
                                    label={'ニュースやダイレクトメール送付を希望しますか？'}
                                    buttonOuterSize={18}
                                    buttonColor={'#000'}
                                    buttonSize={10}
                                    labelHorizontal={true}
                                    formHorizontal={true}
                                    onPress={value => {
                                        this.setState({ subscription_of_news: value });
                                    }}
                                    theme={theme}
                                />
                            </View>
                            <View style={styles.formRow}>
                                <Select
                                    options={jobOptions}
                                    containerStyle={styles.inputContainer}
                                    label={'職業 :'}
                                    placeholder={'アルバイト・パート'}
                                    theme={theme}
                                    value={job}
                                    onChange={value => this.setState({job: value})}
                                />
                                <Select
                                    options={howHeardOptions}
                                    containerStyle={styles.inputContainer}
                                    label={'何でこのサロンを知りましたか？'}
                                    placeholder={'ホットペッパー'}
                                    theme={theme}
                                    value={know_about_company}
                                    onChange={value => this.setState({know_about_company: value})}
                                />
                            </View>
                            <View style={styles.formRow}>
                                <Select
                                    options={howComeOptions}
                                    containerStyle={styles.inputContainer}
                                    label={'何でサロンまでお越しになりましたか？'}
                                    placeholder={'タクシー'}
                                    theme={theme}
                                    value={how_did_you_come}
                                    onChange={value => this.setState({how_did_you_come: value})}
                                />
                                <Select
                                    options={todayCourseOptions}
                                    containerStyle={styles.inputContainer}
                                    label={'今日のコース :'}
                                    placeholder={'ネイル'}
                                    theme={theme}
                                    value={today_course}
                                    onChange={value => this.setState({today_course: value})}
                                />
                            </View>
                            <Button
                                style={styles.submitBtn}
                                title={'登録'}
                                type='primary'
                                size='W'
                                onPress={this.onSubmit}
                                testID='detail-view-submit'
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

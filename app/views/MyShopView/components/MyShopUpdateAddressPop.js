import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image, ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from "../../../assets/images";
import {COLOR_BUTTON_PRIMARY, COLOR_BUTTON_PRIMARY_LIGHT, themes} from "../../../constants/colors";
import {setUser as setUserAction} from "../../../actions/login";
import {connect} from "react-redux";
import TextInputMask from 'react-native-text-input-mask';
import {withTheme} from "../../../theme";
import firebaseSdk, {DB_ACTION_UPDATE} from "../../../lib/firebaseSdk";
import {showToast} from "../../../lib/info";

class MyShopUpdateAddressPop extends Component {
    static navigationOptions = {header: null};
    /**
     * Default props
     */
    static defaultProps = {
        backgroundColor: 'white',
    };

    constructor(props) {
        super(props);
        this.state = {
            zip_code: props.user.zip_code??'',
            prefecture: props.user.prefecture??'',
            city: props.user.city??'',
            address1: props.user.address1??'',
            address2: props.user.address2??'',
            isLoading: false,
        };
    }

    isValid = () => {
        // if (this.state.email.trim().length === 0) {
        // 	console.log('Please enter email');
        // 	return false;
        // } else if (this.validateEmail(this.state.email) === false) {
        // 	console.log('Please enter valid email');
        // 	return false;
        // } else {
        // 	this.callForgotPassword();
        // }
        return true;
    }

    onSubmit = () => {
        if (this.isValid()) {
            const {user, setUser} = this.props;

            let userInfo = {
                id: user.id,
                zip_code: this.state.zip_code,
                prefecture: this.state.prefecture,
                city: this.state.city,
                address1: this.state.address1,
                address2: this.state.address2
            };

            this.setState({isLoading: true});
            firebaseSdk.setData(firebaseSdk.TBL_users, DB_ACTION_UPDATE, userInfo)
                .then(() => {
                    this.setState({isLoading: false});
                    const updateUser = {...user, ...userInfo};
                    setUser(updateUser);
                    this.props.onClose();
                })
                .catch(err => {
                    showToast(err.message);
                    console.log('err', err);
                    this.setState({isLoading: false});
                })
        }
    }


    btnClosePress = () => {
        this.props.onClose();
    }

    render() {
        const {theme} = this.props;
        const {isLoading} = this.state;

        return (
            <View style={styles.container}>
                <View style={[styles.contentView, {backgroundColor: this.props.backgroundColor}]}>
                    <LinearGradient colors={[COLOR_BUTTON_PRIMARY_LIGHT, COLOR_BUTTON_PRIMARY]}
                                    style={styles.linearGradient}>
                        <TouchableOpacity
                            style={{height: 40}}
                            activeOpacity={0.6}
                            onPress={this.btnClosePress}
                        >
                            <Image
                                source={images.close_white}
                                style={{
                                    width: 24,
                                    height: 24,
                                    marginLeft: 5,
                                    marginTop: 9
                                }}
                            />
                        </TouchableOpacity>
                        <View
                            style={{
                                flexGrow: 1,
                                alignSelf: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 18,
                                textAlign: 'center'
                            }}>???????????????</Text>
                        </View>
                        <TouchableOpacity style={{height: 40}} onPress={this.onSubmit}>
                            {isLoading
                                ? <ActivityIndicator color={themes[theme].buttonText} size={"large"}/>
                                :
                                <Image
                                    source={images.checkmark}
                                    style={{
                                        width: 28,
                                        height: 28,
                                        marginLeft: 40,
                                        marginTop: 9
                                    }}
                                />}
                        </TouchableOpacity>
                    </LinearGradient>
                    <View style={styles.modalRow}>
                        <View style={styles.inputView}>
                            <TextInputMask
                                style={styles.inputText}
                                placeholder={'????????????'}
                                multiline={false}
                                placeholderTextColor={'gray'}
                                autoCapitalize={'none'}
                                keyboardType={'twitter'}
                                autoCorrect={false}
                                underlineColorAndroid={'transparent'}
                                onChangeText={(formatted, extracted) => this.setState({zip_code: formatted})}
                                mask={"[000]-[0000]"}
                                value={this.state.zip_code}
                            />
                        </View>
                    </View>
                    <View style={styles.modalRow}>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.inputText}
                                placeholder={'????????????'}
                                multiline={false}
                                placeholderTextColor={'gray'}
                                autoCapitalize={'none'}
                                keyboardType={'twitter'}
                                autoCorrect={false}
                                underlineColorAndroid={'transparent'}
                                onChangeText={value => this.setState({prefecture: value})}
                                value={this.state.prefecture}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.inputText}
                                placeholder={'?????????'}
                                multiline={false}
                                placeholderTextColor={'gray'}
                                autoCapitalize={'none'}
                                keyboardType={'twitter'}
                                autoCorrect={false}
                                underlineColorAndroid={'transparent'}
                                onChangeText={value => this.setState({city: value})}
                                value={this.state.city}
                            />
                        </View>
                    </View>
                    <View style={styles.modalRow}>
                        <View style={styles.inputFullView}>
                            <TextInput
                                style={styles.inputText}
                                placeholder={'?????????'}
                                multiline={false}
                                placeholderTextColor={'gray'}
                                autoCapitalize={'none'}
                                keyboardType={'twitter'}
                                autoCorrect={false}
                                underlineColorAndroid={'transparent'}
                                onChangeText={value => this.setState({address1: value})}
                                value={this.state.address1}
                            />
                        </View>
                    </View>
                    <View style={styles.modalRow}>
                        <View style={styles.inputFullView}>
                            <TextInput
                                style={styles.inputText}
                                placeholder={'?????????????????????????????????'}
                                multiline={false}
                                placeholderTextColor={'gray'}
                                autoCapitalize={'none'}
                                keyboardType={'twitter'}
                                autoCorrect={false}
                                underlineColorAndroid={'transparent'}
                                onChangeText={value => this.setState({address2: value})}
                                value={this.state.address2}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setUser: params => dispatch(setUserAction(params))
})

const mapStateToProps = state => ({
    user: state.login.user
})


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(MyShopUpdateAddressPop));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 100,
        justifyContent: 'center',
        backgroundColor: 'rgba(200, 200, 200, 0.0)'
    },
    scrollView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    linearGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16
    },
    contentView: {
        borderRadius: 10,
        height: 400,
        backgroundColor: 'white',
    },
    topContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    textHeader: {
        color: 'black',
        fontSize: 18,
        marginVertical: 0,
        alignSelf: 'center'
    },
    bottomContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 5,
        marginBottom: 5
    },
    dividerView: {
        backgroundColor: '#3c3c3c',
        height: 4
    },
    btnCancel: {
        backgroundColor: '#6bb003',
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: 10,
        overflow: 'hidden',
        alignSelf: 'center',
        marginBottom: 15
    },

    textCancel: {
        color: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 1
    },
    btnClose: {
        justifyContent: 'flex-end',
        marginTop: 13,
        overflow: 'hidden',
        alignSelf: 'flex-end',
        width: '12%',
        height: 40
    },
    textClose: {
        color: 'black',
        paddingHorizontal: 5,
        paddingVertical: 5,
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 10
    },
    modalRow: {
        flexDirection: 'row',
        width: '100%'
    },
    inputText: {
        marginTop: 20,
        paddingVertical: 5,
        color: 'black',
        fontSize: 15,
        textAlign: 'left',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    inputView: {
        paddingHorizontal: 24,
        width: '50%'
    },
    inputFullView: {
        paddingHorizontal: 24,
        width: '100%'
    }
});

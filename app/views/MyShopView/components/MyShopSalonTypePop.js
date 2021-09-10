import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image, ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from "../../../assets/images";
import {COLOR_BUTTON_PRIMARY, COLOR_BUTTON_PRIMARY_LIGHT, themes} from "../../../constants/colors";
import CheckBox from "../../../containers/CheckBox";
import {setUser as setUserAction} from "../../../actions/login";
import {connect} from "react-redux";
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
            selected: props.user.salon_type??[],
            isLoading: false,
        };
    }

    toggleCheck = (type) => {
        if(this.state.selected.includes(type)){
            this.setState({selected: this.state.selected.filter(v => v !== type)});
        } else {
            this.setState({selected: [...this.state.selected, type]});
        }
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
                salon_type: this.state.selected
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
                            }}>サロンのこだわり</Text>
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
                    <View style={styles.modalContent}>
                        <View style={styles.modalRow}>
                            <View style={styles.inputView}>
                                <CheckBox
                                    title={'お手頃プライスのサロン'}
                                    checked={this.state.selected.includes('お手頃プライスのサロン')}
                                    onPress={() => this.toggleCheck('お手頃プライスのサロン')}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <CheckBox
                                    title={'ハイクオリティサロン'}
                                    checked={this.state.selected.includes('ハイクオリティサロン')}
                                    onPress={() => this.toggleCheck('ハイクオリティサロン')}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                />
                            </View>
                        </View>
                        <View style={styles.modalRow}>
                            <View style={styles.inputView}>
                                <CheckBox
                                    title={'駐車場あり'}
                                    checked={this.state.selected.includes('駐車場あり')}
                                    onPress={() => this.toggleCheck('駐車場あり')}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <CheckBox
                                    title={'10時前でも受付可能'}
                                    checked={this.state.selected.includes('10時前でも受付可能')}
                                    onPress={() => this.toggleCheck('10時前でも受付可能')}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                />
                            </View>
                        </View>
                        <View style={styles.modalRow}>
                            <View style={styles.inputView}>
                                <CheckBox
                                    title={'20時以降でも受付可能'}
                                    checked={this.state.selected.includes('20時以降でも受付可能')}
                                    onPress={() => this.toggleCheck('20時以降でも受付可能')}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <CheckBox
                                    title={'子連れOK'}
                                    checked={this.state.selected.includes('子連れOK')}
                                    onPress={() => this.toggleCheck('子連れOK')}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                />
                            </View>
                        </View>
                        <View style={styles.modalRow}>
                            <View style={styles.inputView}>
                                <CheckBox
                                    title={'駅から徒歩10分以内'}
                                    checked={this.state.selected.includes('駅から徒歩10分以内')}
                                    onPress={() => this.toggleCheck('駅から徒歩10分以内')}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <CheckBox
                                    title={'ラグジュアリーサロン'}
                                    checked={this.state.selected.includes('ラグジュアリーサロン')}
                                    onPress={() => this.toggleCheck('ラグジュアリーサロン')}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                />
                            </View>
                        </View>
                        <View style={styles.modalRow}>
                            <View style={styles.inputView}>
                                <CheckBox
                                    title={'静かなサロン'}
                                    checked={this.state.selected.includes('静かなサロン')}
                                    onPress={() => this.toggleCheck('静かなサロン')}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <CheckBox
                                    title={'喫煙OK'}
                                    checked={this.state.selected.includes('喫煙OK')}
                                    onPress={() => this.toggleCheck('喫煙OK')}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                />
                            </View>
                        </View>
                        <View style={styles.modalRow}>
                            <View style={styles.inputView}>
                                <CheckBox
                                    title={'女性専用'}
                                    checked={this.state.selected.includes('女性専用')}
                                    onPress={() => this.toggleCheck('女性専用')}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <CheckBox
                                    title={'プライベートサロン'}
                                    checked={this.state.selected.includes('プライベートサロン')}
                                    onPress={() => this.toggleCheck('プライベートサロン')}
                                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                                />
                            </View>
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
    modalContent: {
        padding: 4
    },
    modalRow: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 4
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

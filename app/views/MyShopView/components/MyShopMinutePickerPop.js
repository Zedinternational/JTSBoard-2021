import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
	TextInput,
	Image,
	Animated,
	Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from "../../../assets/images";

// import Images from '@Images';
that = this;

class MyShopMinutePickerPop extends Component {
	static navigationOptions = { header: null };
	/**
	 * Default props
	 */
	static defaultProps = {
		backgroundColor: 'white',

		placeHolderText: '代表名'
	};

	constructor(props) {
		super(props);
		that = this;
		this.btnSubmitPress.bind(this);
		this.onSignUpActionHandler.bind(this);
		this.state = {
			email: ''
		};
	}

	/**
	 * Validate email
	 */
	validateEmail = function(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	/**
	 * Button submit pressed
	 */
	btnSubmitPress() {
		if (this.state.email.trim().length == 0) {
			console.log('Please enter email');
		} else if (this.validateEmail(this.state.email) == false) {
			console.log('Please enter valid email');
		} else {
			this.callForgotPassword();
		}
	}

	callForgotPassword() {
		// UserManger.ForgotPassword(this.state.email)
		// 	.then(response => {
		// 		console.warn('response:----', response);
		// 		console.log('response:', response);
		//
		// 		if (response.status == 'success') {
		// 			console.warn('in success ', response.msg);
		// 			console.log(response.msg);
		// 			if (response.msg == 'This email is already exist.') {
		// 				console.warn('tryxcx');
		// 				that.setState({ spinner: false });
		//
		// 				that.AlertBox('Good Bitee', response.msg);
		// 				that.props.navigation.pop();
		// 			} else {
		// 				//that.setState({ spinner: false });
		//
		// 				that.AlertBox('Good Bitee', response.msg);
		// 				//that.props.navigation.push('WelcomeScreen');
		// 			}
		// 		} else {
		// 			//that.setState({ spinner: false });
		//
		// 			that.setState({ email: '', spinner: false });
		// 			DISPLAY_ALERT('Good Bitee', response.msg);
		// 		}
		// 	})
		// 	.catch(function(error) {
		// 		console.warn('error:', error);
		// 		console.log('error:', error);
		// 	});
	}

	onSignUpActionHandler() {
		// if (IS_EMAIL_VALID(this.state.email) == false) {
		// 	DISPLAY_ALERT('Good Bitee', 'please enter a valid email id!');
		//
		// 	return;
		// }
	}
	AlertBox(alertTitle, AlertMessage) {
		Alert.alert(
			alertTitle,
			AlertMessage,
			[
				{
					text: 'OK',
					onPress: () => {
						if (AlertMessage == 'Password Update successfully.') {
							this.props.callbackAfterMyShopPop(0, this.props.otherParamsToSend);
						} else {
							this.props.callbackAfterMyShopPop(0, this.props.otherParamsToSend);
						}
					}
				}
			],
			{ cancelable: false }
		);
	}

	/**
	 * Button close pressed
	 */
	btnClosePress() {
		this.props.callbackAfterMyShopPop(0, this.props.otherParamsToSend);
	}

	render() {
		return (
			<View style={styles.container}>
				{/* <TouchableOpacity style={{ width: '100%', height: 90, backgroundColor: 'red', borderRadius: 5 }}> */}
				<View style={[styles.bottomView, { backgroundColor: this.props.backgroundColor }]}>
					<LinearGradient colors={['#dcbc4d', '#9c7e2e']} style={styles.linearGradient}>
						<View style={{ flexDirection: 'row', flex: 0.1 }}>
							<View style={{ width: '30%', height: 50 }}></View>

							<View
								style={{
									width: '40%',
									height: 99,

									alignSelf: 'center',
									justifyContent: 'center'
								}}
							>
								<Text style={{ marginTop: 35, color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
									代表名
								</Text>
							</View>
							<TouchableOpacity style={{ width: '40%', height: 40 }}>
								<Image
									source={images.checkmark}
									style={{
										width: '29%',
										height: 20,
										justifyContent: 'flex-end',
										marginLeft: 40,
										marginTop: 9
									}}
								/>
							</TouchableOpacity>
						</View>

						<TouchableOpacity
							style={{ width: '20%', height: 40 }}
							activeOpacity={0.6}
							onPress={() => this.btnClosePress()}
						>
							<Image
								source={images.close_white}
								style={{
									width: '39%',
									height: 20,

									marginLeft: 5,
									marginTop: 9
								}}
							/>
						</TouchableOpacity>
					</LinearGradient>
				</View>
				<Text>honey</Text>
			</View>
		);
	}
}
export default MyShopMinutePickerPop;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 50,

		justifyContent: 'center',
		backgroundColor: 'rgba(200, 200, 200, 0.0)'
	},
	scrollView: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center'
	},
	linearGradient: {
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5
	},
	bottomView: {
		borderRadius: 10,

		height: '35%',
		// justifyContent: 'center',
		backgroundColor: 'white'
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
	inputText: {
		marginTop: 20,
		paddingVertical: 5,
		color: 'black',

		marginLeft: 25,
		fontSize: 15,
		textAlign: 'left'
	},
	inputView: {
		backgroundColor: 'white',
		borderRadius: 50,
		justifyContent: 'flex-start',
		borderWidth: 1,
		marginHorizontal: 15,
		marginVertical: 10,
		borderColor: '#3c3c3c',
		overflow: 'hidden'
	}
});

import React, { Component } from 'react';
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
import firebaseSdk, {DB_ACTION_UPDATE} from "../../../lib/firebaseSdk";
import {showToast} from "../../../lib/info";
import {setUser as setUserAction} from "../../../actions/login";
import {connect} from "react-redux";
import {withTheme} from "../../../theme";
import TextInputMask from "react-native-text-input-mask";

const fields = [
	{ key: 'name', title: '代表名'},
	{ key: 'description', title: '説明'},
	{ key: 'company_name', title: '会社名'},
	{ key: 'email', title: 'メール'},
	{ key: 'salon_name', title: 'サロン名'},
	{ key: 'website', title: 'ホームページのURL'},
	{ key: 'tel', title: '電話番号'},
	{ key: 'using_app', title: '使用している広告'},
	{ key: 'service', title: 'サービスを選択'},
	{ key: 'pin_code', title: 'PINコード'},
	{ key: 'holiday_date', title: '夏季冬季休暇等'},
	{ key: 'end_date', title: '夏季冬季休暇等'},
	{ key: 'overtime_time', title: '夏季冬季休暇等'},
	{ key: 'commitment', title: 'サロンのこだわり'}
];

class MyShopUpdateFieldPop extends Component {
	/**
	 * Default props
	 */
	static defaultProps = {
		backgroundColor: 'white',
	};

	constructor(props) {
		super(props);
		const field = fields.find(f => f.key === props.field);

		this.state = {
			value: this.props.value??'',
			caption: field.title,
			isLoading: false
		};
	}

	/**
	 * Validate email
	 */
	validateEmail = (email) => {
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

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
		if(this.isValid()){
			const {navigation, user, setUser} = this.props;

			let userInfo = {id: user.id};
			userInfo[this.props.field] = this.state.value;

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
		const { caption, isLoading } = this.state;
		const {theme} = this.props;

		return (
			<View style={styles.container}>
				<View style={[styles.contentView, { backgroundColor: this.props.backgroundColor }]}>
					<LinearGradient colors={[COLOR_BUTTON_PRIMARY_LIGHT, COLOR_BUTTON_PRIMARY]} style={styles.linearGradient}>
						<TouchableOpacity
							style={{ height: 40 }}
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
							<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
								{caption}
							</Text>
						</View>
						<TouchableOpacity style={{ height: 40 }} onPress={this.onSubmit}>
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
					{
						this.props.field === 'tel' ?
							<TextInputMask
								style={styles.inputText}
								placeholder={caption}
								multiline={false}
								placeholderTextColor={'gray'}
								autoCapitalize={'none'}
								keyboardType={'twitter'}
								autoCorrect={false}
								underlineColorAndroid={'transparent'}
								onChangeText={(formatted, extracted) => this.setState({value: formatted})}
								mask={"[000]-[0000]-[0000]"}
								value={this.state.value}
							/>
							:
						<TextInput
							style={styles.inputText}
							placeholder={caption}
							multiline={false}
							placeholderTextColor={'gray'}
							autoCapitalize={'none'}
							keyboardType={'twitter'}
							autoCorrect={false}
							underlineColorAndroid={'transparent'}
							onChangeText={value => this.setState({ value: value })}
							value={this.state.value}
						/>
					}
					<View style={{ height: 0.5, backgroundColor: 'gray', marginTop: 5, marginHorizontal: 32 }}/>
				</View>
			</View>
		);
	}
}

const mapDispatchToProps = dispatch =>({
	setUser: params => dispatch(setUserAction(params))
})

const mapStateToProps = state => ({
	user: state.login.user
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(MyShopUpdateFieldPop));

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 100,
		justifyContent: 'center',
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
		height: 300,
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
	inputText: {
		marginTop: 20,
		paddingVertical: 5,
		color: 'black',
		marginHorizontal: 32,
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

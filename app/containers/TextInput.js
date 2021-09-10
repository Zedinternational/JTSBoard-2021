import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';

import sharedStyles from '../views/Styles';
import { COLOR_DANGER, themes } from '../constants/colors';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {isIOS, isTablet} from "../utils/deviceInfo";

const styles = StyleSheet.create({
	error: {
		...sharedStyles.textAlignCenter,
		paddingTop: 5
	},
	inputContainer: {
		marginBottom: 10
	},
	label: {
		marginBottom: 10,
		fontSize: 14,
		...sharedStyles.textSemibold
	},
	required: {
		marginBottom: 10,
		color: COLOR_DANGER,
		fontSize: 14,
		fontWeight: '700'
	},
	input: {
		...sharedStyles.textRegular,
		height: 40,
		fontSize: 16,
		paddingHorizontal: isIOS?8:14,
		borderWidth: 1,
		borderRadius: 4
	},
	largeInput: {
		height: 60,
		fontSize: 20,
	},
	inputIconLeft: {
		paddingLeft: 45
	},
	inputIconRight: {
		paddingRight: 45
	},
	wrap: {
		position: 'relative'
	},
	iconContainer: {
		position: 'absolute',
		top: 14
	},
	iconLeft: {
		left: 15
	},
	iconRight: {
		right: 15
	},
	icon: {
		color: '#2F343D'
	},
});

export default class RCTextInput extends React.PureComponent {
	static propTypes = {
		label: PropTypes.string,
		required: PropTypes.string,
		error: PropTypes.object,
		loading: PropTypes.bool,
		secureTextEntry: PropTypes.bool,
		containerStyle: PropTypes.object,
		inputStyle: PropTypes.object,
		inputRef: PropTypes.func,
		testID: PropTypes.string,
		iconLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		iconRight: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		placeholder: PropTypes.string,
		left: PropTypes.element,
		onIconRightPress: PropTypes.func,
		large: PropTypes.bool,
		theme: PropTypes.string
	}

	static defaultProps = {
		error: {},
		theme: 'theme_a'
	}

	state = {
		showPassword: false
	}

	get iconLeft() {
		const { testID, iconLeft, theme } = this.props;
			return (
				<MaterialCommunityIcons
					name={iconLeft.icon}
					testID={testID ? `${ testID }-icon-left` : null}
					style={[styles.iconContainer, styles.iconLeft, { color: themes[theme].bodyText }]}
					size={18}
				/>
			);
	}

	get iconRight() {
		const { iconRight, onIconRightPress, theme } = this.props;
			return (
				<MaterialCommunityIcons
					name={iconRight.icon}
					style={{ color: themes[theme].bodyText }}
					size={18}
				/>
			);
	}

	tooglePassword = () => {
		this.setState(prevState => ({ showPassword: !prevState.showPassword }));
	}

	render() {
		const { showPassword } = this.state;
		const {
			label, left, required, error, loading, secureTextEntry, containerStyle, inputRef, iconLeft, iconRight, inputStyle, testID, placeholder, large, theme, ...inputProps
		} = this.props;
		const { dangerColor } = themes[theme];
		return (
			<View style={[styles.inputContainer, containerStyle, large && {marginBottom: 20}]}>
				{label ? (
					<Text
						contentDescription={null}
						accessibilityLabel={null}
						style={[
							styles.label,
							{ color: themes[theme].titleText },
							error.error && { color: dangerColor }
						]}
					>
						{label}
						{required ? <Text contentDescription={null} accessibilityLabel={null} style={[styles.required, error.error]}>{` ${ required }`}</Text> : null}
					</Text>
				) : null}
				<View style={styles.wrap}>
					<TextInput
						style={[
							styles.input,
							large && styles.largeInput,
							iconLeft && styles.inputIconLeft,
							(secureTextEntry || iconRight) && styles.inputIconRight,
							{
								backgroundColor: themes[theme].backgroundColor,
								borderColor: themes[theme].separatorColor,
								color: themes[theme].titleText
							},
							error.error && {
								color: dangerColor,
								borderColor: dangerColor
							},
							inputStyle
						]}
						ref={inputRef}
						autoCorrect={false}
						autoCapitalize='none'
						underlineColorAndroid='transparent'
						secureTextEntry={secureTextEntry && !showPassword}
						testID={testID}
						accessibilityLabel={placeholder}
						placeholder={placeholder}
						contentDescription={placeholder}
						placeholderTextColor={themes[theme].auxiliaryText}
						theme={'light'}
						{...inputProps}
					/>
					{iconLeft ? this.iconLeft : null}
					{iconRight ? this.iconRight : null}
					{loading ? this.loading : null}
					{left}
				</View>
				{error && error.reason ? <Text style={[styles.error, { color: dangerColor }]}>{error.reason}</Text> : null}
			</View>
		);
	}
}

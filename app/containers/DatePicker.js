import React, { useState } from 'react';
import {StyleSheet, Text, TouchableOpacity, Platform, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {DATE_STRING_FORMAT, TIME_STRING_FORMAT} from "../utils/datetime";
import {themes} from "../constants/colors";
import {isTablet} from "../utils/deviceInfo";
import sharedStyles from "../views/Styles";

const styles = StyleSheet.create({
	inputContainer: {
		marginBottom: isTablet?20:10
	},
	label: {
		marginBottom: 10,
		fontSize: 14,
		...sharedStyles.textSemibold
	},
	input: {
		height: 40,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		width: 120,
		borderWidth: 1,
		marginRight: 8
	},
	inputText: {
		fontSize: 14
	},
	icon: {
		right: 16,
		position: 'absolute'
	},
	loading: {
		padding: 0
	}
});

export default function DatePicker({ label, placeholder, style, type, value, action, minimumDate, containerStyle, theme }) {
	const [show, onShow] = useState(false);
	const [currentDate, onChangeDate] = useState(value);

	const onChange = ({ nativeEvent: { timestamp } }, date) => {
		if (Platform.OS === 'android') {
			onShow(false);
		}
		if(type === 'date'){
			console.log('date', date);
			if(!date){ return; }
			const newDate = date;
			onChangeDate(newDate);
			action({ value: moment(newDate).format(DATE_STRING_FORMAT) });
		} else {
			console.log('time', timestamp);
			if(!timestamp){ return; }
			const newDate = new Date(timestamp);
			onChangeDate(newDate);
			action({ value: moment(newDate).format(TIME_STRING_FORMAT) });
		}
	};


	const getTimeString = (date) => {
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		let strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}


	if(Platform.OS === 'ios'){
		return (
			<View style={[styles.inputContainer, containerStyle]}>
				{label ? (
					<Text
						contentDescription={null}
						accessibilityLabel={null}
						style={[
							styles.label,
							{ color: themes[theme].titleText }
						]}
					>
						{label}
					</Text>
				) : null}
				<DateTimePicker
					style={{width: 90}}
					mode={type}
					is24Hour={true}
					display='default'
					minimumDate={minimumDate}
					value={currentDate??new Date()}
					onChange={onChange}
					textColor={'black'}
					themeVariant={'light'}
				/>
			</View>
		);
	}

	let button = (
		<TouchableOpacity
			style={[styles.input, {borderColor: themes[theme].separatorColor}]}
			onPress={() => onShow(!show)}
		>
			<Text>{currentDate?moment(currentDate).format(type==='date'?DATE_STRING_FORMAT:TIME_STRING_FORMAT):placeholder}</Text>
		</TouchableOpacity>
	);

	const content = show ? (
		<DateTimePicker
			style={style}
			mode={type}
			display='default'
			minimumDate={minimumDate}
			value={currentDate??new Date()}
			onChange={onChange}
			textColor={'black'}
		/>
	) : null;

	return (
		<View style={[styles.inputContainer, containerStyle]}>
			{label ? (
				<Text
					contentDescription={null}
					accessibilityLabel={null}
					style={[
						styles.label,
						{ color: themes[theme].titleText }
					]}
				>
					{label}
				</Text>
			) : null}
			{button}
			{content}
		</View>
	);
};

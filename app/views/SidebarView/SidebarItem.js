import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { RectButton } from 'react-native-gesture-handler';
import LinearGradient from "react-native-linear-gradient";

import styles from './styles';
import {COLOR_BUTTON_PRIMARY, COLOR_BUTTON_PRIMARY_LIGHT} from "../../constants/colors";

const Item = React.memo(({
	id, left, text, onPress, current, bottom
}) => {
	if(bottom){
		return (
			<LinearGradient
				colors={[COLOR_BUTTON_PRIMARY_LIGHT, COLOR_BUTTON_PRIMARY]}>
				<RectButton
					key={id}
					onPress={onPress}
					underlayColor='#292E35'
					activeOpacity={0.1}
					style={[styles.item, current && styles.itemCurrent]}
				>
					<View style={styles.itemLeft}>
						{left}
					</View>

					<View style={styles.itemCenter}>
						<Text style={[styles.itemText, {color: 'white'}]} numberOfLines={2} ellipsizeMode={'tail'}>
							{text}
						</Text>
					</View>
				</RectButton>
			</LinearGradient>
		);
	}
	return (
		<View style={styles.menuItem}>
			<RectButton
				key={id}
				onPress={onPress}
				underlayColor='#292E35'
				activeOpacity={0.1}
				style={[styles.item, current && styles.itemCurrent]}
			>
				<View style={styles.itemLeft}>
					{left}
				</View>

				<View style={styles.itemCenter}>
					<Text style={[styles.itemText, {color: COLOR_BUTTON_PRIMARY}]} numberOfLines={2} ellipsizeMode={'tail'}>
						{text}
					</Text>
				</View>
			</RectButton>
		</View>
	);
});

Item.propTypes = {
	left: PropTypes.element,
	text: PropTypes.string,
	current: PropTypes.bool,
	onPress: PropTypes.func,
	testID: PropTypes.string,
	bottom: PropTypes.bool,
	showSort: PropTypes.bool
};

export default Item;

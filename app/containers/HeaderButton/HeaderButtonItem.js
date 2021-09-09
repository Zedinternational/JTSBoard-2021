import React from 'react';
import {Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import { withTheme } from '../../theme';
import { themes } from '../../constants/colors';
import sharedStyles from '../../views/Styles';
import {VectorIcon} from "../VectorIcon";

export const BUTTON_HIT_SLOP = {
	top: 5, right: 5, bottom: 5, left: 5
};

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 8
	},
	title: {
		...Platform.select({
			android: {
				fontSize: 14
			},
			default: {
				fontSize: 17
			}
		}),
		...sharedStyles.textRegular
	},
	icon: {
		padding: 4
	}
});

const Item = ({
	title, titleStyle, iconName, onPress, testID, theme, badge, vector, size
}) => (
	<TouchableOpacity onPress={onPress} testID={testID} hitSlop={BUTTON_HIT_SLOP} style={styles.container}>
		<>
			{
				iconName
					? <VectorIcon type={vector} name={iconName} size={size??24} color={titleStyle ? themes[theme].headerTitleColor : themes[theme].headerTintColor} />
					: <Text style={[styles.title, { color: themes[theme].headerTintColor }]}>{title}</Text>
			}
			{badge ? badge() : null}
		</>
	</TouchableOpacity>
);

Item.propTypes = {
	onPress: PropTypes.func.isRequired,
	title: PropTypes.string,
	titleStyle: PropTypes.bool,
	vector: PropTypes.string,
	size: PropTypes.number,
	iconName: PropTypes.string,
	testID: PropTypes.string,
	theme: PropTypes.string,
	badge: PropTypes.func
};

Item.displayName = 'HeaderButton.Item';

export default withTheme(Item);

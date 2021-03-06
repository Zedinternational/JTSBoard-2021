import React from 'react';
import {
	View, Text, StyleSheet, ActivityIndicator, Image
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StatusBar from '../containers/StatusBar';
import { withTheme } from '../theme';
import { themes } from '../constants/colors';

import sharedStyles from './Styles';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		height: 200,
		width: 200,
		resizeMode: 'contain'
	},
	text: {
		fontSize: 16,
		paddingTop: 10,
		...sharedStyles.textRegular,
		...sharedStyles.textAlignCenter
	}
});

const AuthLoadingView = React.memo(({ theme, text }) => (
	<View style={[styles.container, { backgroundColor: themes[theme].backgroundColor }]}>
		<StatusBar />
		{text && (
			<>
				<Image source={{uri: 'logo_square'}} style={styles.logo}/>
				<ActivityIndicator color={themes[theme].auxiliaryText} size='large' />
				<Text style={[styles.text, { color: themes[theme].bodyText }]}>{`${ text }`}</Text>
			</>
		)}
	</View>
));

const mapStateToProps = state => ({
	text: state.app.text
});

AuthLoadingView.propTypes = {
	theme: PropTypes.string,
	text: PropTypes.string
};

export default connect(mapStateToProps)(withTheme(AuthLoadingView));

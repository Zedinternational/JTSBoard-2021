import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ThemeContext } from '../theme';
import {
	outsideHeader, themedHeader, StackAnimation, ModalAnimation
} from '../utils/navigation';

// Outside Stack
import SignInView from '../views/SignInView';
import SignUpView from '../views/SignUpView';

// Outside
const Outside = createStackNavigator();
const OutsideStack = () => {
	const { theme } = React.useContext(ThemeContext);

	return (
		<Outside.Navigator screenOptions={{ ...outsideHeader, ...themedHeader(theme), ...StackAnimation }}>
			<Outside.Screen
				name='SignInView'
				component={SignInView}
				options={SignInView.navigationOptions}
			/>
			<Outside.Screen
				name='SignUpView'
				component={SignUpView}
				options={SignUpView.navigationOptions}
			/>
		</Outside.Navigator>
	);
};

// OutsideStackModal
const OutsideModal = createStackNavigator();
const OutsideStackModal = () => {
	const { theme } = React.useContext(ThemeContext);

	return (
		<OutsideModal.Navigator mode='modal' screenOptions={{ ...outsideHeader, ...themedHeader(theme), ...ModalAnimation }}>
			<OutsideModal.Screen
				name='OutsideStack'
				component={OutsideStack}
				options={{ headerShown: false }}
			/>
		</OutsideModal.Navigator>
	);
};

export default OutsideStackModal;

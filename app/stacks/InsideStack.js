import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ThemeContext } from '../theme';
import {
	outsideHeader, themedHeader, StackAnimation
} from '../utils/navigation';
import {createDrawerNavigator} from "@react-navigation/drawer";

import SidebarView from "../views/SidebarView";
import HomeView from "../views/HomeView";
import CustomerFormView from "../views/CustomerFormView";


// Outside
const Inside = createStackNavigator();
const InsideStack = () => {
	const { theme } = React.useContext(ThemeContext);

	return (
		<Inside.Navigator screenOptions={{ ...outsideHeader, ...themedHeader(theme), ...StackAnimation }}>
			<Inside.Screen
				name='Home'
				component={HomeView}
				options={HomeView.navigationOptions}
			/>
			<Inside.Screen
				name='CustomerForm'
				component={CustomerFormView}
				options={CustomerFormView.navigationOptions}
			/>
		</Inside.Navigator>
	);
};

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => (
	<Drawer.Navigator
		drawerContent={({ navigation, state }) => <SidebarView navigation={navigation} state={state} />}
		screenOptions={{ swipeEnabled: true }}
		drawerType='back'
	>
		<Drawer.Screen name='InsideStack' component={InsideStack} />
	</Drawer.Navigator>
)

export default DrawerNavigator;

import React from 'react';
import PropTypes from "prop-types";
import {Image, ImageBackground, ScrollView, Text, View} from "react-native";
import {connect} from "react-redux";

import {themes} from "../../constants/colors";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import styles from "./styles";
import images from "../../assets/images";
import SidebarItem from "./SidebarItem";
import scrollPersistTaps from "../../utils/scrollPersistTaps";
import {logout as logoutAction} from "../../actions/login";
import {showConfirmationAlert} from "../../lib/info";
import I18n from '../../i18n';
import sharedStyles from "../Styles";


class SidebarView extends React.Component{

    static propTypes = {
        logout: PropTypes.func,
        user: PropTypes.object,
        theme: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {

        }

        this.menus = [
            {
                id: 'profile',
                name: I18n.t('My_Shop'),
                icon: images.profile_unselected,
                route: 'profile',
            },
        ]
    }

    onClick = (item) => {
        if (item.route) {
            const {navigation} = this.props;
            navigation.navigate(item.route);
        }
    };

    onLogOut = () => {
        const {logout} = this.props;
        showConfirmationAlert({
            title: 'Log Out',
            message: 'Are you sure you want to log out?',
            callToAction: 'Confirm',
            onPress: () => logout()
        });
    }

    render(){
        const {user, theme} = this.props;
        return (
            <SafeAreaView style={{ backgroundColor: themes[theme].backgroundColor }}>
                <StatusBar/>
                <View style={[sharedStyles.headerContainer, {height: 120}]}>
                    <Image style={styles.logo} source={images.logo}/>
                </View>
                <ScrollView style={{flexGrow: 1}} {...scrollPersistTaps}>
                    {
                        this.menus.map(m => (
                            <SidebarItem
                                id={`sidebar-view-key-${m.id}`}
                                text={m.name}
                                left={(
                                    <Image
                                        source={m.icon}
                                        style={styles.menuIcon}
                                    />
                                )}
                                onPress={() => this.onClick(m)}
                                current={false}
                            />
                        ))
                    }
                </ScrollView>
                <SidebarItem
                    id={`sidebar-view-key-logout`}
                    text={I18n.t('Log_Out')}
                    left={(
                        <Image
                            source={images.signout}
                            style={styles.bottomMenuIcon}
                        />
                    )}
                    bottom
                    onPress={this.onLogOut}
                    current={false}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})

const mapDispatchToProps = dispatch => ({
    logout: params => dispatch(logoutAction(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SidebarView));

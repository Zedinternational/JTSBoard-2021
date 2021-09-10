import React from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {themes} from "../../constants/colors";
import StatusBar from "../../containers/StatusBar";
import SafeAreaView from "../../containers/SafeAreaView";
import {withTheme} from "../../theme";
import {withDimensions} from "../../dimensions";
import styles from "./styles";
import images from "../../assets/images";
import sharedStyles from "../Styles";
import * as HeaderButton from "../../containers/HeaderButton";
import {GradientHeader} from "../../containers/GradientHeader";

class HomeView extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: 'JTSBoard 管理者',
        headerBackground: () => <GradientHeader/>,
        headerLeft: () => <HeaderButton.Drawer navigation={navigation} testID='rooms-list-view-sidebar' />,
    })

    static propTypes = {
        user: PropTypes.object,
        theme: PropTypes.string,
        width: PropTypes.number,
    }

    constructor(props) {
        super(props);

        this.mounted = false;
        this.state = {
        }
    }

    componentDidMount() {
        this.mounted = true;
    }

    goTo = (route) => {
        const {navigation} = this.props;
        navigation.push(route);
    }

    render() {
        const {theme} = this.props;

        return (
            <SafeAreaView style={{backgroundColor: themes[theme].backgroundColor}}>
                <StatusBar/>
                <View style={[sharedStyles.headerContainer, {height: 300}]}>
                    <Image style={styles.logo} source={images.jts_board_produced}/>
                </View>
                <View style={styles.menusContainer}>
                    <View style={styles.memusRow}>
                        <TouchableOpacity onPress={() => this.goTo('CustomerForm')} style={[styles.menuContainer, styles.borderBottom]}>
                            <Image style={styles.menuImage} source={images.menu_form}/>
                            <Text style={styles.menuText}>アンケートフォーム</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.goTo('CustomerDetail')} style={[styles.menuContainer, styles.borderHorizontal, styles.borderBottom]}>
                            <Image style={styles.menuImage} source={images.menu_calendar}/>
                            <Text style={styles.menuText}>カレンダー</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.goTo('CustomerList')} style={[styles.menuContainer, styles.borderBottom]}>
                            <Image style={styles.menuImage} source={images.menu_customers}/>
                            <Text style={styles.menuText}>顧客情報</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.memusRow}>
                        <TouchableOpacity onPress={() => this.goTo()} style={styles.menuContainer}>
                            <Image style={styles.menuImage} source={images.menu_sales}/>
                            <Text style={styles.menuText}>売上</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.goTo()} style={[styles.menuContainer, styles.borderHorizontal]}>
                            <Image style={styles.menuImage} source={images.menu_expenses}/>
                            <Text style={styles.menuText}>経費</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.goTo()} style={styles.menuContainer}>
                            <Image style={styles.menuImage} source={images.menu_attendance}/>
                            <Text style={styles.menuText}>出勤 退勤</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})

export default connect(mapStateToProps, null)(withTheme(withDimensions(HomeView)));

import React, { Component } from 'react';
import {connect} from "react-redux";
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import SafeAreaView from "../../containers/SafeAreaView";
import {GradientHeader} from "../../containers/GradientHeader";
import images from "../../assets/images";
import styles from "./styles";
import {uploadImageAction} from "../../utils/uploadImage";
import {withTheme} from "../../theme";
import {themes} from "../../constants/colors";
import InfoTabPage from "./components/InfoTabPage";
import StatusBar from "../../containers/StatusBar";
import sharedStyles from "../Styles";

export const TabMenu = React.memo(({label, onClick, active, theme}) => (
    <TouchableOpacity onPress={onClick} style={styles.menuContainer} activeOpacity={0.8}>
        <View
            style={[styles.tabMenuContainer, active?{backgroundColor: themes[theme].activeBackgroundColor}:{backgroundColor: themes[theme].inactiveBackgroundColor}]}
        >
            <Text style={styles.tabLabel}>{label}</Text>
        </View>
    </TouchableOpacity>
));

class MyShopScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: '基本設定',
        headerBackground: () => <GradientHeader/>,
    })

    constructor(props) {
        super(props);
        this.state = {
            cur_tab: 'info',
            image_path: null,
            image_path1: null,
            image_path2: null,
            email: '',
            password: '',
            visible: false,
            myShopModalVisible: false,
            myShopPickerModal: false
        };

        this.tabs = [
            {id: 'info', title: 'サロン情報'},
            {id: 'employee', title: '従業員'},
            {id: 'ticket', title: 'チケット'},
        ];
    }


    setUploadImage = (key, imagePath) => {
        switch (key){
            case 'image':
                this.setState({image_path: imagePath});
                break;
            case 'image1':
                this.setState({image_path1: imagePath});
                break;
            case 'image2':
                this.setState({image_path2: imagePath});
                break;
        }
    }

    onUploadImage = (upload_key) => {
        uploadImageAction((image) => this.setUploadImage(upload_key, image.path), (image) => this.setUploadImage(upload_key, image.path));
    }

    render() {
        const {cur_tab, image_path, image_path1, image_path2} = this.state;
        const { user, theme } = this.props;

        return (
            <View
                style={[{ backgroundColor: themes[theme].backgroundColor}, sharedStyles.container]}
            >
                <StatusBar/>
                <SafeAreaView>
                    <View style={styles.infoContainer}>
                        <TouchableOpacity onPress={() => this.onUploadImage('image')}>
                            <Image
                                source={image_path?{uri: image_path}:(user.image?{uri: user.image}:images.placeholder)}
                                style={styles.userImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onUploadImage('image1')}>
                            <Image
                                source={image_path1?{uri: image_path}:(user.image1?{uri: user.image1}:images.placeholder)}
                                style={styles.userImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onUploadImage('image2')}>
                            <Image
                                source={image_path2?{uri: image_path}:(user.image2?{uri: user.image2}:images.placeholder)}
                                style={styles.userImage}
                            />
                        </TouchableOpacity>
                        <View style={styles.description}>
                            <Text style={{ color: themes[theme].bodyText }}>ようこそ</Text>
                            <Text style={{ color: themes[theme].bodyText, marginTop: 10 }}>{user.name}</Text>
                        </View>
                    </View>
                    <View style={styles.tabsContainer}>
                        {
                            this.tabs.map(t => <TabMenu
                                key={t.id}
                                label={t.title}
                                onClick={() => this.setState({cur_tab: t.id})}
                                active={this.state.cur_tab === t.id}
                                theme={theme}/>)
                        }
                    </View>
                    {
                        cur_tab === 'info' && <InfoTabPage />
                    }
                    {
                        cur_tab === 'employee' && <InfoTabPage />
                    }
                    {
                        cur_tab === 'ticket' && <InfoTabPage />
                    }
                </SafeAreaView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})

export default connect(mapStateToProps, null)(withTheme(MyShopScreen));

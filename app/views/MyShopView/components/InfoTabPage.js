import React, {Component} from "react";
import {Image, Modal, ScrollView, Text, TouchableOpacity, View} from "react-native";
import images from "../../../assets/images";
import styles from "../styles.js";
import MyShopUpdateFieldPop from "./MyShopUpdateFieldPop";
import {connect} from "react-redux";
import {withTheme} from "../../../theme";
import MyShopUpdateAddressPop from "./MyShopUpdateAddressPop";
import MyShopPinCodePop from "./MyShopPinCodePop";
import MyShopSalonTypePop from "./MyShopSalonTypePop";
import MyShopAdvertisementPop from "./MyShopAdvertisementPop";

export const InputFieldColumn = React.memo(({leftIcon, label, onEdit, containerStyle}) => (
    <View style={[{ flexDirection: 'row' }, containerStyle]}>
        <Image
            source={leftIcon}
            style={styles.inputImage}
        />

        <Text style={styles.inputLabel}>{label}</Text>

        <TouchableOpacity onPress={() => onEdit()} style={styles.editIconContainer}>
            <Image
                source={images.edit_gray}
                style={styles.inputEditIcon}
            />
        </TouchableOpacity>
    </View>
))

export const DateFieldColumn = React.memo(({leftIcon, onEdit, containerStyle}) => (
    <View style={[{ flexDirection: 'row' }, containerStyle]}>
        <Image
            source={leftIcon}
            style={styles.inputImage}
        />
        <View style={styles.inputContent}>
            <View style={{ flexDirection: 'row', width: '100%', height: 40, marginTop: 5 }}>
                <Text style={{ marginLeft: 12, color: 'gray' }}>月</Text>
                <Text style={{ marginLeft: 48, color: 'gray' }}>9:28 - 16:28</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: 40, marginTop: 5 }}>
                <Text style={{ marginLeft: 12, color: 'gray' }}>火</Text>
                <Text style={{ marginLeft: 48, color: 'gray' }}>9:28 - 16:28</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: 40, marginTop: 5 }}>
                <Text style={{ marginLeft: 12, color: 'gray' }}>水</Text>
                <Text style={{ marginLeft: 48, color: 'gray' }}>9:28 - 16:28</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: 40, marginTop: 5 }}>
                <Text style={{ marginLeft: 12, color: 'gray' }}>木</Text>
                <Text style={{ marginLeft: 48, color: 'gray' }}>9:28 - 16:28</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: 40, marginTop: 5 }}>
                <Text style={{ marginLeft: 12, color: 'gray' }}>金</Text>
                <Text style={{ marginLeft: 48, color: 'gray' }}>9:28 - 16:28</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: 40, marginTop: 5 }}>
                <Text style={{ marginLeft: 12, color: 'gray' }}>土</Text>
                <Text style={{ marginLeft: 48, color: 'gray' }}>9:28 - 16:28</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: 40, marginTop: 5 }}>
                <Text style={{ marginLeft: 12, color: 'gray' }}>日</Text>
                <Text style={{ marginLeft: 48, color: 'gray' }}>9:28 - 16:28</Text>
            </View>
        </View>
        <TouchableOpacity onPress={() => onEdit()} style={styles.editIconContainer}>
            <Image
                source={images.edit_gray}
                style={styles.inputEditIcon}
            />
        </TouchableOpacity>
    </View>
))

class InfoTabPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            editModalVisible: false,
            editAddressModalVisible: false,
            editPinModalVisible: false,
            editSalonTypeModalVisible: false,
            editAdvertisementModalVisible: false,
            updateField: null,
        }
    }

    onEditField = (key, value = null) => {
        this.setState({ editModalVisible: true, updateField: key, updateValue: value });
    }

    onEditAddressField = () => {
        this.setState({ editAddressModalVisible: true });
    }

    onEditPinField = () => {
        this.setState({ editPinModalVisible: true });
    }

    onEditSalonTypeField = () => {
        this.setState({ editSalonTypeModalVisible: true });
    }

    onEditAdvertisementField = () => {
        this.setState({ editAdvertisementModalVisible: true });
    }

    btnShopPicker = () => {
        this.setState({ myShopPickerModal: true });
        console.warn('In Toggle method ', this.state.myShopModalVisible);
    }

    onCloseModal = () => {
        this.setState({ editModalVisible: false, updateField: null });
    }

    render() {
        const { user } = this.props;
        const address = (user.zip_code.length?`${user.zip_code}, `:'') + (user.prefecture.length?`${user.prefecture}, `:'') + (user.city.length?`${user.city}, `:'') + (user.address1.length?`${user.address1}, `:'') + (user.address2.length?`${user.address2}`:'');

        return (
            <ScrollView style={styles.tabPageContainer}>
                <Text style={styles.tabPageTitle}>サロン情報</Text>
                <View style={styles.tabPageDivider}/>
                <View style={styles.pageRow}>
                    <InputFieldColumn label={user.name.length?user.name:'代表名'} containerStyle={styles.columnStyle} leftIcon={images.owner_name_gradiant} onEdit={() => this.onEditField('name', user.name)}/>
                    <InputFieldColumn label={user.description.length?user.description:'説明'} containerStyle={styles.columnStyle} leftIcon={images.description} onEdit={() => this.onEditField('description', user.description)}/>
                </View>
                <View style={styles.pageRow}>
                    <InputFieldColumn label={user.company_name.length?user.company_name:'会社名'} containerStyle={styles.columnStyle} leftIcon={images.company_gradiant} onEdit={() => this.onEditField('company_name', user.company_name)}/>
                    <InputFieldColumn label={address.length?address:'サロン住所'} containerStyle={styles.columnStyle} leftIcon={images.address} onEdit={() => this.onEditAddressField()}/>
                </View>
                <View style={styles.pageRow}>
                    <InputFieldColumn label={user.email??'メール'} containerStyle={styles.columnStyle} leftIcon={images.email_gradiant} onEdit={() => this.onEditField('email')}/>
                    <InputFieldColumn label={user.salon_name.length?user.salon_name:'サロン名'} containerStyle={styles.columnStyle} leftIcon={images.salon_name_gradiant} onEdit={() => this.onEditField('salon_name', user.salon_name)}/>
                </View>
                <View style={styles.pageRow}>
                    <InputFieldColumn label={user.website.length?user.website:'ホームページのURL'} containerStyle={styles.columnStyle} leftIcon={images.website_gradiant} onEdit={() => this.onEditField('website')}/>
                    <InputFieldColumn label={user.tel.length?user.tel:'電話番号'} containerStyle={styles.columnStyle} leftIcon={images.phone_gradiant} onEdit={() => this.onEditField('tel')}/>
                </View>
                <View style={styles.pageRow}>
                    <InputFieldColumn label={'使用している広告'} containerStyle={styles.columnStyle} leftIcon={images.using_app} onEdit={() => this.onEditAdvertisementField()}/>
                    <InputFieldColumn label={'サービスを選択'} containerStyle={styles.columnStyle} leftIcon={images.service_gradiant} onEdit={() => this.onEditField('service')}/>
                </View>
                <View style={styles.pageRow}>
                    <DateFieldColumn containerStyle={styles.columnStyle} leftIcon={images.using_app} onEdit={() => this.onEditField('time')}/>
                    <View style={styles.columnStyle}>
                        <InputFieldColumn label={'PINコード'} containerStyle={styles.columnRowStyle} leftIcon={images.pin_code_gradaint} onEdit={() => this.onEditPinField()}/>
                        <InputFieldColumn label={'夏季冬季休暇等'} containerStyle={styles.columnRowStyle} leftIcon={images.holiday_date_gradiant} onEdit={() => this.onEditField('holiday_date')}/>
                        <InputFieldColumn label={'締め日'} containerStyle={styles.columnRowStyle} leftIcon={images.end_date_gradiant} onEdit={() => this.onEditField('end_date')}/>
                        <InputFieldColumn label={'残業代の計算単位'} containerStyle={styles.columnRowStyle} leftIcon={images.overtime_time_gradiant} onEdit={() => this.onEditField('overtime_time')}/>
                    </View>
                </View>
                <View style={styles.pageRow}>
                    <InputFieldColumn label={'サロンのこだわり'} containerStyle={styles.columnStyle} leftIcon={images.salon_commitment} onEdit={() => this.onEditSalonTypeField()}/>
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.state.editModalVisible}
                >
                    <View style={styles.container1}>
                        <MyShopUpdateFieldPop
                            onClose={this.onCloseModal}
                            field={this.state.updateField}
                            value={this.state.updateValue}
                        />
                    </View>
                </Modal>
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.state.editAddressModalVisible}
                >
                    <View style={styles.container1}>
                        <MyShopUpdateAddressPop
                            onClose={() => this.setState({ editAddressModalVisible: false })}
                        />
                    </View>
                </Modal>
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.state.editPinModalVisible}
                >
                    <View style={styles.container1}>
                        <MyShopPinCodePop
                            onClose={() => this.setState({ editPinModalVisible: false })}
                        />
                    </View>
                </Modal>
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.state.editSalonTypeModalVisible}
                >
                    <View style={styles.container1}>
                        <MyShopSalonTypePop
                            onClose={() => this.setState({ editSalonTypeModalVisible: false })}
                        />
                    </View>
                </Modal>
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.state.editAdvertisementModalVisible}
                >
                    <View style={styles.container1}>
                        <MyShopAdvertisementPop
                            onClose={() => this.setState({ editAdvertisementModalVisible: false })}
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    user: state.login.user
})

export default connect(mapStateToProps, null)(withTheme(InfoTabPage));

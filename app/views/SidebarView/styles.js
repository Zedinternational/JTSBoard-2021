import { StyleSheet } from "react-native";

export default StyleSheet.create({
    logo: {
        width: 240,
        height: 60,
    },
    profileName: {
        marginTop: 12,
        color: 'white'
    },
    menuIcon: {
        width: 24,
        height: 24,
        tintColor: '#997D1EFF'
    },
    bottomMenuIcon: {
        width: 24,
        height: 24,
        tintColor: 'white'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4
    },
    itemCurrent: {
        backgroundColor: '#5c78a7'
    },
    menuItem: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 5,
        borderColor: '#997D1EFF'
    },
    itemLeft: {
        marginHorizontal: 10,
        width: 30,
        alignItems: 'center'
    },
    itemCenter: {
        flex: 1
    },
    itemText: {
        marginVertical: 16,
        color: 'black',
        fontSize: 20
    },
});

import {StyleSheet} from "react-native";

export default StyleSheet.create({
    userImage:
        {
            width: 72,
            height: 72,
            marginLeft: 16,
            marginTop: 4
        },
    container1: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    },
    infoContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 80,
        backgroundColor: '#F5F5F5',
        marginTop: 10
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 40,
        marginVertical: 10
    },
    menuContainer: {
        width: '33%',
        paddingHorizontal: 12
    },
    tabMenuContainer: {
        height: 40,
        borderRadius: 5,
        shadowColor: 'gray',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.9,
        shadowRadius: 3.84,
        elevation: 5
    },
    tabLabel: {
        textAlign: 'center',
        marginTop: 10,
        color: 'white',
        fontSize: 12
    },
    description: {
        marginTop: 14,
        marginLeft: 15,
    },
    tabPageContainer: {
        marginBottom: 20
    },
    tabPageTitle: {
        fontSize: 18,
        marginTop: 22,
        marginLeft: 20
    },
    tabPageDivider: {
        width: '96%',
        height: 0.5,
        backgroundColor: 'black',
        marginTop: 18,
        alignSelf: 'center'
    },
    pageRow: {
        flexDirection: 'row',
        marginVertical: 8
    },
    columnStyle: {
        width: '50%'
    },
    columnRowStyle: {
        marginBottom: 16,
    },
    inputImage: {
        width: 32,
        height: 32,
        marginLeft: 20,
        marginTop: 10
    },
    inputContent: {
        marginTop: 12,
        flexGrow: 1,
    },
    inputLabel: {
        flexGrow: 1,
        marginLeft: 12,
        marginTop: 15,
        color: 'gray'
    },
    editIconContainer: {
        marginRight: 20
    },
    inputEditIcon: {
        width: 28,
        height: 28,
        alignSelf: 'center',
        marginTop: 14
    }
});

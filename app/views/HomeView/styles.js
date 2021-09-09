import { StyleSheet } from "react-native";

export default StyleSheet.create({
    logo: {
        width: 540,
        height: 170
    },
    menusContainer: {
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    memusRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    menuContainer: {
        width: 200,
        alignItems: 'center',
        padding: 16
    },
    menuText: {
        textAlign: 'center',
        paddingVertical: 16,
        fontSize: 18,
        color: 'grey'
    },
    menuImage: {
        width: 80,
        height: 80
    },
    borderBottom: {
        borderBottomWidth: 2,
        borderColor: '#c9a632'
    },
    borderHorizontal: {
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: '#c9a632'
    }
});

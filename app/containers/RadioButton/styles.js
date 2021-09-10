import { StyleSheet } from "react-native";
import sharedStyles from "../../views/Styles";
import {isTablet} from "../../utils/deviceInfo";

export default StyleSheet.create({
    radioContainer: {
        marginBottom: isTablet?20:10
    },

    radioForm: {

    },
    radioWrap: {
        flexDirection: 'row',
        marginBottom: 5,
    },

    radioItemContainer: {
        marginRight: 16
    },

    radio: {
        justifyContent: 'center',
        alignItems: 'center',

        width: 30,
        height: 30,


        alignSelf: 'center',

        borderColor: '#2196f3',
        borderRadius: 30,
    },

    radioLabel: {
        paddingLeft: 10,
        lineHeight: 20,
    },

    radioNormal: {
        borderRadius: 10,
    },

    radioActive: {
        width: 20,
        height: 20,
        backgroundColor: '#2196f3',
    },

    labelWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },

    labelVerticalWrap: {
        flexDirection: 'column',
        paddingLeft: 10,
    },

    labelVertical: {
        paddingLeft: 0,
    },

    formHorizontal: {
        flexDirection: 'row',
    },

    label: {
        marginBottom: 16,
        fontSize: 14,
        ...sharedStyles.textSemibold
    },
})

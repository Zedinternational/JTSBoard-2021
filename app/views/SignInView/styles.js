import { StyleSheet } from "react-native";
import {isTablet} from "../../utils/deviceInfo";

export default StyleSheet.create({
    logo: {
        width: 380,
        height: 120
    },
    formContainer: {
        flex: 1,
        paddingVertical: 16,
        paddingHorizontal: 18,
    },
    submitBtn: {
        marginTop: isTablet?16:8,
        paddingVertical: 2,
        alignSelf: 'center'
    },
    forgotContainer: {
        marginTop: 20
    },
    forgotText: {
        textAlign: 'right',
        marginRight: 60,
        fontSize: 20
    },
    oauthContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20
    }
});

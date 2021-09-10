import { StyleSheet } from "react-native";

export default StyleSheet.create({
    formContainer: {
        flexGrow: 1,
        paddingVertical: 16,
        paddingHorizontal: 18,
    },
    formRow: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%'
    },
    inputContainer: {
        width: '50%',
        paddingHorizontal: 8
    },
    inputFullContainer: {
        width: '100%',
        paddingHorizontal: 8
    },
    submitBtn: {
        marginTop: 8,
        paddingVertical: 2,
        alignSelf: 'center'
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    }
});

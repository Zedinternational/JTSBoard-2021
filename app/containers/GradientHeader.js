import React from "react";
import LinearGradient from "react-native-linear-gradient";
import {COLOR_BUTTON_PRIMARY, COLOR_BUTTON_PRIMARY_LIGHT} from "../constants/colors";

export const GradientHeader = () => (
    <LinearGradient
        colors={[COLOR_BUTTON_PRIMARY_LIGHT, COLOR_BUTTON_PRIMARY]}
        style={{flex: 1}}
    />
)

import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    LayoutAnimation,
    Platform,
    UIManager
} from 'react-native';
import styles from './styles.js'
import {themes} from "../../constants/colors";

export default class RadioForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_active_index: props.initial
        }
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        this._renderButton = this._renderButton.bind(this);
    }
    static defaultProps = {
        radio_props: [],
        initial: 0,
        buttonColor: '#2196f3',
        selectedButtonColor: '#2196f3',
        formHorizontal: false,
        labelHorizontal: true,
        animation: true,
        labelColor: '#000',
        selectedLabelColor: '#000',
        wrapStyle: {},
        disabled: false
    }

    updateIsActiveIndex(index) {
        this.setState({ is_active_index: index });
        this.props.onPress(this.props.radio_props[index], index)
    }

    //This function is for clear the selection when we are using the library in multiple choice questions
    clearSelection(){
        this.setState({is_active_index:-1});
    }

    _renderButton(obj, i) {
        return (
            <RadioButton
                accessible={this.props.accessible}
                accessibilityLabel={(this.props.accessibilityLabel)
                    ? (this.props.accessibilityLabel + '|' + i) : ('radioButton' + '|' + i)}
                testID={(this.props.testID)
                    ? (this.props.testID + '|' + i) : ('radioButton' + '|' + i)}
                isSelected={this.state.is_active_index === i}
                obj={obj}
                key={i}
                index={i}
                buttonColor={this.state.is_active_index === i ? this.props.selectedButtonColor : this.props.buttonColor}
                buttonSize={this.props.buttonSize}
                buttonOuterSize={this.props.buttonOuterSize}
                labelHorizontal={this.props.labelHorizontal}
                labelColor={this.state.is_active_index === i ? this.props.selectedLabelColor : this.props.labelColor}
                labelStyle={this.props.labelStyle}
                style={this.props.radioStyle}
                animation={this.props.animation}
                disabled={this.props.disabled}
                onPress={(value, index) => {
                    this.props.onPress(value, index)
                    this.setState({is_active_index: index})
                }}
            />
        )
    }

    render() {
        let render_content = false
        const {containerStyle, theme} = this.props;

        if (this.props.radio_props.length) {
            render_content = this.props.radio_props.map(this._renderButton)
        } else {
            render_content = this.props.children
        }
        return (
            <View style={[styles.radioContainer, containerStyle]}>
                {this.props.label ? (
                        <Text
                            contentDescription={null}
                            accessibilityLabel={null}
                            style={[
                                styles.label,
                                { color: themes[theme].titleText }
                            ]}
                        >
                            {this.props.label}
                        </Text>
                    ) : null}
                <View style={[
                    this.props.style,
                    this.props.formHorizontal && styles.formHorizontal
                ]}>
                    {render_content}
                </View>
            </View>
        )
    }
}

export class RadioButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true
    }
    static defaultProps = {
        isSelected: false,
        buttonColor: '#2196f3',
        selectedButtonColor: '#2196f3',
        labelHorizontal: true,
        disabled: false,
        idSeparator: '|'
    }
    componentDidUpdate () {
        if (this.props.animation) {
            LayoutAnimation.spring()
        }
    }
    render () {
        let c = this.props.children

        let idSeparator = (this.props.idSeparator) ? this.props.idSeparator : '|'
        let idSeparatorAccessibilityLabelIndex = (this.props.accessibilityLabel)
            ? this.props.accessibilityLabel.indexOf(idSeparator) : -1
        let idSeparatorTestIdIndex = (this.props.testID)
            ? this.props.testID.indexOf(idSeparator) : -1

        let accessibilityLabel = (this.props.accessibilityLabel)
            ? (idSeparatorAccessibilityLabelIndex !== -1
                ? this.props.accessibilityLabel.substring(0, idSeparatorAccessibilityLabelIndex) : this.props.accessibilityLabel) : 'radioButton'
        let testID = (this.props.testID)
            ? (idSeparatorTestIdIndex !== -1
                ? this.props.testID.substring(0, idSeparatorTestIdIndex) : this.props.testID) : 'radioButton'

        let accessibilityLabelIndex = (this.props.accessibilityLabel && idSeparatorAccessibilityLabelIndex !== -1)
            ? this.props.accessibilityLabel.substring(idSeparatorAccessibilityLabelIndex + 1) : ''
        let testIDIndex = (this.props.testID && testIDIndex !== -1)
            ? this.props.testID.split(testIDIndex + 1) : ''

        let renderContent = false
        renderContent = c ? (
            <View style={[
                styles.radioWrap,
                this.props.style,
                !this.props.labelHorizontal && styles.labelVerticalWrap
            ]}>
                {c}
            </View>
        ) : (
            <View style={[
                styles.radioWrap,
                this.props.style,
                !this.props.labelHorizontal && styles.labelVerticalWrap
            ]}>
                <RadioButtonInput {...this.props}
                                  accessibilityLabel={accessibilityLabel + 'Input' + accessibilityLabelIndex}
                                  testID={testID + 'Input' + testIDIndex} />
                <RadioButtonLabel {...this.props}
                                  accessibilityLabel={accessibilityLabel + 'Label' + accessibilityLabelIndex}
                                  testID={testID + 'Label' + testIDIndex} />
            </View>
        )
        return (
            <View style={[this.props.wrapStyle, styles.radioItemContainer]}>
                {renderContent}
            </View>
        )
    }
}

export class RadioButtonInput extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isSelected: false,
            buttonColor: props.buttonColor || '#2196f3'
        }
    }
    render () {
        let innerSize = {width: 20, height:20, borderRadius: 20/2 }
        let outerSize = {width: 20+10, height:20+10, borderRadius: (20+10)/2 }
        if (this.props.buttonSize) {
            innerSize.width = this.props.buttonSize
            innerSize.height = this.props.buttonSize
            innerSize.borderRadius = this.props.buttonSize /2
            outerSize.width = this.props.buttonSize + 10
            outerSize.height = this.props.buttonSize + 10
            outerSize.borderRadius = (this.props.buttonSize + 10) / 2
        }
        if (this.props.buttonOuterSize) {
            outerSize.width = this.props.buttonOuterSize
            outerSize.height = this.props.buttonOuterSize
            outerSize.borderRadius = this.props.buttonOuterSize / 2
        }
        let outerColor = this.props.buttonOuterColor
        let borderWidth = this.props.borderWidth || 3
        let innerColor = this.props.buttonInnerColor
        if (this.props.buttonColor) {
            outerColor = this.props.buttonColor
            innerColor = this.props.buttonColor
        }
        let c = (
            <View style={[
                styles.radioNormal,
                this.props.isSelected && styles.radioActive,
                this.props.isSelected && innerSize,
                this.props.isSelected && {backgroundColor:innerColor}
            ]}/>
        )
        let radioStyle = [
            styles.radio,
            {
                borderColor:outerColor,
                borderWidth:borderWidth
            },
            this.props.buttonStyle,
            outerSize
        ]

        if (this.props.disabled) {
            return (
                <View style={this.props.buttonWrapStyle} >
                    <View style={radioStyle}>
                        {c}
                    </View>
                </View>
            )
        }

        return (
            <View style={this.props.buttonWrapStyle} >
                <TouchableOpacity
                    accessible={this.props.accessible}
                    accessibilityLabel={this.props.accessibilityLabel}
                    testID={this.props.testID}
                    style={radioStyle}
                    onPress={() => { this.props.onPress( this.props.obj.value, this.props.index) }
                    }>
                    {c}
                </TouchableOpacity>
            </View>
        )
    }
}

RadioButtonInput.defaultProps = {
    buttonInnerColor: '#2196f3',
    buttonOuterColor: '#2196f3',
    disabled: false
}

export class RadioButtonLabel extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isSelected: false,
            buttonColor: '#2196f3',
        }
    }
    render () {
        return (
            <TouchableWithoutFeedback
                accessible={this.props.accessible}
                accessibilityLabel={this.props.accessibilityLabel}
                testID={this.props.testID}
                onPress={() => {
                    if (!this.props.disabled) {
                        this.props.onPress( this.props.obj.value, this.props.index)}
                }
                }>
                <View style={[
                    this.props.labelWrapStyle,
                    styles.labelWrapStyle,
                ]} >
                    <Text style={[
                        styles.radioLabel,
                        !this.props.labelHorizontal && styles.labelVertical,
                        {color: this.props.labelColor},
                        this.props.labelStyle
                    ]}>{this.props.obj.label}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

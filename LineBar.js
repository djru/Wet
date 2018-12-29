import React from 'react'
import { View, Dimensions, Text, TouchableWithoutFeedback } from 'react-native'

export default class LineBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { touched: false }
    this.windowWidth = Dimensions.get('window').width
  }
  render() {
    return (
      <TouchableWithoutFeedback
        onPressIn={() => {
          this.setState({ touched: true })
        }}
        onPressOut={() => {
          this.setState({ touched: false })
        }}>
        <View
          style={{
            height:
              (this.props.height / this.props.max) *
              Dimensions.get('window').height *
              0.4,
            backgroundColor:
              'active' in this.props && this.props.active
                ? 'rgba(255, 255, 255, 0.6)'
                : 'rgba(255, 255, 255, 0.2)',
            marginLeft:
              this.windowWidth *
              ('first' in this.props && this.props.first ? 0.14 : 0.04),
            width: this.windowWidth * 0.02,
            marginRight: this.windowWidth * 0.04,
            alignSelf: 'flex-end',
            borderRadius: this.windowWidth / 0.01,
          }}>
          {this.state.touched || ('active' in this.props && this.props.active)
            ? [
                <Text
                  style={{
                    position: 'absolute',
                    top: -20,
                    width: this.windowWidth * 0.06,
                    left: -this.windowWidth * 0.02,
                    textAlign: 'center',
                    color: 'white',
                  }}
                  key={'height' + this.props.height}>
                  {this.props.height}
                </Text>,

                <Text
                  style={{
                    position: 'absolute',
                    bottom: -20,
                    width: this.windowWidth * 0.14,
                    left: -this.windowWidth * 0.06,
                    textAlign: 'center',
                    color: 'white',
                  }}
                  key={'time' + this.props.height}>
                  {new Date(this.props.time).getHours() + ':00'}
                </Text>,
              ]
            : null}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

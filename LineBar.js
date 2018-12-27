import React from 'react'
import { View, Dimensions, Text, TouchableWithoutFeedback } from 'react-native'

export default class LineBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { touched: false }
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
            height: this.props.height * 10,
            backgroundColor:
              'active' in this.props && this.props.active
                ? '#daffe0'
                : '#1783c1',
            marginLeft: Dimensions.get('window').width * 0.04,
            width: Dimensions.get('window').width * 0.02,
            marginRight: Dimensions.get('window').width * 0.04,
            alignSelf: 'flex-end',
            borderRadius: Dimensions.get('window').width / 0.01,
          }}>
          {this.state.touched || ('active' in this.props && this.props.active)
            ? [
                <Text
                  style={{
                    position: 'absolute',
                    top: -20,
                    width: Dimensions.get('window').width * 0.06,
                    left: -Dimensions.get('window').width * 0.02,
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
                    width: Dimensions.get('window').width * 0.14,
                    left: -Dimensions.get('window').width * 0.06,
                    textAlign: 'center',
                    color: 'white',
                  }}
                  key={'time' + this.props.height}>
                  {this.props.time}
                </Text>,
              ]
            : null}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

import React from 'react'
import LineBar from './LineBar.js'
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import { LinearGradient } from 'expo'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#2f2c5f', '#743f86', '#ebf4ff']}
          style={styles.gradient}>
          <Text style={styles.temp}>35°</Text>
          <ScrollView
            horizontal={true}
            snapToAlignment="center"
            snapToInterval={Dimensions.get('window').width * 0.1}
            decelerationRate={0}
            contentContainerStyle={styles.barsContainer}>
            {[
              [
                ...Array(30)
                  .slice(3)
                  .keys(),
              ].map(n => (
                <LineBar
                  height={n}
                  key={n}
                  active={n % 5 === 0}
                  time={n + ':00'}
                />
              )),
            ]}
          </ScrollView>
        </LinearGradient>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },
  temp: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 120,
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: Dimensions.get('window').width * 0.35,
    textAlign: 'center',
  },
  barsContainer: {
    flex: 0,
    alignSelf: 'flex-end',
    marginBottom: 40,
  },
  gradient: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

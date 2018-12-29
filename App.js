import React from 'react'
import LineBar from './LineBar.js'
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import { LinearGradient } from 'expo'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      is_scrolled: false,
      current: { temperature: '...', summary: 'loading' },
      current_view: 'temperature',
    }
    this.refToScrollView = React.createRef()
    this.windowWidth = Dimensions.get('window').width
  }

  getCurrentHour() {
    return new Date().getHours()
  }

  mapWeatherToColor(weather, hour) {
    if (hour > 18 || hour < 6) {
      if (weather === 'cloudy' || weather === 'clear') {
        return ['#040A13', '#180D2C']
      } else if (weather === 'rain') {
        return ['#164F91', '#040A13', '#180D2C']
      } else if (weather === 'snow') {
        return ['#CDCDCD', '#040A13', '#180D2C']
      }
    } else if (hour > 17 || hour < 7) {
      if (weather === 'clear') {
        return ['#2A244E', '#1A2358', '#823D33']
      }
      if (weather === 'cloudy') {
        return ['#2A244E', '#1A2358', '#2C2F42']
      } else if (weather === 'rain') {
        return ['#CDCDCD', '#2A244E', '#1A2358']
      } else if (weather === 'snow') {
        return ['#164F91', '#CDCDCD', '#2A244E']
      }
    } else if (hour > 16 || hour < 8) {
      if (weather === 'clear') {
        return ['#7353BC', '#F5BD74', '#FFF989']
      }
      if (weather === 'cloudy') {
        return ['#8474A7', '#D5D5D5', '#C5C5C5']
      } else if (weather === 'rain') {
        return ['#8474A7', '#96A0FA', '#585F9D']
      } else if (weather === 'snow') {
        return ['#E3E3E3', '#C2C4D3', '#8286A9']
      }
    } else {
      if (weather === 'clear') {
        return ['#FDFF84', '#99EFFF', '#3ED0FF']
      }
      if (weather === 'cloudy') {
        return ['#E4E9EA', '#95E5FF ']
      } else if (weather === 'rain') {
        return ['#E4E9EA', '#164F91']
      } else if (weather === 'snow') {
        return ['#E4E9EA', 'white', '#D1DCEA']
      }
    }
  }
  componentDidMount() {
    fetch(
      'https://api.darksky.net/forecast/c3620aee2cc2767871ebea8dc88f8b2a/37.8267,-122.4233',
    )
      .then(r => r.json())
      .then(resp => {
        this.setState({
          ...this.state,
          data: resp.hourly.data,
          current: resp.currently,
        })
      })
      .catch((r, e) => {
        console.log(r, e)
      })
  }
  render() {
    let max_val = Math.floor(
      Math.max(...this.state.data.map(d => d[this.state.current_view])),
    )
    console.log(this.state)
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={this.mapWeatherToColor('snow', this.getCurrentHour())}
          style={styles.gradient}>
          <View style={styles.data_container}>
            <Text style={styles.temp}>
              {Math.round(this.state.current[this.state.current_view])}
            </Text>
            <Text style={styles.weather}>{this.state.current.summary}</Text>
            <Text style={styles.location}>Chicago, IL</Text>
          </View>
          <ScrollView
            horizontal={true}
            snapToAlignment="start"
            snapToInterval={this.windowWidth * 0.1}
            decelerationRate={0}
            scrollEventThrottle={32}
            contentContainerStyle={styles.barsContainer}
            onScroll={e => {
              console.log(e)
              console.log('')
              // this.setState({
              //   ...this.state,
              //   is_scrolled:
              //     nativeEvent.contentOffset.x > this.windowWidth * 0.1,
              // })
            }}
            ref={this.refToScrollView}>
            {[
              this.state.data.map((d, i) => (
                <LineBar
                  height={Math.floor(d[this.state.current_view])}
                  max={max_val}
                  key={d[this.state.current_view] + d.time * 1000}
                  active={i === 0 || this.state.is_scrolled}
                  first={i === 0}
                  time={d.time * 1000}
                />
              )),
            ]}
          </ScrollView>
        </LinearGradient>
      </View>
    )
  }
}

let center_white = {
  textAlign: 'center',
  color: 'white',
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },
  data_container: {
    top: Dimensions.get('window').height * 0.15,
  },
  temp: {
    fontSize: 120,
    fontWeight: 'bold',
    ...center_white,
  },
  weather: {
    fontSize: 30,
    fontWeight: 'bold',
    ...center_white,
  },
  location: {
    fontSize: 20,
    ...center_white,
  },
  barsContainer: {
    flex: 0,
    alignSelf: 'flex-end',
    marginBottom: 60,
  },
  gradient: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

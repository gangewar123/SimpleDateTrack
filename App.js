import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';

import CircularSlider from 'react-native-circular-slider';
import TimerText from './timerText.js';

const DATE_ICON = (
  <G>
    <Path
      d="M2,12.9h1.7h3h2.7h3H14c0.4,0,0.7-0.3,0.7-0.7c0-0.4-0.3-0.7-0.7-0.7c-0.9,0-1.7-0.7-1.7-1.7v-4
      c0-2.1-1.5-3.8-3.4-4.2C9,1.6,9,1.4,9,1.3c0-0.5-0.4-1-1-1c-0.5,0-1,0.4-1,1c0,0.2,0,0.3,0.1,0.4c-2,0.4-3.4,2.1-3.4,4.2v4
      c0,0.9-0.7,1.7-1.7,1.7c-0.4,0-0.7,0.3-0.7,0.7C1.3,12.6,1.6,12.9,2,12.9z"
    />
    <Path d="M8,15.7c1.1,0,2.1-0.9,2.1-2.1H5.9C5.9,14.8,6.9,15.7,8,15.7z" />
  </G>
);

function calculateMinutesFromAngle(angle) {
  return Math.round(angle / ((2 * Math.PI) / 30));
}

function calculateDateFromAngle(angle) {
  const minutes = calculateMinutesFromAngle(angle);
  const h = Math.floor(minutes / 60);
  const m = minutes - h * 60;

  return {h, m};
}

function roundAngleToFives(angle) {
  const fiveMinuteAngle = (2 * Math.PI) / 160;

  return Math.round(angle / fiveMinuteAngle) * fiveMinuteAngle;
}

function padMinutes(min) {
  if (`${min}`.length < 2) {
    return `0${min}`;
  }

  return min;
}

export default class App extends Component {
  state = {
    startAngle: (Math.PI * 0) / 30,
    angleLength: (Math.PI * 30) / 15,
  };

  onTimeUpdate = (fromTimeInMinutes, minutesLong) => {
    this.setState({minutesLong});
  };

  onUpdate = ({startAngle, angleLength}) => {
    this.setState({
      startAngle: roundAngleToFives(startAngle),
      angleLength: roundAngleToFives(angleLength),
    });
  };

  render() {
    const {startAngle, angleLength} = this.state;
    const waketime = calculateDateFromAngle(
      (startAngle + angleLength) % (2 * Math.PI),
    );

    return (
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <View style={styles.time}>
            <View style={styles.timeHeader}>
              <Text style={styles.wakeText}>KIRAN KUMAR</Text>
            </View>
          </View>
        </View>
        <View>
          <TimerText
            style={styles.sleepTimeContainer}
            minutesLong={calculateMinutesFromAngle(angleLength)}
          />
          <CircularSlider
            startAngle={startAngle}
            angleLength={angleLength}
            onUpdate={this.onUpdate}
            segments={5}
            strokeWidth={30}
            radius={160}
            gradientColorFrom="#aa076b"
            gradientColorTo="#ffcf00"
            showClockFace
            clockFaceColor="#9d9d9d"
            bgCircleColor="#EEEBEA"
            stopIcon={
              <G scale="1.1" transform={{translate: '-8, -8'}}>
                {DATE_ICON}
              </G>
            }
            // startIcon={<G scale="1.1" transform={{ translate: "-8, -8" }}>{BEDTIME_ICON}</G>}
          />
        </View>
        <View style={{flex: 1, margin: 50}}>
          <View
            style={{
              width: Dimensions.get('window').width * 0.9,
              backgroundColor: '#777',
              height: Dimensions.get('window').height * 0.35,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={styles.cardLayout}>
              <Image
                style={{height: 70, width: 70, borderRadius: 90}}
                source={{
                  uri:
                    'https://stimg.cardekho.com/images/carexteriorimages/630x420/Bugatti/Bugatti-Chiron/6524/1550828170128/front-left-side-47.jpg',
                }}
              />
            </View>
            <View
              style={{
                padding: 10,
                margin: 30,
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 20,fontWeight:'bold'}}>
                SEPTEMBER {padMinutes(waketime.m)}
              </Text>
              <Text style={{color: 'white', paddingTop: 3, fontSize: 10}}>
                DAILY HOROSCOPE
              </Text>
              <Text style={{color: 'white', paddingTop: 10, fontSize: 15,fontWeight:'bold'}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
    padding: 5,
  },

  wakeText: {
    color: '#aa076b',
    marginLeft: 3,
    fontSize: 16,
  },
  timeContainer: {
    margin: 10,
    borderColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  time: {
    alignItems: 'center',
    flex: 1,
  },
  timeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },
  timeValue: {
    color: 'white',
    fontSize: 35,
    fontWeight: '300',
  },
  sleepTimeContainer: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  cardLayout:{
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'absolute',
    top: -35,
    left: 142,
    width: 70,
    height: 70,
    backgroundColor: 'red',
  }
});

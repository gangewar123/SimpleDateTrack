import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

export default class TimerText extends Component {
  render() {
    const {minutesLong, ...rest} = this.props;

    const hours = Math.floor(minutesLong / 60);
    const minutes = minutesLong - hours * 60;

    return (
      <View {...rest}>
        {/* 3399FF */}
        <View style={styles.timerContainer}>
          <ProgressCircle
            percent={100}
            radius={100}
            borderWidth={20}
            color={
              minutesLong == 11
                ? 'red'
                : minutesLong == 21
                ? 'green'
                : minutesLong == 1
                ? 'blue'
                : '#FCEFAF'
            }
            shadowColor="#999"
            bgColor="#fff">
            <View
              style={{
                height: 180,
                width: 180,
                borderRadius: 90,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{height: 180, width: 180, borderRadius: 90}}
                source={{
                  uri:
                    'https://stimg.cardekho.com/images/carexteriorimages/630x420/Bugatti/Bugatti-Chiron/6524/1550828170128/front-left-side-47.jpg',
                }}
              />
            </View>
          </ProgressCircle>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  time: {
    color: 'white',
    fontSize: 35,
    fontWeight: '300',
  },
  span: {
    marginLeft: 10,
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontWeight: '300',
    marginBottom: 5,
  },
});

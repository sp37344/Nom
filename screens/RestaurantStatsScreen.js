import React from 'react';
import {
  ImageBackground,
  Button,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { FontAwesome } from '@expo/vector-icons';
import { AreaChart, Grid, BarChart, ProgressCircle, YAxis } from 'react-native-svg-charts'
import { Circle, Path } from 'react-native-svg'
import * as scale from 'd3-scale'
import styles from '../styles';
import App from '../App.js';
import * as firebase from 'firebase';

export default class RestaurantStatsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Business Statistics',
  };

  getBarData() {
    const data1 = [10, 4, 5 , 2, 7]
            .map((value) => ({ value }))
        const data2 = [4, 5, 7, 3, 8]
            .map((value) => ({ value }))

        const barData = [
            {
                data: data1,
                svg: {
                    fill: 'rgb(226, 226, 226)',
                },
            },
            {
                data: data2,
            },
        ]

    return barData
  }

  getHorizontalBarData() {
    const data = [
            {
                value: 50,
                label: 'M',
            },
            {
                value: 10,
                label: 'T',
            },
            {
                value: 40,
                label: 'W',
            },
            {
                value: 95,
                label: 'T',
            },
            {
                value: 85,
                label: 'F',
            },
        ]

    return data
  }

  getPiData() {
    const percentageFilled = 0.7
    return percentageFilled
  }

  getAreaData() {
    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
    return data
  }

  // getDecoratorData() {
  //   const Decorator = ({ x, y, data }) => {
  //           return data.map((value, index) => (
  //               <Circle
  //                   key={ index }
  //                   cx={ x(index) }
  //                   cy={ y(value) }
  //                   r={ 4 }
  //                   stroke={ 'rgb(134, 65, 244)' }
  //                   fill={ 'white' }
  //               />
  //           ))
  //       }

  //       const Line = ({ line }) => (
  //           <Path
  //               d={ line }
  //               stroke={ 'rgba(134, 65, 244)' }
  //               fill={ 'none' }
  //           />
  //       )
  //   return Decorator
  // }

  render() {
    const { navigate } = this.props.navigation;

    const Line = ({ line }) => (
            <Path
                d={ line }
                stroke={ 'orange' }
                fill={ 'none' }
            />
        )

    const Decorator = ({ x, y, data }) => {
            return this.getAreaData().map((value, index) => (
                <Circle
                    key={ index }
                    cx={ x(index) }
                    cy={ y(value) }
                    r={ 4 }
                    stroke={ 'orange' }
                    fill={ 'white' }
                />
            ))
        }

    // const CUT_OFF = 50
    // const Labels = ({  x, y, bandwidth, data }) => (
    //         this.getHorizontalBarData().map((value, index) => (
    //             <Text
    //                 key={ index }
    //                 x={ value > CUT_OFF ? x(0) + 10 : x(value) + 10 }
    //                 y={ y(index) + (bandwidth / 2) }
    //                 fontSize={ 14 }
    //                 fill={ value > CUT_OFF ? 'white' : 'black' }
    //                 alignmentBaseline={ 'middle' }
    //             >
    //                 {value}
    //             </Text>
    //         ))
    //     )

    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.statsContainer}>
          <Text style={styles.statsDescriptionText}>Revenue</Text>
          <AreaChart
              style={{ height: 200 }}
              data={ this.getAreaData() }
              svg={{ fill: 'orange' }}
              contentInset={{ top: 20, bottom: 30 }}
          >
              <Grid/>
              <Line/>
              <Decorator/>
          </AreaChart>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsDescriptionText}>Sales Overview (week)</Text>
{/*          <BarChart
              style={ { height: 200 } }
              data={ this.getBarData() }
              yAccessor={({ item }) => item.value}
              svg={{
                  fill: 'orange',
              }}
              contentInset={ { top: 30, bottom: 30 } }
              { ...this.props }
          >
              <Grid/>
          </BarChart>

*/}

          <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
                <YAxis
                    data={this.getHorizontalBarData()}
                    yAccessor={({ index }) => index}
                    scale={scale.scaleBand}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0.2}
                    formatLabel={(_, index) => this.getHorizontalBarData()[ index ].label}
                />
                <BarChart
                    style={{ flex: 1, marginLeft: 8 }}
                    data={this.getHorizontalBarData()}
                    horizontal={true}
                    yAccessor={({ item }) => item.value}
                    svg={{ fill: 'orange' }}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0.2}
                    gridMin={0}
                >
                    <Grid direction={Grid.Direction.VERTICAL}/>
                </BarChart>
              {/* <Labels/> */}
            </View>

        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsDescriptionText}>Waste Eliminated</Text>
          <ProgressCircle
              style={ { height: 200 } }
              progress={ this.getPiData() }
              progressColor={'orange'}
              startAngle={ -Math.PI * 0.8 }
              endAngle={ Math.PI * 0.8 }
          />
        </View>
      </ScrollView>
    );
  }
}

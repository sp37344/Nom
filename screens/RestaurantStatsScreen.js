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
import { AreaChart, Grid, BarChart } from 'react-native-svg-charts'
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

  render() {
    const { navigate } = this.props.navigation;

    const data1 = [-53, 53, -78, 66, 96, 33, -26, -32, 73, 8 ]
            .map((value) => ({ value }))
        const data2 = [ -78, -62, -72, -6, 89, -70, -94, 10, 86, 84 ]
            .map((value) => ({ value }))

        const barData = [
            {
                data: data1,
                svg: {
                    fill: 'rgb(134, 65, 244)',
                },
            },
            {
                data: data2,
            },
        ]

    return (
      <View>
        <BarChart
            style={ { height: 200 } }
            data={ barData }
            yAccessor={({ item }) => item.value}
            svg={{
                fill: 'green',
            }}
            contentInset={ { top: 30, bottom: 30 } }
            { ...this.props }
        >
            <Grid/>
        </BarChart>
      </View>
    );
  }
}

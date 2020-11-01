import * as React from 'react';
import { View, StatusBar } from 'react-native';
import styles from '../common/Styles';

export const CustomStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
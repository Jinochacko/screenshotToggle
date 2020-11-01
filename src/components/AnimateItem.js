
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated } from 'react-native';

export default class AnimateItem extends Component {
  static propTypes = {
    index: PropTypes.number,
    renderContent: PropTypes.elementType,
  };

  static defaultProps = {
    index: 0,
    renderContent: <View />,
  };

  constructor(props) {
    super(props);
    this.delayValue = 1000;
    this.state = {
      animatedValue: new Animated.Value(0),
    };
  }

  componentDidMount = () => {
    Animated.spring(this.state.animatedValue, {
      toValue: 1,
      tension: 20,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { index, renderContent } = this.props;
    this.delayValue = (index + 1) * 1000;
    const translateY = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 0],
    });

    return (
      <Animated.View style={{ transform: [{ translateY }] }}>
        {renderContent}
      </Animated.View>
    );
  }
}

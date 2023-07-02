import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Dimensions, Image } from 'react-native';

const { height, width } = Dimensions.get('window');

const RainfallAnimation = () => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const raindrops = Array(10000).fill(0);

  const renderRaindrops = () => {
    return raindrops.map((_, index) => {
      const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-height * 2, height],
      });

      const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, width],
      });

      const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.2, 0.5],
      });

      const opacity = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.3, 0],
      });

      const marginLeft = Math.random() * width;

      return (
        <Animated.View
          key={index}
          style={[
            styles.raindropContainer,
            { transform: [{ translateY }, { translateX }, { scale }] },
          ]}
        >
          <Animated.Image
            source={require('../../assets/raindrop.png')}
            style={[
              styles.raindrop,
              { opacity, marginLeft },
            ]}
          />
        </Animated.View>
      );
    });
  };

  return <View style={styles.container}>{renderRaindrops()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  raindropContainer: {
    position: 'absolute',
    bottom: height,
    zIndex: 1,
  },
  raindrop: {
    width: 10,
    height: 50,
  },
});

export default RainfallAnimation;

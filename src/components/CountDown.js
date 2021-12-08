import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';

import { fontSize, spacing } from '../utils/size';
import { colors } from '../utils/colors';

const minToMillis = (min) => min * 60 * 1000;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const CountDown = ({ minutes = 2, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(minToMillis(minutes));
  const interval = React.useRef(null);

  const countDown = () => {
    setMillis((time) => {
      if (time) {
        const timeLeft = time - 1000;
        return timeLeft;
      }
      clearInterval(interval.current);
      return time;
    });
  };

  useEffect(() => {
    onProgress(millis / minToMillis(minutes));
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  useEffect(() => {
    setMillis(minToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const second = Math.floor(millis / 1000) % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(second)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
  },
  text: {
    color: colors.white,
    fontSize: fontSize.xxxl,
    fontWeight: 'bold',
    margin: spacing.lg,
    textAlign: 'center',
    backgroundColor: 'rgba(92,132,266,0.3)',
  },
});

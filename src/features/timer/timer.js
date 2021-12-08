import React, { useState } from 'react';
import { View, StyleSheet, Platform, Vibration } from 'react-native';
import { ProgressBar, Text } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { RoundedButton } from '../../components/RoundedButton';
import { CountDown } from '../../components/CountDown';

import { fontSize, spacing } from '../../utils/size';
import { colors } from '../../utils/colors';

import { Timing } from './Timing';

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (p) => setProgress(p);

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => {
        clearInterval(interval);
      }, 5000);
    } else {
      Vibration.vibrate(5000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
  };

  return (
    <View style={styles.container}>
      <CountDown
        minutes={minutes}
        isPaused={!isStarted}
        onProgress={onProgress}
        onEnd={onEnd}
      />
      <View style={{ padding: spacing.xxl }}>
        <Text style={styles.title}>Focus on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSize.lg,
  },
  buttonWrapper: {
    flex: 0.3,
    padding: spacing.md,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearSubject: {
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg,
  },
});

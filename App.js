import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { Focus } from './src/features/focus/focus';
import { FocusHistory } from './src/features/focus/focusHistory';
import { Timer } from './src/features/timer/timer';

import { colors } from './src/utils/colors';
import { spacing } from './src/utils/size';

const STATUSES = {
  COMPLETED: 1,
  FAILURE: 2,
};

export default function App() {
  const [focusSub, setFocusSub] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistoryWithStatus = (subject, status) => {
    setFocusHistory([{ key: uuid.v4(), subject, status }, ...focusHistory]);
  };
  const onClear = () => setFocusHistory([]);

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSub ? (
        <Timer
          focusSubject={focusSub}
          onTimerEnd={() => {
            addFocusHistoryWithStatus(focusSub, STATUSES.COMPLETED);
            setFocusSub(null);
          }}
          clearSubject={() => {
            addFocusHistoryWithStatus(focusSub, STATUSES.FAILURE);
            setFocusSub(null);
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Focus addSubject={setFocusSub} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? spacing.xxl : spacing.xl,
    backgroundColor: colors.darkBlue,
  },
});

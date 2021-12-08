import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { View, StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSize, spacing } from '../../utils/size';
import { colors } from '../../utils/colors';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What would you like to focus on?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ flex: 1, marginRight: 10 }}
          maxLength={50}
          onChangeText={(text) => setSubject(text)}
        />
        <RoundedButton
          title="+"
          size={50}
          onPress={() => addSubject(subject)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 0.5, padding: spacing.md, justifyContent: 'center' },
  inputContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSize.lg,
  },
});

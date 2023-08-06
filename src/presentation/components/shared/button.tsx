import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../../styling/colors';

function FilledButton({onPress, label, isActive, isLoading}: {onPress: () => void, label: string, isActive:boolean, isLoading: boolean}): JSX.Element {
  return (
    <TouchableOpacity activeOpacity={isActive ? 0.6 : 1.0} style={isActive ? styles.button : styles.buttonInactive} onPress={onPress}>
   { isLoading ? <ActivityIndicator color={'white'}/> :  <Text style={ styles.buttonText}>{label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get('window').width - 32,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 12,
  },
  buttonInactive: {
    width: Dimensions.get('window').width - 32,
    backgroundColor: Colors.grey3,
    borderRadius: 12,
    padding: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.background,
    textAlign: 'center',
  },
});

export default FilledButton;
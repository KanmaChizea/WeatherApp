import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../../styling/colors';

export function LongFilledButton(props: {onPress: () => void, label: string, isActive:boolean, isLoading: boolean}): JSX.Element {
  return (
    <TouchableOpacity activeOpacity={props.isActive ? 0.6 : 1.0} style={props.isActive ? styles.longFilledButton : styles.longFilledButtonInactive} onPress={props.onPress}>
   { props.isLoading ? <ActivityIndicator color={'white'}/> :  <Text style={ styles.buttonText}>{props.label}</Text>}
    </TouchableOpacity>
  );
}

export function ShortFilledButton(props: {onPress: () => void, label: string, isActive:boolean, isLoading: boolean}): JSX.Element {
  return (
    <TouchableOpacity
     activeOpacity={props.isActive ? 0.6 : 1.0} 
     style={props.isActive 
      ? styles.shortFilledButton 
      : styles.shortFilledButtonInactive}
    onPress={props.onPress}>
   { props.isLoading 
   ? <ActivityIndicator color={'white'}/> 
   :  <Text style={ styles.buttonText}>{props.label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  longFilledButton: {
    width: Dimensions.get('window').width - 32,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 12,
  },
  longFilledButtonInactive: {
    width: Dimensions.get('window').width - 32,
    backgroundColor: Colors.grey3,
    borderRadius: 12,
    padding: 12,
  },
  shortFilledButton: {
    paddingVertical: 12,
        paddingHorizontal:36,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor:Colors.primary
  },
  shortFilledButtonInactive: {
    paddingVertical: 12,
        paddingHorizontal:36,
        borderRadius: 20,
        flexDirection: 'row',
    backgroundColor: Colors.grey3,

  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.background,
    textAlign: 'center',
  },
});

import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import TextStyles from '../../styling/textstyles';
import Colors from '../../styling/colors';

interface CustomTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  errorMessage?: string;
}

const InputField = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  errorMessage,
}: CustomTextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={{marginBottom: 24}}>
      <TextInput
        style={[
          styles.inputField,
          errorMessage != null &&
            errorMessage.length !== 0 &&
            styles.inputFieldError,
          isFocused && styles.inputFieldFocused,
        ]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        cursorColor={Colors.green}
        selectionColor={Colors.green}
        placeholderTextColor={Colors.grey2}
        secureTextEntry={secureTextEntry}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {errorMessage != null && errorMessage.length !== 0 ? (
        <Text style={{...TextStyles.caption, color: Colors.red}}>
          {errorMessage}
        </Text>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,

    borderRadius: 12,
    fontSize: 14,
  },
  inputFieldFocused: {
    height: 40,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 14,
  },
  inputFieldError: {
    height: 40,
    borderWidth: 1.5,
    borderColor: Colors.red,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 4,
    borderRadius: 12,
    fontSize: 14,
  },
});

export default InputField;
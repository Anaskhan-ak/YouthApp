import {StyleSheet, View, TextInput} from 'react-native';
import React from 'react';
import _ from 'lodash';
import {SearchIcon} from '../../../assets/images/svgs';
import {colors} from '../../../utils/colors';
import {height, width} from '../../../constant';
const SearchBar = (
  props,
  {onPress, placeholder, value, onChangeText, onBlur, func},
) => {
  const debouncedSearch = _.debounce(term => {
    // Perform the actual search operation here
    func(term);
    // You can trigger an API call or any other operation with the debounced term
  }, 1000); // 1000 milliseconds (1 second) debounce time

  const handleInputChange = text => {
    debouncedSearch(text); // This will trigger the debounced function after 1 second
  };
  return (
    <View
      style={[
        styles.searchContainerStyle,
        {marginHorizontal: props?.marginHorizontal},
      ]}>
      <View style={styles.inputContainerStyle}>
        <SearchIcon />
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={colors.gray12}
          value={props?.search}
          onChangeText={handleInputChange}
        />
      </View>
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  searchContainerStyle: {
    marginVertical: height * 0.03,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    alignItems: 'center',
  },
  inputContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray11,
    borderRadius: width * 0.4,
    paddingLeft: width * 0.03,
    borderWidth: width * 0.005,
    borderColor: colors.gray11,
    width: '100%',
  },
  textInput: {
    flex: 1,
    height: 40,
    marginLeft: width * 0.02,
    color: colors.black,
  },
});

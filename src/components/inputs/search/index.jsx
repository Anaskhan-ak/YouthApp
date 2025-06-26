import { StyleSheet, TextInput, View } from 'react-native';
import { SearchIcon } from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';

const CustomSearchBar = props => {
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
          placeholder="Search"
          placeholderTextColor={colors.gray12}
          value={props?.search}
          onChangeText={props?.setSearch}
        />
      </View>
    </View>
  );
};

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
    backgroundColor: colors.searchBg,
    borderRadius: width * 0.02,
    paddingLeft: width * 0.03,
    borderWidth: width * 0.005,
    borderColor: colors.searchBg,
    width: '100%',
  },
  textInput: {
    flex: 1,
    height: 40,
    marginLeft: width * 0.02,
    color: colors.black,
  },
});

export default CustomSearchBar;

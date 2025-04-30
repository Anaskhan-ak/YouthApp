import { SearchBar } from '@rneui/base';
import { StyleSheet } from 'react-native';
import { SearchIcon } from '../../../assets/images/svgs';
import { height, width } from '../../../constant';
import { colors } from '../../../utils/colors';

const CustomSearchBar = props => {
  return (
    <SearchBar
      lightTheme={true}
      round={true}
      placeholder="Search"
      value={props?.search}
      onChangeText={props?.setSearch}
      containerStyle={styles?.searchContainerStyle}
      inputContainerStyle={styles?.inputContainerStyle}
      searchIcon={<SearchIcon />}
    />
  );
};

const styles = StyleSheet?.create({
  searchContainerStyle: {
    marginVertical: height * 0.01,
    marginHorizontal: width * 0.02,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    alignItems: 'center',
  },
  inputContainerStyle: {
    backgroundColor: colors.gray11,
    borderRadius: width * 0.4,
    paddingLeft: width * 0.03,
    borderWidth: width * 0.005,
    borderColor: colors.gray11,
  },
});

export default CustomSearchBar;

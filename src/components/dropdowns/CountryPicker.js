import {View, Text} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import {CountryPicker} from 'react-native-country-codes-picker';

const CountryPickerDropDown = ({
  showCountry,
  setShowCountry,
  setCountryDetails,
}) => {
  return (
    <CountryPicker
      lang="en"
      show={showCountry}
      excludedCountries={['IL']}
      onBackdropPress={() => setShowCountry(false)}
      searchMessage="Search country"
      style={{
        modal: {
          marginTop: 200,
        },
        textInput: {
          color: colors.black,
        },
        countryName: {
          color: colors.black,
        },
        dialCode: {
          color: colors.black,
        },
      }}
      pickerButtonOnPress={item => {
        setCountryDetails(item);
        setShowCountry(false);
      }}
    />
  );
};

export default CountryPickerDropDown;

import {CountryPicker} from 'react-native-country-codes-picker';
import {colors} from '../../utils/colors';

const CountryPickerDropDown = ({
  showCountry,
  setShowCountry,
  setCountryDetails,
  setValue,
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
        if (setCountryDetails) {
          setCountryDetails(item);
        }
        setShowCountry(false);
        setValue && setValue('country', item?.name?.en);
      }}
    />
  );
};

export default CountryPickerDropDown;

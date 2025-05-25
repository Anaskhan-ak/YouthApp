import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GrayLocationIcon } from '../../../assets/images/svgs';
import CustomSearchBar from '../../inputs/search';
import GradientText from '../../text/GradientText';
import { styles } from './styles';

export default function Location({sheetRef, location, setLocation}) {
  const [selected, setSelected] = useState([
    {
      id: 1,
      text: 'Pakistan',
      checked: true,
      value: 'Pakistan',
    },
    {
      id: 2,
      text: 'Afghanistan',
      checked: false,
      value: 'Afghanistan',
    },
    {
      id: 3,
      text: 'India',
      checked: false,
      value: 'India',
    },
    {
      id: 4,
      text: 'China',
      checked: false,
      value: 'China',
    },
    {
      id: 5,
      text: 'Iran',
      checked: false,
      value: 'Iran',
    },
  ]);
  const [search, setSearch] = useState('');
  const handleCheck = (id, value) => {
    setSelected(prev =>
      prev.map(item => {
        if (item.id === id) {
          setLocation(prev => ({
            ...prev,
            location: {
              ...prev?.location,
              // active : false,
              value: value,
            },
          }));
          return {...item, checked: !item.checked};
        } else {
          return {...item, checked: false};
        }
      }),
    );
  };
  return (
    <BottomSheet index={0} enablePanDownToClose={true} ref={sheetRef}>
      <BottomSheetView style={styles.contentContainer}>
        <GradientText style={styles.heading}>Location</GradientText>
        <View style={styles?.search}>
          <CustomSearchBar search={search} setSearch={setSearch} />
        </View>
        <View style={styles.checkboxContainer}>
          {selected
            ?.filter(sel => sel?.text?.includes(search))
            ?.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.checkboxElement}
                onPress={() => handleCheck(item?.id, item?.value)}>
                <GrayLocationIcon />
                <Text style={styles.text}>{item.text}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

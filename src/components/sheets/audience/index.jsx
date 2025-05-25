import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlueTick } from '../../../assets/images/svgs';
import CustomSearchBar from '../../../components/inputs/search';
import GradientText from '../../../components/text/GradientText';
import { width } from '../../../constant';
import { colors } from '../../../utils/colors';
import { styles } from './styles';

export default function Audience({sheetRef, audience, setAudience}) {
  const [selected, setSelected] = useState([
    {
      id: 1,
      text: 'Public',
      checked: true,
      value: 'PUBLIC',
    },
    {
      id: 2,
      text: 'Close Friends',
      checked: false,
      value: 'CLOSE_FRIENDS',
    },
    {
      id: 3,
      text: 'Favorite Friends',
      checked: false,
      value: 'FAVORITE_FRIENDS',
    },
    {
      id: 4,
      text: 'Subscribers only',
      checked: false,
      value: 'SUBSCRIBERS_ONLY',
    },
    {
      id: 5,
      text: 'Family',
      checked: false,
      value: 'FAMILY',
    },
  ]);
  const [search, setSearch] = useState('')
   const handleCheck = (id, value) => {
    setSelected(prev =>
      prev.map(item => {
        if (item.id === id) {
          setAudience(prev => ({
            ...prev,
            audience : {
                ...prev?.audience,
                // active : false,
                value : value
            }
          }))
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
        <GradientText style={styles.heading}>Audience</GradientText>
        <View style={styles?.search}><CustomSearchBar search={search} setSearch={setSearch}/></View>
        <View style={styles.checkboxContainer}>
          {selected?.filter(sel => sel?.text?.includes(search))?.map(item => (
            <View key={item.id} style={styles.checkboxElement}>
              <Text style={styles.text}>{item.text}</Text>
              <TouchableOpacity
                onPress={() => handleCheck(item?.id, item?.value)}>
                {item.checked ? (
                  <BlueTick width={width * 0.07} height={width * 0.07}/>
                ) : (
                  <LinearGradient
                    style={styles?.gradientCircle}
                    colors={[colors?.RGB1, colors?.RGB2]}>
                    <View style={styles?.whiteCircle}/>
                  </LinearGradient>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

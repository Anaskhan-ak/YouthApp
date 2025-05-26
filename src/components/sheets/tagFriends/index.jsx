import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../../assets/images';
import { colors } from '../../../utils/colors';
import CustomSearchBar from '../../inputs/search';
import GradientText from '../../text/GradientText';
import { styles } from './styles';

export default function TagFriends({sheetRef, tagFriends, setTagFriends}) {
  const [selected, setSelected] = useState([
    {
      id: 'qqqqqqqqqqqqqqqqqqqq',
      image: images?.onboarding1,
      name: 'Sannya Wasim',
      active: true,
    },
    {
      id: 'wwwwwwwwwwwwwwwwwww',
      image: images?.onboarding1,
      name: 'Muzammil Ali',
      active: false,
    },
    {
      id: 'eeeeeeeeeeeeeeeeeee',
      image: images?.onboarding1,
      name: 'Tehreem Zahid',
      active: false,
    },
    {
      id: 'rrrrrrrrrrrrrrrrrrrrr',
      image: images?.onboarding1,
      name: 'Shahmeer Khan',
      active: false,
    },
    {
      id: 'aaaaaaaaaaaaaaaaaaaa',
      image: images?.onboarding1,
      name: 'Areeba Fatima',
      active: false,
    },
    {
      id: 'ssssssssssssssss',
      image: images?.onboarding1,
      name: 'Daniyal Ahmed',
      active: false,
    },
    {
      id: 'ddddddddddddddddddd',
      image: images?.onboarding1,
      name: 'Fariha Siddiqui',
      active: false,
    },
    {
      id: 'fffffffffffffff',
      image: images?.onboarding1,
      name: 'Hammad Raza',
      active: false,
    },
    {
      id: 'ccccccccccccccccccc',
      image: images?.onboarding1,
      name: 'Zoya Malik',
      active: false,
    },
    {
      id: 'xxxxxxxxxxxxxxxxxxxxx',
      image: images?.onboarding1,
      name: 'Ibrahim Noor',
      active: false,
    },
  ]);

  const [search, setSearch] = useState('');
  const handleCheck = obj => {
  setSelected(prev =>
    prev.map(item =>
      item.id === obj?.id
        ? { ...item, active: !item.active }
        : item
    ),
  );

  setTagFriends(prev => {
    const isAlreadyTagged = prev.tagFriends.value.includes(obj.id);
    const updatedValue = isAlreadyTagged
      ? prev.tagFriends.value.filter(id => id !== obj.id)
      : [...prev.tagFriends.value, obj.id];

    return {
      ...prev,
      tagFriends: {
        ...prev.tagFriends,
        value: updatedValue,
      },
    };
  });
};
  const renderItem = ({item, index}) => {
    return (
      <View key={item?.id} style={styles?.itemContainer}>
        <View style={styles?.itemLeft}>
          <Image source={item?.image} style={styles?.itemImage} />
          <Text style={styles?.itemName}>{item?.name}</Text>
        </View>

        <TouchableOpacity onPress={() => handleCheck(item)}>
          <LinearGradient
            style={styles?.itemButton}
            colors={[colors?.RGB1, colors?.RGB2]}>
            <Text style={styles?.itemText}>
              {item?.active ? 'Tagged' : 'Tag'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <BottomSheet index={0} enablePanDownToClose={true} ref={sheetRef}>
      <BottomSheetView style={styles.contentContainer}>
        <GradientText style={styles.heading}>Tag Friends</GradientText>
        <View style={styles?.search}>
          <CustomSearchBar search={search} setSearch={setSearch} />
        </View>
        <View style={styles.checkboxContainer}>
          <FlatList
            data={selected?.filter(sel => sel?.name?.includes(search))}
            renderItem={renderItem}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

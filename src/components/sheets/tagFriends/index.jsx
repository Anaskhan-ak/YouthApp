import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { images } from '../../../assets/images';
import { toast } from '../../../components/toast';
import { getDataLocally } from '../../../helper';
import { apiCall } from '../../../services/apiCall';
import { colors } from '../../../utils/colors';
import CustomSearchBar from '../../inputs/search';
import GradientText from '../../text/GradientText';
import { styles } from './styles';

export default function TagFriends({sheetRef, tagFriends, setTagFriends}) {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const userDetails = await getDataLocally()
        const response = await apiCall?.getAllUsers({
          page,
          pageSize,
        });
        if (response) {
          setSelected(
            response?.filter(r => r?.id !== userDetails?.id)?.map(r => ({
              id: r?.id,
              name: `${r?.firstName} ${r?.lastName}`,
              image: r?.photo,
              active: false,
            })),
          );
        }
      } catch (error) {
        console.log('Error fetching friends', error);
        toast('error', 'Error fetching friends');
      }
    };
    getFriends();
  }, []);

  const [search, setSearch] = useState('');
  const handleCheck = obj => {
    setSelected(prev =>
      prev.map(item =>
        item.id === obj?.id ? {...item, active: !item.active} : item,
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
          <Image source={item?.image ? {uri:item?.image} : images?.defaultProfilePicture} style={styles?.itemImage} />
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
    <BottomSheet index={0} enablePanDownToClose={true} ref={sheetRef} snapPoints={['75%']}>
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

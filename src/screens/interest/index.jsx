import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradientCross } from '../../assets/images/svgs';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import CustomSearchBar from '../../components/inputs/search';
import GradientText from '../../components/text/GradientText';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import { styles } from './styles';

const Interests = () => {
  const [interests, setInterests] = useState([]);
  const [filteredInterests, setFilteredInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [search, setSearch] = useState('');

  const getAllnterests = async () => {
    try {
      const response = await apiCall?.getAllInterests();
      // console.log('ALL INTERESTS', response);
      setInterests(response);
      setFilteredInterests(response);
    } catch (error) {
      console.error('Error fetching interests:', error);
    }
  };
  useEffect(() => {
    getAllnterests();
  }, []);

  const handleSearch = useCallback(
    _.debounce(query => {
      setSearch(query);
      if (query.trim() === '') {
        setFilteredInterests(interests);
      } else {
        const lowerCaseQuery = query.toLowerCase();
        const searched = interests.filter(interest =>
          interest?.name?.toLowerCase().includes(lowerCaseQuery),
        );
        setFilteredInterests(searched);
      }
    }, 500),
    [interests],
  );

  const onChangeSearchText = text => {
    setSearch(text);
    handleSearch(text);
  };

  const toggleSelection = item => {
    // console.log('Clicked Item', item);
    if (selectedInterests?.find(interest => interest?.id === item?.id)) {
      setSelectedInterests(
        selectedInterests?.filter(interest => interest?.id !== item?.id),
      );
    } else {
      setSelectedInterests(prev => [...prev, item]);
    }
  };

  const handleInterests = async () => {
    try {
      // Send each selected interest one by one
      for (const interest of selectedInterests) {
        const payload = {intrestId: interest.id};
        console.log('Payload', payload);
        const response = await apiCall?.addInterest(payload)
        console.log('Interests added successfully', response);
      }
    } catch (error) {
      console.log('Error adding interests:', error);
    }
  };

  return (
    <SafeAreaView style={styles?.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent
      />
      <View style={styles?.header}>
        <View style={styles?.heading}>
          <GradientText style={styles?.gradientHeading}>Interests</GradientText>
          <TouchableOpacity>
            <GradientCross />
          </TouchableOpacity>
        </View>
        <Text style={styles?.subHeading}>
          Choose 4 to 15 interestes to get better recommendation
        </Text>
        <CustomSearchBar search={search} setSearch={onChangeSearchText} />
        <FlatList
          data={filteredInterests}
          renderItem={({item, index}) => {
            const isAlreadySelected = selectedInterests?.find(
              interest => interest?.id === item?.id,
            );
            return (
              <TouchableOpacity
                key={index}
                onPress={() => toggleSelection(item)}>
                {isAlreadySelected ? (
                  <LinearGradient
                    colors={[colors?.RGB1, colors?.RGB2]}
                    style={styles?.itemGradientButton}>
                    <Text
                      style={[
                        styles?.itemText,
                        {
                          color: colors?.white,
                        },
                      ]}>
                      {item?.name}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View style={styles?.itemButton}>
                    <Text
                      style={[
                        styles?.itemText,
                        {
                          color: colors?.textGray,
                        },
                      ]}>
                      {item?.name}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
          numColumns={2}
        />
        <View>
          <PrimaryButton title="Explore Now" onPress={handleInterests} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Interests;

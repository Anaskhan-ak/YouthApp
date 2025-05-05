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
import { GradientCross } from '../../assets/images/svgs';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import CustomSearchBar from '../../components/inputs/search';
import GradientText from '../../components/text/GradientText';
import { apiCall } from '../../services/apiCall';
import { styles } from './styles';

const Interests = () => {
  const [interests, setInterests] = useState([]);
  const [filteredInterests, setFilteredInterests] = useState([]);
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

  const onChangeSearchText = (text) => {
    setSearch(text);           
    handleSearch(text);       
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
            return (
              <TouchableOpacity key={index}>
                {/* <LinearGradient colors={[colors?.RGB1, colors?.RGB2]} style={styles?.itemGradientButton}>
                  <Text style={styles?.itemText}>{item?.name}</Text>
                </LinearGradient> */}
                <View style={styles?.itemButton}>
                  <Text style={styles?.itemText}>{item?.name}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          numColumns={2}
        />
        <View>
          <PrimaryButton title="Explore Now" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Interests;

import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlackBackArrow, BlackYouthLogo } from '../../assets/images/svgs';
import { height } from '../../constant';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import { styles } from './styles';

const Yudios = () => {
  const [yudios, setYudios] = useState([]);
  const [showFullText, setShowFullText] = useState(false);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchYudios = async () => {
      const data = {
        userId: 'cm60ql39f003l91r8l18bd80z',
        page: page,
        pageSize: pageSize,
      };
      try {
        const result = await apiCall?.getAllYudios(data);
        console.log('yudios fetched successfully', result);
        setYudios(result);
      } catch (error) {
        console.log('Error fetching all yudios', error);
      }
    };
    fetchYudios();
  }, []);

  const handleScroll = event => {
    const x = event.nativeEvent.contentOffset.x;
    const index = x / height;
    setPage(index);
  };

  const Loader = () => {
    return (
      <View style={styles?.emptyComp}>
        <ActivityIndicator size={'large'} color={colors?.RGB1} />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles?.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent
      />
      {/* Header */}
      <View style={styles?.header}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={styles?.headerIcon}>
          <BlackBackArrow />
        </TouchableOpacity>
        {['For You', 'Following', 'Trending', 'Live']?.map(item => {
          return (
            <TouchableOpacity>
              <Text style={[styles?.headerText, {color: colors?.gray}]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity style={styles?.headerIcon}>
          <BlackYouthLogo />
        </TouchableOpacity>
      </View>
      <FlatList
        data={yudios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <RenderYudios yudio={item} yudios={yudios} />}
        ListEmptyComponent={<Loader />}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={height}
        snapToAlignment="start"
      />
    </SafeAreaView>
  );
};

export default Yudios;

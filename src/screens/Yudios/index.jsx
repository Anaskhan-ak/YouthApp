import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlackBackArrow, BlackYouthLogo } from '../../assets/images/svgs';
import EmptyComponent from '../../components/empty';
import { toast } from '../../components/toast';
import { height } from '../../constant';
import { getDataLocally } from '../../helper';
import useUser from '../../hooks/user';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import RenderYudios from './components/renderYudios';
import { styles } from './styles';

const Yudios = () => {
  const [yudios, setYudios] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const user = useUser();
  const [currentAudioId, setCurrentAudioId] = useState('');
  useEffect(() => {
    const fetchYudios = async () => {
      setLoading(true);
      const userDetails = await getDataLocally();
      if (!userDetails) {
        toast('error', 'User not found. Please login again');
        setLoading(false);
        return;
      }

      const data = {
        userId: userDetails.id,
        page,
        pageSize,
      };

      try {
        const result = await apiCall?.getAllYudios(data);
        console.log('yudios fetched successfully', result);
        setYudios(result || []);
      } catch (error) {
        console.log('Error fetching all yudios', error);
        toast('error', 'Error fetching yudios');
        setYudios([]);
      } finally {
        setLoading(false);
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
        {['For You', 'Following', 'Trending', 'Live']?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation?.navigate('Home')}>
              <Text style={[styles?.headerText, {color: colors?.gray}]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={styles?.headerIcon}
          onPress={() => navigation?.navigate('Home')}>
          <BlackYouthLogo />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loader /> // Full-screen loader while fetching
      ) : yudios?.length === 0 ? (
        <EmptyComponent text="Failed to load yudios" />
      ) : (
        <FlatList
          data={yudios}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <RenderYudios
              yudio={item}
              yudios={yudios}
              index={index}
              currentAudioId={currentAudioId}
              setCurrentAudioId={setCurrentAudioId}
            />
          )}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={height}
          snapToAlignment="start"
        />
      )}
    </SafeAreaView>
  );
};

export default Yudios;

import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScrollHeader from '../../components/headers/scrollHeader';
import { height } from '../../constant';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import RenderYudios from './components/renderYudios';
import { styles } from './styles';

const Yudios = () => {
  const [yudios, setYudios] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

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
      <ScrollHeader />
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

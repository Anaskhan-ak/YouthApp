import { BlurView } from '@react-native-community/blur';
import { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BlackBackArrow, BlackYouthLogo } from '../../assets/images/svgs';
import YudioReactions from '../../components/reactions/yudioReactions';
import { height } from '../../constant';
import { colors } from '../../utils/colors';
import YudioCard from './components/yudioCard';
import { styles } from './styles';

const Yudios = () => {
  const yudios = [
    require('../../assets/images/SignupImage.jpeg'),
    require('../../assets/images/SignupImage.jpeg'),
    require('../../assets/images/SignupImage.jpeg'),
  ];
  const [showFullText, setShowFullText] = useState(false);
  const [page, setPage] = useState(0);
  const caption =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor, Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor....Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor....Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor....';

  const RenderYudios = () => {
    return (
      <View style={{flex: 1, height : height, justifyContent : "center"}}>
        {/* Yudio Card */}
        <YudioCard />
        {/* Reactions */}
        <View style={styles?.reactions}>
          <YudioReactions />
        </View>
        {/* Suggested Yudios */}
        <View style={styles?.suggestedView}>
          <Text style={styles?.suggestedHeading}>More by Mohamed Mostafa</Text>
          <FlatList
            data={yudios}
            renderItem={({item}) => {
              return (
                <TouchableOpacity style={styles?.suggestedButton}>
                  <Image source={item} style={styles?.suggestedImage} />
                </TouchableOpacity>
              );
            }}
            horizontal
          />
        </View>
        {/* Blur Bottom View */}
        <View
          style={[
            styles?.blurContainer,
            {
              height: showFullText ? height * 0.18 : height * 0.13,
            },
          ]}>
          <ScrollView>
            <Text style={styles?.blurText}>
              {caption?.length > 200 && !showFullText
                ? `${caption?.substring(0, 200)}... `
                : caption + ' '}
              {caption?.length > 200 && (
                <Text
                  onPress={() => setShowFullText(prev => !prev)}
                  style={styles?.seeAllText}>
                  {showFullText ? 'See less' : 'Show more'}
                </Text>
              )}
            </Text>
          </ScrollView>
          <View style={styles?.tagsContainer}>
            {['#fashion', '#holiday', '#beach'].map(item => {
              return (
                <TouchableOpacity>
                  <Text style={styles?.tagText}>{item}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <BlurView
            style={[
              styles.blur,
              {
                height: showFullText ? height * 0.18 : height * 0.13,
              },
            ]}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        </View>
      </View>
    );
  };

  const handleScroll = event => {
    const x = event.nativeEvent.contentOffset.x;
    const index = x / height;
    setPage(index);
  };
  return (
    <SafeAreaView style={styles?.container}>
      {/* Header */}
      <View style={styles?.header}>
        <TouchableOpacity style={styles?.headerIcon}>
          <BlackBackArrow/>
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
        renderItem={({item}) => <RenderYudios />}
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

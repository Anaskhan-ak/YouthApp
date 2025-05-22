import React, {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../../../utils/colors';
import {homeCategoryOptions} from '../../../../utils/string';
import {styles} from './styles';

const CategorySelector = () => {
  const [category, setCategory] = useState(1);

  const handlePress = item => {
    setCategory(item?.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {homeCategoryOptions?.map(item => {
        const isActive = category === item?.id;
        return (
          <TouchableOpacity
            key={item?.id}
            onPress={() => handlePress(item)}
            style={styles.buttonWrapper}
            activeOpacity={0.8}>
            <LinearGradient
              colors={
                isActive
                  ? [colors.pink, colors.pink]
                  : [colors.white, colors.white]
              }
              style={styles.button}>
              {item?.icon}
              <Text
                style={[
                  styles.text,
                  {
                    color: isActive ? colors.white : colors.black,
                    marginLeft: item?.icon ? 2 : 0,
                  },
                ]}>
                {item?.name}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

export default CategorySelector;

import {View, Text, ImageBackground, StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {images} from '../../assets/images';
import {width} from '../../constant';
import {YouthIcon} from '../../assets/images/svgs';
import {useForm, Controller} from 'react-hook-form';
import {emailValidation} from '../../helper';
import AuthInput from '../../components/inputs/AuthInput';

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {},
  });
  return (
    <SafeAreaView style={styles?.container}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <View style={styles?.imageView}>
        <ImageBackground
          borderBottomLeftRadius={width * 0.1}
          borderBottomRightRadius={width * 0.1}
          style={styles.image}
          source={images?.signup}
        />
      </View>
      <View style={styles?.contentView}>
        <Text style={styles?.heading}>
          Create a New <YouthIcon width={width * 0.2} /> Account
        </Text>
        <Text style={styles?.title}>It’s quick and easy.</Text>
        <View style={styles?.textContainer}>
          <View style={styles?.textView}>
            <Controller
              control={control}
              rules={{
                required: 'firstName is required',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <AuthInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  icon={'email'}
                  placeholder={'First Name'}
                />
              )}
              name="firstName"
            />
            {errors && (
              <Text
                style={[
                  styles?.sub_heading,
                  {color: 'red', textAlign: 'left'},
                ]}>
                {errors?.email?.message}
              </Text>
            )}
          </View>
          <View style={styles?.textView}>
            <Controller
              control={control}
              rules={{
                required: 'last name is required',
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <AuthInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder={'Last Name'}
                />
              )}
              name="lastName"
            />
            {errors && (
              <Text
                style={[
                  styles?.sub_heading,
                  {color: 'red', textAlign: 'left'},
                ]}>
                {errors?.email?.message}
              </Text>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

import { pick } from '@react-native-documents/picker';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { images } from '../../assets/images';
import {
  Calendar,
  EditEventThumbnail,
  GrayTimeIcon,
} from '../../assets/images/svgs';
import CreateButton from '../../components/buttons/CreateButton';
import DateTimePicker from '../../components/dropdowns/DateTimePicker';
import GradientHeader from '../../components/headers/gradientHeader';
import AuthInput from '../../components/inputs/authInput';
import MultilineInput from '../../components/inputs/multilineInput';
import { width } from '../../constant';
import { apiCall } from '../../services/apiCall';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { styles } from './styles';

const CreateEvent = () => {
  const navigation = useNavigation();
  const maxChars = 2500;
  const [chars, setChars] = useState(0);
  const [showDateTime, setShowDateTime] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      thumbnail: {
        uri: '',
        name: '',
        type: '',
      },
      name: '',
      description: '',
      location: '',
      cost: 0,
      time: '',
      walletAddress: '',
    },
  });
  const timeValue = watch('time');

  const handleForm = async (data) => {
    // console.log('Event Details', details);
    const formData = new FormData();
    formData.append('type', 'EVENT');
    formData.append('isPublic', 'PUBLIC');
    formData.append('caption', data?.description);
    formData.append('eventTitle', data?.name);
    // formData.append('cost', parseFloat(`${eventCost}.12`));
    formData.append('eventLocation', data?.location);
    formData.append('location', data?.location);
    formData.append('eventDescription', data?.description);
    formData.append('eventDay', moment(data?.time)?.format('dddd'));
    formData.append('eventTime', data?.time);
    formData.append('eventType', 'EVENT');
    formData.append('walletAddress', data?.walletAddress);
    formData.append('media', {
      uri: data?.thumbnail?.uri,
      type: data?.thumbnail?.type,
      name: data?.thumbnail?.name,
    });
    formData.append('thumbnail', {
      uri: data?.thumbnail?.uri,
      type: data?.thumbnail?.type,
      name: data?.thumbnail?.name,
    });
    console.log('Form data', formData);
    try {
      const response = await apiCall?.createNewPost(formData);
      console.log('Successfully created event post', response);
    } catch (error) {
      console.log('Error creating event post', error);
    }
  };
  return (
    <View style={styles?.container}>
      <GradientHeader
        title="Create Event"
        backPress={() => navigation?.goBack}
      />
      <ScrollView style={styles?.inputContainer}>
        <Controller
          control={control}
          rules={{
            validate: value => value?.uri?.length > 0 || 'Thumbnail is required',
          }}
          name="thumbnail"
          render={({field: {value, onChange}}) => {
            const selectThumbnail = async () => {
              try {
                const [res] = await pick({
                  type: ['image/*'],
                  allowMultiSelection: false,
                });
                console.log('Thumbnail', res);
                if (res?.uri) {
                  onChange({
                    uri: res?.uri,
                    name: res?.name,
                    type: res?.type,
                  });
                }
              } catch (error) {
                console.log('Error selecting thumbnail', error);
              }
            };
            return (
              <TouchableOpacity
                style={[
                  styles?.editThumbnail,
                  !value?.uri && {
                    padding: width * 0.15,
                  },
                ]}
                onPress={selectThumbnail}>
                <View style={styles?.pen}>
                  <EditEventThumbnail />
                </View>
                {value?.uri ? (
                  <Image
                    source={{uri: value?.uri}}
                    style={styles?.editThumbnailImage}
                  />
                ) : (
                  <Image
                    source={images?.defaultPicture}
                    style={styles?.editThumbnailPlaceholder}
                  />
                )}
              </TouchableOpacity>
            );
          }}
        />
        {/* {console.log(errors)} */}

        {errors?.thumbnail && (
          <Text style={styles?.errorText}>{errors?.thumbnail?.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: 'Event name is required!',
          }}
          name="name"
          render={({field: {value, onChange, onBlur}}) => (
            <AuthInput
              placeholder={'Event Name'}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              inputStyle={{margin: width * 0.01}}
            />
          )}
        />
        {errors?.name && (
          <Text style={styles?.errorText}>{errors?.name?.message}</Text>
        )}
        <Controller
          control={control}
          rules={{required: 'Event description is required!'}}
          name="description"
          render={({field: {value, onChange, onBlur}}) => (
            <MultilineInput
              placeholder="About this Event"
              placeholderTextColor={colors?.gray}
              editable={true}
              multiline={true}
              numberOfLines={5}
              scrollEnabled={true}
              value={value}
              chars={chars}
              setChars={setChars}
              maxChars={maxChars}
              postType={'post'}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors?.description && (
          <Text style={styles?.errorText}>{errors?.description?.message}</Text>
        )}
        <Controller
          control={control}
          rules={{required: 'Location is required'}}
          name="location"
          render={({field: {value, onChange, onBlur}}) => (
            <AuthInput
              placeholder="Location Link (Physical / Virtual)"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              inputStyle={{margin: width * 0.01}}
              icon="location"
            />
          )}
        />
        {errors?.location && (
          <Text style={styles?.errorText}>{errors?.location?.message}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: 'Cost is required',
            validate: value => value > 0 || 'Cost is required',
          }}
          name="cost"
          render={({field: {value, onChange, onBlur}}) => (
            <AuthInput
              placeholder="Cost:"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              inputStyle={{margin: width * 0.01}}
              keyboardType={'number-pad'}
              icon="cost"
            />
          )}
        />
        {errors?.cost && (
          <Text style={styles?.errorText}>{errors?.cost?.message}</Text>
        )}
        <Controller
          control={control}
          rules={{required: 'Time is required'}}
          name="time"
          render={({field: {value}}) => {
            const formattedValue = moment(value).format(
              'dddd, DD/MM/YYYY @ hh:mm A',
            );
            return (
              <TouchableOpacity
                onPress={() => setShowDateTime(true)}
                style={{
                  width: width * 0.9,
                  padding: width * 0.02,
                  backgroundColor: colors?.extraLightGrey,
                  borderRadius: width * 0.02,
                  marginLeft: width * 0.01,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <GrayTimeIcon />
                <Text
                  style={{
                    marginLeft: width * 0.01,
                    fontSize: width * 0.03,
                    color: colors?.text,
                    fontFamily: fonts?.montserratRegular,
                  }}>
                  {formattedValue !== 'Invalid date' ? formattedValue : `Time`}
                </Text>
                <View
                  style={{
                    marginLeft: width * 0.55,
                  }}>
                  <Calendar />
                </View>
              </TouchableOpacity>
            );
          }}
        />
        {errors?.time && (
          <Text style={styles?.errorText}>{errors?.time?.message}</Text>
        )}
        <Controller
          control={control}
          rules={{required: 'Wallet address is required'}}
          name="walletAddress"
          render={({field: {value, onChange, onBlur}}) => (
            <AuthInput
              placeholder="Wallet Adress"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              inputStyle={{margin: width * 0.01}}
              icon="wallet"
            />
          )}
        />
        {errors?.walletAddress && (
          <Text style={styles?.errorText}>
            {errors?.walletAddress?.message}
          </Text>
        )}
      </ScrollView>
      <DateTimePicker
        selectedDate={timeValue}
        setSelectedDate={setValue}
        showDate={showDateTime}
        setShowDate={setShowDateTime}
      />
      <CreateButton title="Create Event" onPress={handleSubmit(handleForm)} />
    </View>
  );
};

export default CreateEvent;

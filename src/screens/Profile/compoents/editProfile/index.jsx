import moment from 'moment';
import { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { DropDown, GradientCross } from '../../../../assets/images/svgs';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import CountryPickerDropDown from '../../../../components/dropdowns/CountryPicker';
import DateMonthPicker from '../../../../components/dropdowns/DatePicker';
import AuthInput from '../../../../components/inputs/authInput';
import GenderModal from '../../../../components/modals/genderModal';
import GradientText from '../../../../components/text/GradientText';
import { toast } from '../../../../components/toast';
import { height, width } from '../../../../constant';
import { apiCall } from '../../../../services/apiCall';
import { colors } from '../../../../utils/colors';
import { styles } from './styles';

const EditProfile = ({data, setData, setEditProfile}) => {
  const [showGender, setShowGender] = useState(false);
  const [gender, setGender] = useState(data?.gender);
  const [showCountry, setShowCountry] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [chars, setChars] = useState(data?.bio?.length);
  const [loading, setLoading] = useState(false);
  const maxChars = 200;
  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      country: data?.country,
      date: data?.dateOfBirth,
      bio: data?.bio,
      links: ['www.Youthapp.io', 'www.Youthapp.io'],
    },
  });
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'links',
  });
  const links = watch('links');
  console.log("date", data?.dateOfBirth)

  const onSubmit = async values => {
    // console.log('selectedDate',selectedDate?.toISOString());
    setLoading(true);
    const formData = new FormData();
    formData.append('firstName', values?.firstName);
    formData.append('lastName', values?.lastName);
    formData.append('gender', gender);
    formData.append('country', values?.country);
    formData.append(
      'dateOfBirth',
      selectedDate === 'DOB' ? values?.date : selectedDate?.toISOString(),
    );
    formData.append('bio', values?.bio);
    values?.links.forEach(link => {
      formData.append('links', link);
    });

    if (data?.profilePicture) {
      formData.append('profilePicture', {
        uri: data?.profilePicture,
        name: 'profilePicture.jpg',
        type: 'image/jpeg',
      });
    }

    if (data?.coverImage) {
      formData.append('coverImage', {
        uri: data?.coverImage,
        name: 'coverImage.jpg',
        type: 'image/jpeg',
      });
    }

    console.log('formData', formData);

    try {
      const response = await apiCall?.editProfile(formData);
      if (response) {
        console.log('Profile updated successfully', response);
        toast('success', 'Profile updated successfully');
        setLoading(false);
        setEditProfile(false);
        setData({
          firstName: values?.firstName,
          lastName: values?.lastName,
          gender: gender,
          country: values?.country,
          dateOfBirth:
            selectedDate === 'DOB' ? values?.date : selectedDate?.toISOString(),
          links: values?.links,
          profilePicture: data?.profilePicture,
          coverImage: data?.coverImage,
        });
      }
    } catch (error) {
      console.log('Error updating profile', error);
      toast('error', 'Error updating profile');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles?.container}>
      <Text style={styles?.name}>{`${data?.firstName} ${data?.lastName}`}</Text>
      <View style={styles?.form}>
        <View style={styles?.row}>
          <Controller
            control={control}
            name="firstName"
            rules={{
              required: 'First Name is required',
            }}
            render={({field: {value, onChange}}) => (
              <View>
                <AuthInput
                  placeholder="First Name"
                  value={value}
                  onChangeText={onChange}
                  inputStyle={[
                    styles?.inputStyle,
                    {width: width * 0.4, marginRight: width * 0.01},
                  ]}
                />
                {errors?.firstName?.message && (
                  <Text style={styles?.errorText}>
                    {errors?.firstName?.message}
                  </Text>
                )}
              </View>
            )}
          />
          <Controller
            control={control}
            name="lastName"
            rules={{
              required: 'Last Name is required',
            }}
            render={({field: {value, onChange}}) => (
              <View>
                <AuthInput
                  placeholder="Last Name"
                  value={value}
                  onChangeText={onChange}
                  inputStyle={[
                    styles?.inputStyle,
                    {width: width * 0.4, marginLeft: width * 0.01},
                  ]}
                />
                {errors?.lastName?.message && (
                  <Text style={styles?.errorText}>
                    {errors?.lastName?.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setShowGender(prev => !prev);
          }}
          style={[
            styles?.inputStyle,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: width * 0.02,
              paddingVertical: height * 0.014,
            },
          ]}>
          <Text
            style={[
              styles?.inputTextColor,
              {color: gender ? colors?.text : colors?.gray12},
            ]}>
            {gender ? gender : 'Gender'}
          </Text>
          <DropDown height={height * 0.02} width={width * 0.035} />
        </TouchableOpacity>
        <Controller
          control={control}
          rules={{
            required: 'Country is required.',
          }}
          name="country"
          render={({field: {value}}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setShowCountry(!showCountry);
                }}
                style={[
                  styles?.inputStyle,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: width * 0.02,
                    paddingVertical: height * 0.01,
                  },
                ]}>
                <Text style={styles?.phoneText}>
                  {/* {countryDetails
                    ? `${countryDetails?.flag} ${countryDetails?.dial_code}`
                    : 'Country'} */}
                  {value}
                </Text>
                <View>
                  <DropDown height={height * 0.02} width={width * 0.035} />
                </View>
              </TouchableOpacity>
            );
          }}
        />
        {/* <Controller
          control={control}
          name="country"
          rules={{
            required: 'Country is required',
          }}
          render={({field: {value, onChange}}) => (
            <View>
              <AuthInput
                placeholder="Country"
                value={value}
                onChangeText={onChange}
                inputStyle={[
                  styles?.inputStyle,
                  {paddingVertical: height * 0.005},
                ]}
              />
              {errors?.country?.message && (
                <Text>{errors?.country?.message}</Text>
              )}
            </View>
          )}
        /> */}
        <Controller
          control={control}
          name="date"
          rules={{
            required: 'Date of birth is required',
          }}
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <TouchableOpacity
                onPress={() => setShowDate(prev => !prev)}
                style={[
                  styles?.inputStyle,
                  {
                    //   flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: height * 0.005,
                  },
                ]}>
                <AuthInput
                  disable={true}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={moment(value)?.format('DD-MM-YYYY')}
                  placeholder="Date Of Birth"
                  inputStyle={{color: colors?.text}}
                  icon={'calendar1'}
                />
              </TouchableOpacity>
            );
          }}
        />

        <Controller
          name="bio"
          control={control}
          rules={{
            required: 'Bio is required',
          }}
          render={({field: {value, onChange}}) => (
            <View
              style={{
                backgroundColor: colors?.extraLightGrey,
                borderRadius: width * 0.02,
                height: height * 0.18,
                padding: width * 0.02,
              }}>
              <Text style={styles?.bioHeading}>Bio</Text>
              <TextInput
                style={styles?.bioInput}
                placeholder="Say something about yourself..."
                placeholderTextColor={colors?.gray12}
                editable={true}
                multiline={true}
                numberOfLines={5}
                scrollEnabled={true}
                maxLength={maxChars}
                value={value}
                onChangeText={text => {
                  setChars(text.length);
                  onChange(text);
                }}
              />
              <Text style={styles?.chars}>
                {chars}/{maxChars}
              </Text>
              {errors?.bio?.message && (
                <Text style={styles?.errorText}>{errors?.bio?.message}</Text>
              )}
            </View>
          )}
        />

        {fields.map((field, index) => (
          <Controller
            key={field.id}
            control={control}
            name={`links.${index}`}
            rules={{required: 'Link is required.'}}
            render={({field: {value, onChange}}) => (
              <View>
                <AuthInput
                  placeholder="Links"
                  value={value}
                  onChangeText={onChange}
                  inputStyle={[
                    styles?.inputStyle,
                    {paddingVertical: height * 0.005},
                  ]}
                />

                {index === 0 ? (
                  <TouchableOpacity
                    style={styles?.addMoreButton}
                    onPress={() => append('')}>
                    <Text style={styles?.addMoreText}>Add more links</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles?.addMoreButton}
                    onPress={() => remove(index)}>
                    <GradientCross width={width * 0.05} height={width * 0.05} />
                  </TouchableOpacity>
                )}

                {errors?.links?.[index]?.message && (
                  <Text style={{color: 'red'}}>
                    {errors.links[index].message}
                  </Text>
                )}
              </View>
            )}
          />
        ))}

        <TouchableOpacity style={styles?.link}>
          <GradientText style={styles?.linkText}>
            Switch to a creator account
          </GradientText>
        </TouchableOpacity>
        <TouchableOpacity style={styles?.link}>
          <GradientText style={styles?.linkText}>
            Switch to a business account
          </GradientText>
        </TouchableOpacity>
      </View>

      <GenderModal
        modalVisible={showGender}
        setModalVisible={setShowGender}
        setGender={setGender}
        value={gender}
      />
      <CountryPickerDropDown
        showCountry={showCountry}
        setValue={setValue}
      />
      <DateMonthPicker
        showDate={showDate}
        setShowDate={setShowDate}
        setValue={setValue}
      />
      <PrimaryButton
        onPress={handleSubmit(onSubmit)}
        title="Update"
        isLoading={loading}
      />
    </ScrollView>
  );
};

export default EditProfile;

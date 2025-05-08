import {View, Text} from 'react-native';
import React from 'react';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
const DateMonthPicker = ({setSelectedDate, showDate, selectedDate,setShowDate}) => {
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 13,
    today.getMonth(),
    today.getDate()
  );
  const handleDateConfirm = date => {
    setSelectedDate(date);
    setShowDate(false);
   };

  const handleDateCancel = () => {
    setShowDate(false);
  };
  return (
    <DatePicker
      modal
      open={showDate}
      date={selectedDate !== 'DOB' ? new Date(selectedDate) : new Date()}
      mode="date"
      onConfirm={handleDateConfirm}
      onCancel={handleDateCancel}
      maximumDate={maxDate}
    />
  );
};

export default DateMonthPicker;

import DatePicker from 'react-native-date-picker';
const DateMonthPicker = ({
  setSelectedDate,
  showDate,
  selectedDate,
  setShowDate,
  setValue,
}) => {
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() - 13,
    today.getMonth(),
    today.getDate(),
  );
  const handleDateConfirm = date => {
    console.log('Selected date', date?.toISOString());
    setSelectedDate && setSelectedDate(date);
    setValue && setValue('date', date?.toISOString());
    setShowDate(false);
  };

  const handleDateCancel = () => {
    setShowDate(false);
  };
  return (
    <DatePicker
      modal
      open={showDate}
      date={
        selectedDate !== 'DOB' || selectedDate !== null
          ? new Date(selectedDate)
          :
           new Date()
      }
      mode="date"
      onConfirm={handleDateConfirm}
      onCancel={handleDateCancel}
      maximumDate={maxDate}
    />
  );
};

export default DateMonthPicker;

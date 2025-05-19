import DatePicker from 'react-native-date-picker';
const DateTimePicker = ({
  setSelectedDate,
  showDate,
  selectedDate,
  setShowDate,
}) => {
  const handleDateConfirm = datetime => {
    console.log('Date Time', new Date(datetime).toISOString());
    setSelectedDate(new Date(datetime).toISOString());
    setShowDate(false);
  };

  const handleDateCancel = () => {
    setShowDate(false);
  };
  return (
    <DatePicker
      modal
      open={showDate}
      date={selectedDate !== '' ? new Date(selectedDate) : new Date()}
      mode="datetime"
      onConfirm={handleDateConfirm}
      onCancel={handleDateCancel}
    />
  );
};

export default DateTimePicker;

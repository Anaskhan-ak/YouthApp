import { Text, View } from 'react-native';
import { styles } from '../styles/Calender';

const Calendar = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.toLocaleString('default', {month: 'short'});
  // const currentYear = currentDate.getFullYear();

  const numberOfDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const startingDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const days = Array.from({length: numberOfDays}, (_, index) => {
    const day = index + 1;
    const isToday = currentDay === day;
    return (
      <Text key={day} style={[styles?.day, isToday && styles?.today]}>
        {day}
      </Text>
    );
  });

  return (
    <View style={styles?.container}>
      <Text style={styles?.headerText}>{currentMonth} </Text>
      <View style={styles?.daysContainer}>
        {Array(startingDay)
          .fill(null)
          .map((_, index) => (
            <Text key={`empty-${index}`} style={styles?.emptyDay} />
          ))}
        {days}
      </View>
    </View>
  );
};


export default Calendar;

import { Text, View } from 'react-native';
import { styles } from '../styles';

const DateComponent = () => {
    return (
      <View style={styles?.dateContainer}>
        <Text style={styles?.day}>
          {
            [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ][new Date().getDay()]
          }
        </Text>
        <Text style={styles?.hours}>
          {new Date().getHours().toString().padStart(2, '0')}
        </Text>
        <Text style={styles?.minutes}>
          {new Date().getMinutes().toString().padStart(2, '0')}
        </Text>
      </View>
    );
  };

  export default DateComponent
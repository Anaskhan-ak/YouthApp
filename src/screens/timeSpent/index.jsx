import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import {
  BlackDropdown,
  BlackDroprightIcon,
  RedDropdown,
} from '../../assets/images/svgs';
import InboxHeader from '../../components/headers/chat/inbox';
import { width } from '../../constant';
import { colors } from '../../utils/colors';
import DropdownTabs from './components/DropdownTabs';
import { styles } from './styles';


const TimeSpent = () => {
  const [graph, setGraph] = useState(false);
  const [todayDropdown, setTodayDropdown] = useState(false);
  const [thisWeekDropdown, setThisWeekDropdown] = useState(false);
  const [lastWeekDropdown, setLastWeekDropdown] = useState(false);
  const navigation = useNavigation();
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [3.83, 4.17, 3.89, 6.17, 2.27, 2, 5.1],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <InboxHeader title="Time Spent" backPress={() => navigation.goBack()} />
      <ScrollView style={styles.content}>
        <Text style={styles.heading}>2 hr 15 min is your daily average</Text>
        <View
          style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setGraph(!graph)}>
            <RedDropdown />
          </TouchableOpacity>
          <Text style={styles.subheading}>20% lower from last week</Text>
        </View>
        {graph && (
          <BarChart
            style={styles.graphStyle}
            data={data}
            width={width * 0.85}
            height={220}
            chartConfig={chartConfig}
            showBarTops={false}
            showValuesOnTopOfBars={true}
          />
        )}
        <View style={{marginVertical: 15}}>
          <TouchableOpacity
            style={todayDropdown ? styles.activeButton : styles.button}
            onPress={() => {
              setTodayDropdown(!todayDropdown);
            }}>
            <Text style={styles.buttonText}>Today</Text>
            <View style={styles.buttonDropdown}>
              <Text style={styles.gradientText}>3 hr 38 min</Text>
              {todayDropdown ? <BlackDropdown /> : <BlackDroprightIcon />}
            </View>
          </TouchableOpacity>
          {todayDropdown && <DropdownTabs />}
          <TouchableOpacity
            style={thisWeekDropdown ? styles.activeButton : styles.button}
            onPress={() => {
              setThisWeekDropdown(!thisWeekDropdown);
            }}>
            <Text style={styles.buttonText}>This Week</Text>
            <View style={styles.buttonDropdown}>
              <Text style={styles.gradientText}>8 hr 8 min</Text>
              {thisWeekDropdown ? <BlackDropdown /> : <BlackDroprightIcon />}
            </View>
          </TouchableOpacity>
          {thisWeekDropdown && <DropdownTabs />}
          <TouchableOpacity
            style={lastWeekDropdown ? styles.activeButton : styles.button}
            onPress={() => {
              setLastWeekDropdown(!lastWeekDropdown);
            }}>
            <Text style={styles.buttonText}>Last 7 days</Text>
            <View style={styles.buttonDropdown}>
              <Text style={styles.gradientText}>12 hr 34 min</Text>

              {lastWeekDropdown ? <BlackDropdown /> : <BlackDroprightIcon />}
            </View>
          </TouchableOpacity>
          {lastWeekDropdown && <DropdownTabs />}
        </View>
        <Text style={styles.subheading}>
          The more you spend time within our Eco-system, the more rewards you
          get. <Text style={styles.gradientText}>Learn more!</Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default TimeSpent;

const chartConfig = {
  backgroundGradientFrom: colors.white,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: colors.white,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  fillShadowGradientFrom: colors.RGB1, // Start of the gradient color
  fillShadowGradientTo: colors.RGB2, // End of the gradient color
  fillShadowGradientFromOpacity: 1, // Opacity of the gradient
  fillShadowGradientToOpacity: 1, // Opacity of the gradient
  decimalPlaces: 0,
  barPercentage: 1,
  propsForBackgroundLines: {
    strokeDasharray: '', // This removes the dashed lines and makes them straight
    strokeWidth: 1, // Thickness of horizontal lines
    stroke: colors.gray11, // Color of horizontal lines
  },
  style: {
    labels: {
      fontWeight: 'bold', // Increase font weight for labels
    },
  },
  propsForLabels: {
    fontWeight: 'bold', // Apply bold font weight to both horizontal and vertical labels
  },
};

import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { RateUs } from '../../../assets/images/svgs';
import GradientText from '../../text/GradientText';
import { styles } from './styles';

const RateModal = props => {
  const handleClose = () => {
    setModal(false);
  };
  return (
    <View style={styles?.container}>
      <Modal
        animationType="slide"
        visible={props?.visible}
        transparent
        statusBarTranslucent>
        <Pressable style={styles.modalBackground} onPress={handleClose}>
          <View style={styles?.content}>
            <View style={styles?.image}><RateUs/></View>
            <View style={styles?.header}>
              <Text style={styles?.headerText}>Enjoying</Text>
              <GradientText style={styles?.headerGradientText}>{' '}YouthApp</GradientText>
            </View>
            <Text style={styles?.text}>
              Give us a quick shout-out by leaving a review! Your feedback fuels
              our journey.
            </Text>
            <View style={styles?.buttonTab}>
                <TouchableOpacity style={styles?.button}><Text style={styles?.buttonText}>Not Now</Text></TouchableOpacity>
                <TouchableOpacity style={styles?.button}><Text style={styles?.buttonText}>Let's Gooo</Text></TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default RateModal;


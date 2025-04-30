import { StyleSheet, View } from 'react-native';
import { colors } from '../../../../utils/colors';

const InviteModal = (props) => {
  return (
    <View style={styles?.container}>
      {/* <Modal animationType='slide' visible={props?.visible} >
        <View style={styles?.content}>
            <View style={styles?.dash}/>
        </View>
      </Modal> */}
    </View>
  );
};

export default InviteModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content : {
    backgroundColor : colors?.white
  },
  dash : {
    backgroundColor : colors?.gray11,
    width : width * 0.1,
    height : height * 0.01
  }
});

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import { height } from '../../../../constant';

const MultipleAccountsModal = ({ref, setVisible}) => {
  return (
    <BottomSheet
      ref={ref}
      snapPoints={['25%']}
      enablePanDownToClose={true}
      index={-1}
      onChange={index => setVisible(index >= 0)}>
      <BottomSheetView style={styles?.container}>
        <View style={styles?.button}><PrimaryButton title="Add an exisitng account" /></View>
        <View style={styles?.button}><PrimaryButton title="Create a new account" /></View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default MultipleAccountsModal;

const styles = StyleSheet.create({
  container: {},
  button : {
    marginVertical : height * 0.005
  }
});

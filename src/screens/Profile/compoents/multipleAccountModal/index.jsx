import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';

const MultipleAccountsModal = ({ref, setVisible}) => {
  return (
    <BottomSheet
      ref={ref}
      snapPoints={['25%']}
      enablePanDownToClose={true}
      index={-1}
      onChange={index => setVisible(index >= 0)}>
      <BottomSheetView style={styles?.container}>
        <PrimaryButton title="Add an exisitng account" />
        <PrimaryButton title="Create a new account" />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default MultipleAccountsModal;

const styles = StyleSheet.create({
  container: {},
});

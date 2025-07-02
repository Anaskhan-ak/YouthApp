import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { StyleSheet } from 'react-native'
import PrimaryButton from '../../../../components/buttons/PrimaryButton'

const MultipleAccountsModal = ({ref}) => {
  return (
   <BottomSheet ref={ref} snapPoints={['25%']} enablePanDownToClose={true}>
    <BottomSheetView style={styles?.container}>
        <PrimaryButton title='Add an exisitng account' />
        <PrimaryButton title='Create a new account'/>
    </BottomSheetView>
   </BottomSheet>
  )
}

export default MultipleAccountsModal

const styles = StyleSheet.create({
    container : {

    }
})
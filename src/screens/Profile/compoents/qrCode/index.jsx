import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { styles } from './styles';

export default function QRSheet({sheetRef, setVisible}) {
  return (
    <BottomSheet
    //   onChange={
    //     setVisible(prev)
    //   }
    //   index={1}
      enablePanDownToClose={true}
      ref={sheetRef}>
      <BottomSheetView style={styles?.contentContainer}>
       {/* <LinearGradient style={styles?.gradientBorder}>
        <QRcode/>
       </LinearGradient>
       <View style={styles?.iconsContainer}>
        <LinearGradient>
          
        </LinearGradient>
       </View> */}
      </BottomSheetView>
    </BottomSheet>
  );
}

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import { QRcode } from '../../../../assets/images/svgs';
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
       <LinearGradient style={styles?.gradientBorder}>
        <QRcode/>
       </LinearGradient>
      </BottomSheetView>
    </BottomSheet>
  );
}

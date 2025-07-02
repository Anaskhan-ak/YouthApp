import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import { ChainIcon, ShareProfileIcon } from '../../../../assets/images/svgs';
import { width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { styles } from './styles';

export default function QRSheet({sheetRef, setVisible}) {
  return (
    <BottomSheet
        onChange={index => 
          setVisible(index >= 0)
        }
      index={-1}
      enablePanDownToClose={true}
      snapPoints={['55%']}
      ref={sheetRef}>
      <BottomSheetView style={styles?.contentContainer}>
        <LinearGradient
          colors={[colors?.RGB1, colors?.RGB2]}
          style={styles?.gradientBorder}>
          <View style={styles?.qrcode}>
            <QRCode value="http://awesome.link.qr" size={width * 0.4} />
          </View>
        </LinearGradient>

        <View style={styles?.iconsContainer}>
          <TouchableOpacity>
            <LinearGradient
              colors={[colors?.RGB1, colors?.RGB2]}
              style={styles?.icon}>
              <ChainIcon />
            </LinearGradient>
            <Text style={styles?.iconText}>Copy Link</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles?.button}>
            <LinearGradient
              colors={[colors?.RGB1, colors?.RGB2]}
              style={styles?.icon}>
              <ShareProfileIcon />
            </LinearGradient>
            <Text style={styles?.iconText}>Share Profile</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

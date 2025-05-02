import {FlatList, Image, Modal, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../../../utils/colors';
import {height, width} from '../../../../constant';
import { RightArrow } from '../../../../assets/images/svgs';
import { fonts } from '../../../../utils/fonts';

const InviteModal = props => {
  const contacts = [
    {
      id : 1,
      name : 'Sannya Wasim',
      photo : require('../../../../assets/images/SignupImage.jpeg')
    },
    {
      id : 2,
      name : 'Sannya Wasim',
      photo : require('../../../../assets/images/SignupImage.jpeg')
    },
    {
      id : 3,
      name : 'Sannya Wasim',
      photo : require('../../../../assets/images/SignupImage.jpeg')
    }
  ]
  return (
    <View style={styles?.container}>
      <Modal
        animationType="slide"
        visible={props?.visible}
        transparent={true}
        statusBarTranslucent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles?.content}>
              <View style={styles?.dash} />
              <Text style={styles?.heading}>Share To</Text>
              <View>
                <FlatList data={contacts} renderItem={({item}) => {
                  return (
                    <TouchableOpacity style={styles?.contact}>
                      <Image source={item?.photo} style={styles?.userImage}/>
                      <Text style={styles?.userName}>{item?.name?.length > 6 ? `${item?.name?.slice(0,6)}...` : item?.name}</Text>
                    </TouchableOpacity>
                  )
                }} horizontal
                style={styles?.list1}
                contentContainerStyle = {styles?.list1Container}
                ListFooterComponent={() => {
                  return(
                    <View style={styles?.moreContactsIcon}>
                      <RightArrow/>
                    </View>
                  )
                }}
                />
                <View style={styles?.line}/>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InviteModal;

const styles = StyleSheet.create({
  container: {
    height: height * 0.4,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: to dim the background
  },
  modalContainer: {
    height: height * 0.4, // Adjust this to reduce height
    backgroundColor: colors?.white,
    borderTopLeftRadius: width * 0.08,
    borderTopRightRadius: width * 0.08,
    padding: width * 0.04,
  },
  content: {
    // backgroundColor: 'red',
    padding : width * 0.005,
    flex: 1,
  },
  dash: {
    backgroundColor: colors?.gray11,
    width: width * 0.2,
    height: height * 0.005,
    alignSelf: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  contact : {
    margin : width * 0.01
  },
  userImage : {
    width : width * 0.13,
    height : height * 0.06,
    borderRadius : width * 0.02,
    
  },
  userName : {
    fontSize : width * 0.03,
    textAlign : 'center'
  },
  list1 : {
    // backgroundColor : 'yellow',
  },
  list1Container : {
    alignItems : 'center'
  },
  moreContactsIcon : {
    width : width * 0.12,
    height : height * 0.058,
    borderRadius : width * 0.02,
    backgroundColor : colors?.gray11 ,
    alignItems : 'center',
    justifyContent : 'center',
    marginTop : -height * 0.015,
    marginLeft : width * 0.01
  },
  heading : {
    fontFamily : fonts?.montserratBold,
    fontSize : width * 0.045,
    color : colors?.black,
    textAlign : 'center',
    marginTop : height * 0.005,
    marginBottom : height * 0.02
  },
  line : {
    width : width * 0.7,
    height : 1,
    backgroundColor : colors?.black,
    
  }
});

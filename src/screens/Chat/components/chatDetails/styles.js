import { StyleSheet } from 'react-native';
import { height, width } from '../../../../constant';
import { colors } from '../../../../utils/colors';
import { fonts } from '../../../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop : height * 0.03
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.3,
    borderWidth: width * 0.01,
    borderColor: colors?.white,
    shadowColor: colors?.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2,
  },
  title: {
    fontFamily: fonts?.montserratExtraBold,
    fontSize: width * 0.06,
    color: colors?.text,
  },
  subText: {
    fontFamily: fonts?.montserratRegular,
    fontSize: width * 0.03,
    color: colors?.textGray,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: height * 0.01,
    marginHorizontal: width * 0.3,
    width : width * 0.33
  },
  searchButton : {
    backgroundColor : colors?.gray,
    alignItems : "center",
    justifyContent : "center",
    padding : width * 0.02,
    borderRadius : width * 0.1,
    tintColor : colors?.black
  },
  itemContainer: {
    backgroundColor: colors?.gray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: height * 0.005,
    borderRadius: width * 0.02,
    padding : width * 0.02,
    width : width * 0.9
  },
  itemTitle: {
    fontFamily: fonts?.montserratBold,
    fontSize: width * 0.04,
    color: colors?.text,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontFamily: fonts?.montserratRegular,
    fontSize: width * 0.03,
    color: colors?.text,
  },
  rightArrowButton: {
    marginLeft: width * 0.02,
    borderWidth: width * 0.005,
    borderColor: colors?.black,
    borderRadius: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.01,
  },
  optionsList: {
    marginVertical : height * 0.01
  },
  participantHeading: {
    fontFamily: fonts?.montserratRegular,
    fontSize: width * 0.04,
    color: colors?.textGray,
    textAlign : 'left',
    marginBottom : height * 0.01
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: height * 0.01,
    width : width * 0.9
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.1,
  },
  contactName: {
    fontFamily: fonts?.montserratSemiBold,
    fontSize: width * 0.04,
    color: colors?.text,
    marginLeft: width * 0.02,
  },
  listContainer : {
    // height : height * 0.38,
    marginBottom : height * 0.05,
  },
  list : {
    marginBottom : height * 0.1
  },
  editTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editTitle: {
    marginLeft: width * 0.02,
  },
  editImageContainer : {
    alignItems : "center",
    justifyContent : 'center',
  },
editImage : {
    left : width * 0.1,
    top : -height * 0.03
}
});

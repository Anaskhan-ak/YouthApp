import Toast from 'react-native-toast-message';

export const toast = (type, title, content,showConstant) => {
  Toast.show({
    type: type,
    text1: title,
    text2: content,
    autoHide:showConstant?false:true
  });
};
export const hideToast = () => {
    Toast.hide();
  };

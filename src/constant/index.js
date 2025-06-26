import { Dimensions, PixelRatio } from 'react-native';

export const {height, width} = Dimensions.get('window')

export const Pixels = (pixels) => {
    return PixelRatio?.getFontScale()*pixels
}
export const isEmail = (value) => /\S+@\S+\.\S+/.test(value);
export const isPhoneNumber = (value) => /^\+?\d{7,15}$/.test(value);

import { Dimensions, PixelRatio } from 'react-native';

export const {height, width} = Dimensions.get('window')

export const Pixels = (pixels) => {
    return PixelRatio?.getFontScale()*pixels
}

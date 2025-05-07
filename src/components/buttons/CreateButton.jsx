import { TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import GradientText from '../../components/text/GradientText'
import { colors } from '../../utils/colors'
import { CreateButtonStyles as styles } from './styles'

const CreateButton = (props) => {
  return (
    <LinearGradient colors={[colors?.RGB1, colors?.RGB2]} style={styles?.container}>
        <TouchableOpacity style={styles?.button} onPress={() => props?.onPress}>
            <GradientText style={styles?.text}>{props?.title}</GradientText>
        </TouchableOpacity>
    </LinearGradient>
  )
}

export default CreateButton
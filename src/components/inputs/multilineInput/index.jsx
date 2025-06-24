import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Sparkles } from '../../../assets/images/svgs';
import { colors } from '../../../utils/colors';
import { styles } from './styles';

const MultilineInput = ({
  postType,
  chars,
  setChars,
  maxChars,
  placeholder,
  placeholderTextColor,
  editable,
  multiline,
  numberOfLines,
  scrollEnabled,
  value,
  onChangeText,
  repostPress
}) => {

  const handleInput = (text) => {
    onChangeText(text)
    setChars && setChars(text?.length)
  }
  return (
    <View style={styles?.container}>
      <TextInput
        style={styles?.input}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        scrollEnabled={scrollEnabled}
        value={value}
        onChangeText={handleInput}
        maxLength={maxChars}
      />
      {postType === 'post' && (
        <View style={styles?.footer}>
          <View style={styles?.row}>
            <TouchableOpacity style={styles?.button}>
            <Sparkles width={10} height={10}/>
            <Text style={styles?.buttonText}>Rewrite with AI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles?.button}>
            <Sparkles width={10} height={10}/>
            <Text style={styles?.buttonText}>Generate Image</Text>
          </TouchableOpacity>
          </View>
          <Text style={styles?.character}>{`${chars}/${maxChars}`}</Text>
        </View>
      )}

      {postType === 'repost' && (
        <View style={styles?.footer}>
          <View style={styles?.row}>
            <TouchableOpacity style={styles?.button}>
            <Sparkles width={10} height={10}/>
            <Text style={styles?.buttonText}>Rewrite with AI</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={repostPress}>
            <LinearGradient style={styles?.repostButton} colors={[colors?.RGB1, colors?.RGB2]}>
              <Text style={styles?.repostText}>Repost</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MultilineInput;

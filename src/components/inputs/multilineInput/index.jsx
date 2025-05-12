import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Sparkles } from '../../../assets/images/svgs';
import { styles } from './styles';

const MultilineInput = ({
  postType,
  chars,
  maxChars,
  placeholder,
  placeholderTextColor,
  editable,
  multiline,
  numberOfLines,
  scrollEnabled,
  value,
  onChangeText,
}) => {
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
        onChangeText={onChangeText}
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
    </View>
  );
};

export default MultilineInput;

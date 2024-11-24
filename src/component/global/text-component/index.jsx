import { Text } from 'react-native';

// Define the reusable text component
const TextComponent = ({ css, text }) => {
    return (
        <Text className={css}>
            {text}
        </Text>
    );
}

export default TextComponent;

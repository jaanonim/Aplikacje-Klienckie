import { View, TouchableNativeFeedback, TouchableOpacity } from "react-native";

function Button({ onPress, children, style }) {
    return (
        <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
                "rgba(255,255,255,0.3)",
                true
            )}
            onPress={onPress}
        >
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    borderRadius: 100,
                    ...style,
                }}
            >
                {children}
            </View>
        </TouchableNativeFeedback>
    );
}
export default Button;

import { View, Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Theme from "../Theme";
import { TouchableNativeFeedback } from "react-native";

function ActionButton({ onClick }) {
    return (
        <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(
                "rgba(255,255,255,1)",
                false
            )}
            onPress={() => onClick()}
        >
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 80,
                    position: "absolute",
                    zIndex: 1000,
                    bottom: 20,
                    left: (Dimensions.get("window").width - 80) / 2,
                    backgroundColor: Theme.accent,
                    borderRadius: 100,
                }}
            >
                <AntDesign name="plus" size={40} color={Theme.text} />
            </View>
        </TouchableNativeFeedback>
    );
}

export default ActionButton;

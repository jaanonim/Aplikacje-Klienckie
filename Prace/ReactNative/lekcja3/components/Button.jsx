import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Theme from "../Theme";

function Button({ children, onClick, accent = false, style }) {
    return (
        <TouchableOpacity
            style={{
                padding: 15,
                margin: 20,
                borderRadius: 5,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: accent ? Theme.accent : Theme.primary,
                ...style,
            }}
            onPress={onClick}
        >
            <Text style={{ color: Theme.text }}>{children}</Text>
        </TouchableOpacity>
    );
}

export default Button;

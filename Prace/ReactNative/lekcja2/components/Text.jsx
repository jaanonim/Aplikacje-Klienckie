import React from "react";
import { Text as T } from "react-native";
import Theme from "../Theme";

function Text({ style, children, main = false }) {
    return (
        <T
            style={{
                fontSize: 20,
                color: main ? Theme.text : Theme.textPrimary,
                ...style,
            }}
        >
            {children}
        </T>
    );
}

export default Text;

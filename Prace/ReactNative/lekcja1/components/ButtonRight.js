import React from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export function ButtonRight({ text, onClick, color = "#3a7", size = 50 }) {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: color,
                width: "100%",
                height: "20%",
                justifyContent: "center",
                alignItems: "center",
            }}
            onPress={() => {
                onClick(text);
            }}
        >
            <Text
                style={{
                    color: "#fff",
                    fontSize: size,
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
}

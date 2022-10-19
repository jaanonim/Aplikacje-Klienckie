import React from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export function ButtonLeft({ text, onClick, color = "#333" }) {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: color,
                width: "33.33333333333%",
                height: "25%",
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
                    fontSize: 50,
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
}

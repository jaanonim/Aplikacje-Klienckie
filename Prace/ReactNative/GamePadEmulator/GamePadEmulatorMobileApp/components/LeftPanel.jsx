import React, { useState, useEffect, useCallback } from "react";
import {
    Switch,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

function LeftPanel({ onPress }) {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <View style={{ flexDirection: "row" }}>
                <Button
                    onPress={() => {
                        onPress(1);
                    }}
                    style={{
                        backgroundColor: "#0e7fc8",
                        width: 50,
                        height: 50,
                    }}
                >
                    <AntDesign name="caretup" size={24} color="white" />
                </Button>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Button
                    onPress={() => {
                        onPress(2);
                    }}
                    style={{
                        backgroundColor: "#0e7fc8",
                        width: 50,
                        height: 50,
                    }}
                >
                    <AntDesign name="caretleft" size={24} color="white" />
                </Button>
                <View
                    style={{
                        width: 50,
                        height: 50,
                    }}
                ></View>
                <Button
                    onPress={() => {
                        onPress(3);
                    }}
                    style={{
                        backgroundColor: "#0e7fc8",
                        width: 50,
                        height: 50,
                    }}
                >
                    <AntDesign name="caretright" size={24} color="white" />
                </Button>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Button
                    onPress={() => {
                        onPress(4);
                    }}
                    style={{
                        backgroundColor: "#0e7fc8",
                        width: 50,
                        height: 50,
                    }}
                >
                    <AntDesign name="caretdown" size={24} color="white" />
                </Button>
            </View>
        </View>
    );
}
export default LeftPanel;

import React, { useState, useEffect, useCallback } from "react";
import {
    Switch,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import Button from "./Button";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

function RightPanel({ onPress }) {
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
                    <Feather name="triangle" size={24} color="#38dec8" />
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
                    <Feather name="square" size={24} color="#d591bd" />
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
                    <Feather name="circle" size={24} color="#f16e6c" />
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
                    <Text style={{ fontSize: 24, color: "#9bade4" }}>X</Text>
                </Button>
            </View>
        </View>
    );
}
export default RightPanel;

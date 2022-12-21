import React, { useState, useEffect, useCallback } from "react";
import {
    Switch,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import { io } from "socket.io-client";
import { useRoute } from "@react-navigation/native";
import { DeviceMotion } from "expo-sensors";
import * as Haptics from "expo-haptics";
import { useFocusEffect } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import Button from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";

let socket = null;

export default function GamePad() {
    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [isConnected, setIsConnected] = useState(false);
    const [subscription, setSubscription] = useState(null);
    const [isPortrait, setIsPortrait] = useState(true);
    const route = useRoute();

    DeviceMotion.setUpdateInterval(16);

    const _subscribe = () => {
        setSubscription(
            DeviceMotion.addListener((d) => {
                if (d) {
                    const data = {
                        x: d.rotation.beta,
                        y: d.rotation.gamma,
                        z: d.rotation.alpha,
                    };
                    setData(data);
                    if (socket) socket.emit("pos", data);
                }
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useFocusEffect(
        useCallback(() => {
            ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP
            );

            const url = route.params.url.replace("gm://", "http://").trim();
            socket = io(url);

            socket.on("connect", () => {
                console.log("conn");
                setIsConnected(true);
                if (socket) {
                    socket.emit("con", { data: "lol" });
                    console.log("ok");
                }
            });
            socket.on("disconnect", () => {
                console.log("dis");
                setIsConnected(false);
            });

            socket.on("haptic", ({ large_motor, small_motor }) => {
                if (large_motor > 100) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                }
                if (small_motor > 100) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                }
            });

            _subscribe();

            setIsPortrait(true);

            return () => {
                socket.close();
                socket = null;
                _unsubscribe();
            };
        }, [])
    );

    return (
        <>
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    flexDirection: isPortrait ? "column" : "row",
                }}
            >
                <LeftPanel
                    onPress={(v) => {
                        if (socket)
                            socket.emit("button", {
                                id: v + 4,
                            });
                    }}
                ></LeftPanel>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <View
                        style={{
                            paddingTop: 20,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ fontSize: 20 }}>Connection</Text>
                        <Ionicons
                            name={
                                isConnected
                                    ? "md-checkmark-circle"
                                    : "md-close-circle"
                            }
                            size={40}
                            color={isConnected ? "green" : "red"}
                        />
                    </View>

                    <Text style={{ paddingTop: 10, fontSize: 20 }}>
                        Accelerometer
                    </Text>
                    <View style={{ padding: 10 }}>
                        <Text>x: {Math.round(x * 1000) / 1000}</Text>
                        <Text>y: {Math.round(y * 1000) / 1000}</Text>
                        <Text>z: {Math.round(z * 1000) / 1000}</Text>
                    </View>
                    <View>
                        <Button
                            onPress={() => {
                                if (socket)
                                    socket.emit("calibrate", { x, y, z });
                            }}
                            style={{
                                backgroundColor: "#0e7fc8",
                                borderRadius: 5,
                                minWidth: 100,
                            }}
                        >
                            <Text style={{ color: "white" }}>Calibrate</Text>
                        </Button>
                    </View>
                </View>
                <RightPanel
                    onPress={(v) => {
                        if (socket)
                            socket.emit("button", {
                                id: v,
                            });
                    }}
                ></RightPanel>
            </View>
            <Button
                onPress={() => {
                    setIsPortrait((v) => {
                        if (v) {
                            ScreenOrientation.lockAsync(
                                ScreenOrientation.OrientationLock
                                    .LANDSCAPE_RIGHT
                            );
                            if (socket)
                                socket.emit("orient", { portrait: false });
                            return false;
                        } else {
                            ScreenOrientation.lockAsync(
                                ScreenOrientation.OrientationLock.PORTRAIT_UP
                            );
                            if (socket)
                                socket.emit("orient", { portrait: true });
                            return true;
                        }
                    });
                }}
                style={{
                    position: "absolute",
                    bottom: 10,
                    ...(isPortrait ? { left: 10 } : { right: 10 }),
                    backgroundColor: "#0e7fc8",
                }}
            >
                <MaterialIcons
                    name={
                        isPortrait
                            ? "screen-lock-landscape"
                            : "screen-lock-portrait"
                    }
                    size={20}
                    color="white"
                />
            </Button>
        </>
    );
}

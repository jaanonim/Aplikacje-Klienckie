import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { useFocusEffect } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";

export default function QrScanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const navigator = useNavigation();

    useFocusEffect(
        useCallback(() => {
            ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.PORTRAIT_UP
            );
            const getBarCodeScannerPermissions = async () => {
                const { status } =
                    await BarCodeScanner.requestPermissionsAsync();
                setHasPermission(status === "granted");
            };

            getBarCodeScannerPermissions();

            return () => {
                setScanned(false);
                setHasPermission(false);
            };
        }, [])
    );

    const handleBarCodeScanned = ({ type, data }) => {
        console.log(data);
        if (data.startsWith("gm://")) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            navigator.navigate("GamePad", { url: data });
            setScanned(true);
        }
    };

    // useEffect(() => {
    //     navigator.navigate("GamePad", { url: "gm://192.168.1.105:3000" });
    // }, []);

    if (hasPermission === null || hasPermission === false) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        textAlign: "center",
                        color: "#f00",
                    }}
                >
                    {hasPermission === false
                        ? "No access to camera"
                        : "Requesting for camera permission"}
                </Text>
            </View>
        );
    }

    return (
        <>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#000",
                }}
            >
                <BarCodeScanner
                    onBarCodeScanned={
                        scanned ? undefined : handleBarCodeScanned
                    }
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        position: "absolute",
                        bottom: 20,
                        backgroundColor: "white",
                        borderRadius: 10,
                        textAlign: "center",
                        padding: 5,
                        paddingHorizontal: 20,
                        fontSize: 15,
                    }}
                >
                    Scan QR code to connect to PC
                </Text>
            </View>
        </>
    );
}

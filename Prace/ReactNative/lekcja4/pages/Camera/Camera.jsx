import Text from "../../components/Text";
import Button from "../../components/Button";
import { View, Switch, FlatList, Alert, Image, Platform } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Font from "expo-font";
import Theme from "../../Theme";
import { useEffect, useRef, useState, useCallback } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { useFocusEffect } from "@react-navigation/native";
import { Dimensions, BackHandler } from "react-native";
import { LogBox } from "react-native";
import { ToastAndroid } from "react-native";
import { Camera, CameraType, WhiteBalance, FlashMode } from "expo-camera";
import RadioList from "./components/RadioList";
import { Animated } from "react-native";

LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
]);

const TARGET_ANIM = Dimensions.get("window").height - 90;

function CameraComp() {
    const navigation = useNavigation();
    const route = useRoute();
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [type, setType] = useState(CameraType.front);
    const [ready, setReady] = useState(false);
    const [isSettings, setIsSettings] = useState(false);
    const [sizes, setSizes] = useState([]);
    const camera = useRef(null);
    const [settings, setSettings] = useState({
        WhiteBalance: undefined,
        FlashMode: undefined,
        Size: undefined,
        Ratio: undefined,
    });

    const updateSettingsState = useCallback(() => {
        anim.setValue(isSettings ? 0 : TARGET_ANIM);
        Animated.timing(anim, {
            toValue: isSettings ? TARGET_ANIM : 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        setTimeout(
            () => {
                setIsSettings((s) => !s);
            },
            isSettings ? 1000 : 0
        );
    }, [isSettings]);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (isSettings) {
                    updateSettingsState();
                    return true;
                } else {
                    return false;
                }
            };

            const subscription = BackHandler.addEventListener(
                "hardwareBackPress",
                onBackPress
            );

            return () => subscription.remove();
        }, [isSettings])
    );

    const anim = useRef(new Animated.Value(TARGET_ANIM)).current;

    useEffect(() => {
        requestPermission();
    }, []);

    const width = Dimensions.get("window").width;
    const getHeight = () => {
        if (settings.Ratio) {
            const data = settings.Ratio.split(":");
            return width * (data[0] / data[1]);
        }
        return width * (4 / 3);
    };

    return (
        <>
            {permission?.granted ? (
                <View
                    style={{
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height,
                        backgroundColor: "black",
                    }}
                >
                    <Camera
                        ref={camera}
                        type={type}
                        whiteBalance={settings.WhiteBalance}
                        flashMode={settings.FlashMode}
                        ratio={settings.Ratio}
                        pictureSize={settings.Size}
                        width={width}
                        height={getHeight()}
                        onCameraReady={async () => {
                            const siz = [];
                            const ratio =
                                await camera.current.getSupportedRatiosAsync();
                            await Promise.all(
                                ratio.map(async (r) => {
                                    const v =
                                        await camera.current.getAvailablePictureSizesAsync(
                                            r
                                        );
                                    siz.push(
                                        ...v.map((e) => ({ size: e, ratio: r }))
                                    );
                                    return v;
                                })
                            );
                            setSizes(siz);
                            setReady(true);
                        }}
                    ></Camera>
                    {ready ? (
                        <View
                            style={{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                bottom: 10,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    height: 200,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "row",
                                }}
                            >
                                <Button
                                    onClick={async () => {
                                        setType((current) =>
                                            current === CameraType.back
                                                ? CameraType.front
                                                : CameraType.back
                                        );
                                    }}
                                    style={{ height: 40, padding: 0 }}
                                >
                                    🔄
                                </Button>
                                <Button
                                    onClick={async () => {
                                        try {
                                            const f =
                                                await camera.current.takePictureAsync();
                                            await MediaLibrary.createAssetAsync(
                                                f.uri
                                            );
                                            ToastAndroid.showWithGravity(
                                                "Picture taken successfully.",
                                                ToastAndroid.SHORT,
                                                ToastAndroid.BOTTOM
                                            );
                                            route.params.refetch();
                                        } catch (e) {
                                            console.error(e);
                                        }
                                    }}
                                    style={{
                                        flex: 1,
                                        height: 80,
                                        marginBottom: 60,
                                        padding: 0,
                                    }}
                                >
                                    ⭕
                                </Button>
                                <Button
                                    onClick={async () => {
                                        updateSettingsState();
                                    }}
                                    style={{ flex: 1, height: 40, padding: 0 }}
                                >
                                    🔆
                                </Button>
                            </View>
                        </View>
                    ) : null}
                    {isSettings ? (
                        <Animated.View
                            style={{
                                position: "absolute",
                                left: 0,
                                bottom: 0,
                                width: Dimensions.get("window").width / 2,
                                height: Dimensions.get("window").height - 100,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgba(0,0,0,0.3)",
                                margin: 5,
                                borderRadius: 10,
                                padding: 10,
                                transform: [{ translateY: anim }],
                            }}
                        >
                            <FlatList
                                style={{
                                    width: Dimensions.get("window").width / 2,
                                }}
                                data={[
                                    {
                                        name: "WhiteBalance",
                                        values: Object.keys(WhiteBalance),
                                    },
                                    {
                                        name: "FlashMode",
                                        values: Object.keys(FlashMode),
                                    },
                                    {
                                        name: "Size",
                                        values: sizes,
                                    },
                                ]}
                                renderItem={({ item }) => (
                                    <RadioList
                                        item={item}
                                        onSelect={(v) => {
                                            setSettings((c) => ({
                                                ...c,
                                                ...v,
                                            }));
                                        }}
                                    />
                                )}
                            ></FlatList>
                        </Animated.View>
                    ) : null}
                </View>
            ) : (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text> Missing camera permissions.</Text>
                    <Button
                        onClick={async () => {
                            requestPermission();
                        }}
                        style={{ flexGrow: 0.05 }}
                    >
                        Try again.
                    </Button>
                </View>
            )}
        </>
    );
}
export default CameraComp;

import Text from "../../components/Text";
import Button from "../../components/Button";
import { View, Switch, FlatList, Alert, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Font from "expo-font";
import Theme from "../../Theme";
import { useEffect, useRef, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { Dimensions } from "react-native";
import { LogBox } from "react-native";
import { ToastAndroid } from "react-native";
import { Camera, CameraType, WhiteBalance, FlashMode } from "expo-camera";

LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
]);

function CameraComp() {
    const navigation = useNavigation();
    const route = useRoute();
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [type, setType] = useState(CameraType.front);
    const [ready, setReady] = useState(false);
    const camera = useRef(null);

    useEffect(() => {
        requestPermission();
    }, []);

    return (
        <>
            {permission ? (
                <Camera
                    ref={camera}
                    style={{
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height,
                    }}
                    type={type}
                    onCameraReady={() => {
                        setReady(true);
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
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
                                            : CameraType.back,
                                    );
                                }}
                                style={{ flex: 1, height: 40, padding: 0 }}
                            >
                                🔄
                            </Button>
                            <Button
                                onClick={async () => {
                                    try {
                                        const f =
                                            await camera.current.takePictureAsync();
                                        await MediaLibrary.createAssetAsync(
                                            f.uri,
                                        );
                                        ToastAndroid.showWithGravity(
                                            "Picture taken successfully.",
                                            ToastAndroid.SHORT,
                                            ToastAndroid.BOTTOM,
                                        );
                                        route.params.refetch();
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }}
                                style={{
                                    flex: 1,
                                    height: 80,
                                    marginBottom: 40,
                                    padding: 0,
                                }}
                            >
                                ⭕
                            </Button>
                            <Button
                                onClick={async () => {}}
                                style={{ flex: 1, height: 40, padding: 0 }}
                            >
                                🔆
                            </Button>
                        </View>
                    </View>
                </Camera>
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
                        style={{ flex: 1, height: 40, padding: 0 }}
                    >
                        Try again.
                    </Button>
                </View>
            )}
        </>
    );
}
export default CameraComp;

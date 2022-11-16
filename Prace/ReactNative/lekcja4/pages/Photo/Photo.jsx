import Text from "../../components/Text";
import Button from "../../components/Button";
import { View, Switch, FlatList, Alert, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Font from "expo-font";
import Theme from "../../Theme";
import { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { Dimensions } from "react-native";
import { LogBox } from "react-native";
import { ToastAndroid } from "react-native";
LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
]);

function Photo() {
    const route = useRoute();
    const navigation = useNavigation();

    const aspectRatio = route.params.width / route.params.height;
    const sizeX = Dimensions.get("window").width - 40;
    const sizeY = sizeX * aspectRatio;

    return (
        <>
            <Image
                style={{
                    width: sizeX,
                    height: sizeY,
                    margin: 20,
                }}
                source={{ uri: route.params.uri }}
            ></Image>
            <Text style={{ textAlign: "center" }}>
                {route.params.width}x{route.params.height}
            </Text>
            <View
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                }}
            >
                <Button
                    onClick={async () => {
                        if (Sharing.isAvailableAsync()) {
                            Sharing.shareAsync(route.params.uri);
                        } else {
                            ToastAndroid.showWithGravity(
                                "Cannot share!",
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER,
                            );
                        }
                    }}
                >
                    Share
                </Button>
                <Button
                    onClick={async () => {
                        await MediaLibrary.removeAssetsFromAlbumAsync(
                            route.params.id,
                            route.params.albumId,
                        );
                        await route.params.refetch();
                        navigation.goBack();
                    }}
                >
                    Delete
                </Button>
            </View>
        </>
    );
}
export default Photo;

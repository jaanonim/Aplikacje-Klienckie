import Text from "../../components/Text";
import { View, Switch, FlatList, Alert } from "react-native";
import Button from "../../components/Button";
import { useState, useEffect, useCallback } from "react";
import ListElement from "./components/ListElement";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import Theme from "../../Theme";
import * as MediaLibrary from "expo-media-library";

function Main() {
    const [data, setData] = useState([]);
    const [selectMode, setSelectMode] = useState(false);
    const [layout, setLayout] = useState(true);
    const [permissionResponse, requestPermission] =
        MediaLibrary.usePermissions();
    const navigation = useNavigation();

    const fetchData = useCallback(async () => {
        const { assets, hasNextPage, endCursor } =
            await MediaLibrary.getAssetsAsync({
                first: 100,
                mediaType: "photo",
                sortBy: ["creationTime"],
            });
        const newAssets = assets.map((e) => ({ ...e, selected: false }));
        setData(newAssets);
    }, []);

    const updateData = useCallback(
        (v) => {
            setData((d) => {
                const newV = v(d);
                if (newV.some((e) => e.selected)) setSelectMode(true);
                else setSelectMode(false);
                return newV;
            });
        },
        [data]
    );

    useEffect(() => {
        try {
            requestPermission();
        } catch (e) {}
    }, []);
    useEffect(() => {
        if (permissionResponse?.granted) fetchData();
    }, [permissionResponse]);

    return (
        <>
            {!permissionResponse?.granted ? (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text> Missing gallery permissions.</Text>
                    <Button
                        onClick={async () => {
                            requestPermission();
                        }}
                        style={{ flexGrow: 0.05 }}
                    >
                        Try again.
                    </Button>
                </View>
            ) : (
                <>
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row",
                            }}
                        >
                            <Button
                                onClick={async () => {
                                    setLayout((l) => !l);
                                }}
                                style={{ flex: 1, height: 40, padding: 0 }}
                            >
                                Layout
                            </Button>
                            <Button
                                onClick={async () => {
                                    navigation.navigate("Camera", {
                                        refetch: async () => {
                                            await fetchData();
                                        },
                                    });
                                }}
                                style={{ flex: 1, height: 40, padding: 0 }}
                            >
                                Camera
                            </Button>
                            <Button
                                onClick={async () => {
                                    await Promise.all(
                                        data
                                            .filter((e) => e.selected)
                                            .map(async (e) => {
                                                await MediaLibrary.removeAssetsFromAlbumAsync(
                                                    e.id,
                                                    e.albumId
                                                );
                                            })
                                    );
                                    await fetchData();
                                }}
                                style={{ flex: 1, height: 40, padding: 0 }}
                            >
                                Delete
                            </Button>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 7,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <FlatList
                            key={layout ? "h" : "v"}
                            style={{ flex: 1 }}
                            numColumns={layout ? 5 : 1}
                            data={data}
                            renderItem={({ item }) => (
                                <ListElement
                                    item={item}
                                    isLong={layout}
                                    onLongPress={() => {
                                        updateData((d) =>
                                            d.map((i) =>
                                                i.id === item.id
                                                    ? {
                                                          ...i,
                                                          selected: !i.selected,
                                                      }
                                                    : i
                                            )
                                        );
                                    }}
                                    onPress={() => {
                                        if (selectMode) {
                                            updateData((d) =>
                                                d.map((i) =>
                                                    i.id === item.id
                                                        ? {
                                                              ...i,
                                                              selected:
                                                                  !i.selected,
                                                          }
                                                        : i
                                                )
                                            );
                                        } else {
                                            navigation.navigate("Photo", {
                                                ...item,
                                                refetch: async () => {
                                                    await fetchData();
                                                },
                                            });
                                        }
                                    }}
                                ></ListElement>
                            )}
                        />
                    </View>
                </>
            )}
        </>
    );
}
export default Main;

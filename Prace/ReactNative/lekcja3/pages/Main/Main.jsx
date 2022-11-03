import Text from "../../components/Text";
import { View, Switch, FlatList, Alert } from "react-native";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import ListElement from "./components/ListElement";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import Theme from "../../Theme";

function Main() {
    const [all, setAll] = useState(false);
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        Location.requestForegroundPermissionsAsync();
        const f = async () => {
            const d = await AsyncStorage.getItem("data");
            if (d) setData(JSON.parse(d));
        };
        f();
    }, []);

    return (
        <>
            {loading ? (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ActivityIndicator size="large" color={Theme.accent} />
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
                                    setLoading(true);
                                    let pos =
                                        await Location.getCurrentPositionAsync(
                                            {}
                                        );
                                    setLoading(false);

                                    Alert.alert(
                                        "Position",
                                        "Do you want to save position?",
                                        [
                                            {
                                                text: "yes",
                                                onPress: async () => {
                                                    setData((d) => {
                                                        const v = [
                                                            ...d,
                                                            {
                                                                id: d.length,
                                                                timestamp:
                                                                    pos.timestamp,
                                                                latitude:
                                                                    pos.coords
                                                                        .latitude,
                                                                longitude:
                                                                    pos.coords
                                                                        .longitude,
                                                                value: false,
                                                            },
                                                        ];
                                                        AsyncStorage.setItem(
                                                            "data",
                                                            JSON.stringify(v)
                                                        );
                                                        return v;
                                                    });
                                                },
                                            },
                                            {
                                                text: "no",
                                            },
                                        ]
                                    );
                                }}
                                style={{ flex: 1, height: 40, padding: 0 }}
                            >
                                Save
                            </Button>
                            <Button
                                onClick={() => {
                                    AsyncStorage.setItem(
                                        "data",
                                        JSON.stringify([])
                                    );
                                    setData([]);
                                }}
                                style={{ flex: 1, height: 40, padding: 0 }}
                            >
                                Delete all
                            </Button>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row",
                            }}
                        >
                            <View style={{ flex: 1, margin: 10 }}></View>
                            <Button
                                onClick={() => {
                                    const checked = data.filter((e) => e.value);
                                    if (checked.length === 0)
                                        Alert.alert(
                                            "You need to select something"
                                        );
                                    else
                                        navigation.navigate("Map", { checked });
                                }}
                                style={{
                                    flex: 5,
                                    height: 40,
                                    padding: 0,
                                    width: 20,
                                }}
                            >
                                Go to map
                            </Button>
                            <Switch
                                style={{ flex: 1, margin: 10 }}
                                value={all}
                                onValueChange={() => {
                                    setAll((p) => {
                                        setData((data) =>
                                            data.map((e) => {
                                                e.value = !p;

                                                return e;
                                            })
                                        );
                                        return !p;
                                    });
                                }}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 6,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <FlatList
                            style={{ flex: 1 }}
                            data={data}
                            renderItem={({ item }) => (
                                <ListElement
                                    item={item}
                                    onValueChange={() => {
                                        setData((data) =>
                                            data.map((e) => {
                                                if (e.id === item.id) {
                                                    e.value = !e.value;
                                                }
                                                return e;
                                            })
                                        );
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

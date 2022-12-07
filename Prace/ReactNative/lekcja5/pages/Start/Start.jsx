import Text from "../../components/Text";
import { View, Switch, FlatList, Alert } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import Theme from "../../Theme";
import { useEffect, useState } from "react";

function Start() {
    const navigation = useNavigation();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            await Font.loadAsync({
                myfont: require("./font.ttf"),
            });
            setLoaded(true);
        })();
    }, []);

    return (
        <TouchableOpacity
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Theme.primary,
            }}
            onPress={() => {
                navigation.navigate("Main");
            }}
        >
            <Text
                main={true}
                style={{
                    fontFamily: loaded ? "myfont" : "",
                    fontSize: 60,
                }}
            >
                SqliteApp
            </Text>
            <Text main={true}>lekcja 5</Text>
        </TouchableOpacity>
    );
}
export default Start;

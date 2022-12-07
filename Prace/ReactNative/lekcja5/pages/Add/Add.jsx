import Text from "../../components/Text";
import Button from "../../components/Button";
import { View, Switch, FlatList, Alert, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { TouchableNativeFeedback } from "react-native";
import { LogBox } from "react-native";
import Theme from "../../Theme";
import ActionButton from "../../components/ActionButton";
import Database from "../../services/Database";
LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
]);

function Add() {
    const route = useRoute();
    const navigation = useNavigation();

    return (
        <>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text>Add 00:00</Text>
            </View>

            <ActionButton
                onClick={async () => {
                    const data = {
                        h: 0,
                        m: 0,
                        days: "pn",
                    };
                    const id = await Database.getInstance().insert(data);
                    route.params.insert({
                        ...data,
                        id: id,
                    });
                    navigation.goBack();
                }}
            ></ActionButton>
        </>
    );
}
export default Add;

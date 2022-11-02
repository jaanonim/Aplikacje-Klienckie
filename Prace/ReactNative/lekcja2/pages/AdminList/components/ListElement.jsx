import { FlatList, Image, View } from "react-native";
import Button from "../../../components/Button";
import Text from "../../../components/Text";
import { useNavigation } from "@react-navigation/native";
import { del, getAll } from "../../../util/api";

function ListElement({ item, setData }) {
    const navigation = useNavigation();
    return (
        <View
            style={{
                flexDirection: "row",
            }}
        >
            <Image
                style={{ width: 100, height: 100 }}
                source={require("./icon.png")}
            ></Image>
            <View>
                <Text
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 5,
                        fontSize: 20,
                    }}
                >
                    {item.login}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        onClick={() => {
                            navigation.navigate("AdminDetail", item);
                        }}
                        style={{ padding: 10 }}
                    >
                        Detail
                    </Button>
                    <Button
                        onClick={async () => {
                            await del(item.id);
                            setData((d) => d.filter((e) => e.id !== item.id));
                        }}
                        style={{ padding: 10 }}
                        accent={true}
                    >
                        Delete
                    </Button>
                </View>
            </View>
        </View>
    );
}
export default ListElement;

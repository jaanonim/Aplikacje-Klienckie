import { Image, View, Switch } from "react-native";
import Text from "../../../components/Text";

function ListElement({ item, onValueChange }) {
    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "stretch",
                    flex: 1,
                }}
            >
                <Image
                    style={{ width: 100, height: 100 }}
                    source={require("./icon.png")}
                ></Image>
                <View style={{ flexGrow: 200, flexBasis: 200, marginLeft: 10 }}>
                    <Text
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 5,
                            fontSize: 20,
                        }}
                    >
                        {item.timestamp}
                    </Text>
                    <Text
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 5,
                            fontSize: 16,
                        }}
                    >
                        {item.latitude}
                    </Text>
                    <Text
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 5,
                            fontSize: 16,
                        }}
                    >
                        {item.longitude}
                    </Text>
                </View>
                <Switch
                    style={{ flexGrow: 30, flexBasis: 30 }}
                    value={item.value}
                    onValueChange={onValueChange}
                />
            </View>
        </>
    );
}
export default ListElement;

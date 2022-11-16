import {
    Image,
    View,
    Switch,
    TouchableOpacity,
    TouchableOpacityBase,
} from "react-native";
import { Dimensions } from "react-native";
import Text from "../../../components/Text";

function ListElement({ item, isLong, onPress, onLongPress }) {
    const size = Dimensions.get("window").width / 5 - 7;
    const longSize = Dimensions.get("window").width - 10;
    return (
        <>
            <TouchableOpacity
                style={{
                    width: isLong ? size : longSize,
                    height: size,
                    margin: 5,
                }}
                onPress={onPress}
                onLongPress={onLongPress}
            >
                <Image
                    style={{
                        width: isLong ? size : longSize,
                        height: size,
                    }}
                    source={{ uri: item.uri }}
                ></Image>
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
                    <Text main={true}>{item.id}</Text>
                </View>
                {item.selected ? (
                    <View
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: 0,
                            top: 0,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            style={{
                                width: isLong ? size : longSize,
                                height: size,
                                opacity: 0.5,
                            }}
                            source={require("./icon.png")}
                        ></Image>
                    </View>
                ) : null}
            </TouchableOpacity>
        </>
    );
}
export default ListElement;

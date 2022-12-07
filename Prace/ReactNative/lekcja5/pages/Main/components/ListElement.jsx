import { useState } from "react";
import {
    Image,
    View,
    Switch,
    TouchableOpacity,
    TouchableOpacityBase,
} from "react-native";
import { Dimensions } from "react-native";
import Text from "../../../components/Text";
import { AntDesign } from "@expo/vector-icons";
import Theme from "../../../Theme";
import { TouchableNativeFeedback } from "react-native";
import Database from "../../../services/Database";

function ListElement({ item, onDelete }) {
    const size = Dimensions.get("window").width - 10;
    const [value, setValue] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [days, setDays] = useState(item.days);

    const formatNumber = (n) => {
        if (n < 10) {
            return "0" + n;
        }
        return n;
    };
    return (
        <>
            <View
                style={{
                    width: size,
                    margin: 5,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        margin: 10,
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 50,
                        }}
                    >
                        {formatNumber(item.h)}:{formatNumber(item.m)}
                    </Text>
                    <Switch
                        value={value}
                        onValueChange={() => setValue((v) => !v)}
                    />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        margin: 10,
                        justifyContent: "space-between",
                    }}
                >
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple(
                            "rgba(0,0,0,1)",
                            true,
                        )}
                        onPress={() => {
                            Database.getInstance().delete(item.id);
                            onDelete(item.id);
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: 20,
                                height: 20,
                                borderRadius: 100,
                                marginLeft: 10,
                            }}
                        >
                            <AntDesign
                                name="delete"
                                size={20}
                                color={Theme.textPrimary}
                            />
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple(
                            "rgba(0,0,0,1)",
                            true,
                        )}
                        onPress={() => {
                            setDropdown((d) => !d);
                        }}
                    >
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: 20,
                                height: 20,
                                zIndex: 1000,
                                borderRadius: 100,
                                marginRight: 20,
                            }}
                        >
                            <AntDesign
                                name={dropdown ? "up" : "down"}
                                size={20}
                                color={Theme.textPrimary}
                            />
                        </View>
                    </TouchableNativeFeedback>
                </View>
                {dropdown ? (
                    <View
                        style={{
                            flexDirection: "row",
                            margin: 10,
                            justifyContent: "space-between",
                        }}
                    >
                        {["pn", "wt", "sr", "cz", "pt", "sb", "nd"].map((e) => (
                            <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple(
                                    "rgba(0,0,0,1)",
                                    true,
                                )}
                                onPress={() => {
                                    setDays((d) => {if(days
                                        .split(", ")
                                        });
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: days
                                            .split(", ")
                                            .some((i) => i === e)
                                            ? Theme.accent
                                            : null,
                                        width: 40,
                                        height: 40,
                                        zIndex: 1000,
                                        borderRadius: 100,
                                    }}
                                >
                                    <Text>{e}</Text>
                                </View>
                            </TouchableNativeFeedback>
                        ))}
                    </View>
                ) : (
                    <Text style={{ marginLeft: 20 }}>{item.days}</Text>
                )}
            </View>
        </>
    );
}
export default ListElement;

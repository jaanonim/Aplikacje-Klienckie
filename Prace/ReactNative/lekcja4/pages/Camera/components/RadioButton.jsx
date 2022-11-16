import React from "react";
import { TouchableOpacity, View } from "react-native";
import Text from "../../../components/Text";
import Theme from "../../../Theme";

function RadioButton({ value, selected, onClick }) {
    return (
        <TouchableOpacity style={{ flexDirection: "row" }} onPress={onClick}>
            <View
                style={{
                    backgroundColor: selected ? Theme.accent : Theme.primary,
                    borderRadius: 5,
                    height: 20,
                    width: 20,
                    marginLeft: 5,
                    marginTop: 10,
                }}
            ></View>
            <Text main={true} style={{ margin: 5 }}>
                {typeof value === "string"
                    ? value
                    : value.size + " " + value.ratio}
            </Text>
        </TouchableOpacity>
    );
}

export default RadioButton;

import { View } from "react-native";
import Text from "../../../components/Text";

import { Dimensions } from "react-native";
import RadioButton from "./RadioButton";
import { useState } from "react";
function RadioList({ item, onSelect }) {
    const [selected, setSelected] = useState(0);

    return (
        <View
            style={{
                flex: 1,
                width: Dimensions.get("window").width / 2,
            }}
        >
            <Text
                style={{
                    flex: 1,
                    padding: 0,
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 25,
                }}
                main={true}
            >
                {item.name}
            </Text>
            {item.values.map((v, i) => (
                <RadioButton
                    key={i}
                    value={v}
                    selected={selected === i}
                    onClick={() => {
                        setSelected(i);
                        let newV = {};
                        if (typeof v !== "string")
                            newV = { Ratio: v.ratio, Size: v.size };
                        else newV = { [item.name]: v };
                        onSelect(newV);
                    }}
                ></RadioButton>
            ))}
        </View>
    );
}
export default RadioList;

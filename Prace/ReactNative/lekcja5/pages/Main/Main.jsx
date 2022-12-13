import Text from "../../components/Text";
import {
    View,
    Switch,
    FlatList,
    Alert,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ActionButton from "../../components/ActionButton";
import { useCallback, useEffect, useState } from "react";
import Database from "../../services/Database";
import ListElement from "./components/ListElement";

function Main() {
    const navigation = useNavigation();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = useCallback(async () => {
        //await Database.getInstance().clear();
        setData(await Database.getInstance().get());
    });
    return (
        <>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ScrollView>
                    {data.map((ele) => (
                        <ListElement
                            key={ele.id}
                            item={ele}
                            onDelete={(id) => {
                                setData((d) => d.filter((e) => e.id !== id));
                            }}
                        ></ListElement>
                    ))}
                </ScrollView>
            </View>

            <ActionButton
                onClick={() => {
                    navigation.navigate("Add", {
                        insert: (obj) => {
                            setData((d) => [...d, obj]);
                        },
                    });
                }}
            />
        </>
    );
}
export default Main;

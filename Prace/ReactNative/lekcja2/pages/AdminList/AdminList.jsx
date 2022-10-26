import React, { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";
import Button from "../../components/Button";
import Text from "../../components/Text";
import { useNavigation } from "@react-navigation/native";
import { getAll } from "../../util/api";

function AdminList() {
    const navigation = useNavigation();
    const [data, setData] = useState([
        {
            login: "aaa",
            password: "idk",
            date: "some date from server",
        },
    ]);
    useEffect(() => {
        async function f() {
            setData(await getAll());
        }
        f();
    }, []);

    return (
        <>
            <FlatList
                style={{ flex: 1 }}
                data={data}
                renderItem={({ item }) => (
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
                                        navigation.navigate(
                                            "AdminDetail",
                                            item,
                                        );
                                    }}
                                    style={{ padding: 10 }}
                                >
                                    Detail
                                </Button>
                                <Button
                                    onClick={() => {}}
                                    style={{ padding: 10 }}
                                    accent={true}
                                >
                                    Delete
                                </Button>
                            </View>
                        </View>
                    </View>
                )}
            />
        </>
    );
}

export default AdminList;

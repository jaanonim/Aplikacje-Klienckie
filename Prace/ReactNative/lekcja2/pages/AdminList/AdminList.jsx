import React, { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";
import Button from "../../components/Button";
import Text from "../../components/Text";
import { useNavigation } from "@react-navigation/native";
import { del, getAll } from "../../util/api";
import ListElement from "./components/ListElement";

function AdminList() {
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
                    <ListElement item={item} setData={setData}></ListElement>
                )}
            />
        </>
    );
}

export default AdminList;

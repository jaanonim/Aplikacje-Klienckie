import React from "react";
import Text from "../../components/Text";
import { useRoute } from "@react-navigation/native";
import { Image, View } from "react-native";

function AdminDetail() {
    const route = useRoute();
    return (
        <>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Image
                    style={{ width: 100, height: 100 }}
                    source={require("./icon.png")}
                ></Image>
                <Text style={{ padding: 10 }}>Login: {route.params.login}</Text>
                <Text style={{ padding: 10 }}>
                    Password: {route.params.password}
                </Text>
                <Text style={{ padding: 10 }}>Date: {route.params.date}</Text>
            </View>
        </>
    );
}

export default AdminDetail;

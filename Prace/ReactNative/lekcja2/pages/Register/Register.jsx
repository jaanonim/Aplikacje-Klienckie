import React, { useRef } from "react";
import { TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";
import Text from "../../components/Text";
import { create } from "../../util/api";
function Register() {
    const navigation = useNavigation();

    const [login, setLogin] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    return (
        <>
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#3F51B5",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text style={{ fontSize: 50 }} main={true}>
                    Register
                </Text>
            </View>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <TextInput
                    style={{
                        height: 40,
                        margin: 12,
                        padding: 10,
                        borderBottomWidth: 1,
                        width: "70%",
                    }}
                    placeholder="login"
                    value={login}
                    onChangeText={setLogin}
                ></TextInput>
                <TextInput
                    style={{
                        height: 40,
                        margin: 12,
                        borderBottomWidth: 1,
                        padding: 10,
                        width: "70%",
                    }}
                    placeholder="password"
                    value={password}
                    onChangeText={setPassword}
                ></TextInput>
                <Button
                    onClick={() => {
                        create({
                            login: login,
                            password: password,
                        });
                        navigation.navigate("AdminList");
                    }}
                >
                    Register
                </Button>
            </View>
        </>
    );
}

export default Register;

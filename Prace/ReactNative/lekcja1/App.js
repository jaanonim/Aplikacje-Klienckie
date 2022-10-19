import { ButtonRight } from "./components/ButtonRight";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { ButtonLeft } from "./components/ButtonLeft";
import { useEffect, useState } from "react";

export default function App() {
    const texts = [
        {
            text: "1",
        },
        {
            text: "2",
        },
        {
            text: "3",
        },
        {
            text: "4",
        },
        {
            text: "5",
        },
        {
            text: "6",
        },
        {
            text: "7",
        },
        {
            text: "8",
        },
        {
            text: "9",
        },
        {
            text: "0",
        },
        {
            text: ".",
            onClick: (v) => {
                if (check()) setText((t) => t + v);
            },
        },
        {
            text: "C",
            onClick: (v) => {
                setText((t) => {
                    const v = [...t];
                    v.pop();
                    return v.join("");
                });
            },
        },
    ];
    const actions = [
        {
            text: "+",
        },
        {
            text: "-",
        },
        {
            text: "*",
        },
        {
            text: "/",
        },
        {
            text: "=",
            color: "#a37",
            ignore: true,
            onClick: (_) => {
                if (text === "172.0.0.1") setResult("Ping 💻");
                else if (text === "192.168.0.1")
                    setResult("Router not found ❌");
                else if (text === "2137") setResult("🎉");
                else if (text === "42")
                    setResult("The answer to life the universe and everything");
                else {
                    try {
                        setResult(eval(text));
                    } catch {}
                }
            },
        },
    ];

    const special = [
        {
            text: "172.0.0.1",
            color: "#aaa",
            size: 25,
            ignore: true,
        },
        {
            text: "192.168.0.1",
            color: "#aaa",
            size: 25,
            ignore: true,
        },
        {
            text: "2137",
            color: "#aaa",
            size: 25,
            ignore: true,
        },
        {
            text: "42",
            color: "#aaa",
            size: 40,
            ignore: true,
        },
        {
            text: "CS",
            color: "#666",
            onClick: (_) => {
                setText("");
            },
            size: 40,
            ignore: true,
        },
    ];

    const check = () => {
        if (text.length === 0) return false;
        return !(
            text[text.length - 1] === "." ||
            text[text.length - 1] === "+" ||
            text[text.length - 1] === "-" ||
            text[text.length - 1] === "/" ||
            text[text.length - 1] === "*"
        );
    };

    const [text, setText] = useState("");
    const [result, setResult] = useState("");
    let dim = Dimensions.get("screen");
    const [orientation, setOrientation] = useState(dim.height >= dim.width);

    useEffect(() => {
        Dimensions.addEventListener("change", () => {
            let dim = Dimensions.get("screen");
            setOrientation(dim.height >= dim.width);
        });
    });

    return (
        <>
            <View style={styles.top}>
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.text}>{result}</Text>
            </View>
            <View style={styles.main}>
                <View style={styles.left}>
                    {texts.map((e) => (
                        <ButtonLeft
                            text={e.text}
                            color={e.color}
                            onClick={
                                e.onClick === undefined
                                    ? (v) => setText((t) => t + v)
                                    : (v) => e.onClick(v)
                            }
                        />
                    ))}
                </View>
                {!orientation ? (
                    <View style={styles.right}>
                        {special.map((e) => (
                            <ButtonRight
                                text={e.text}
                                color={e.color}
                                size={e.size}
                                onClick={(v) => {
                                    if (e.ignore || check())
                                        (e.onClick === undefined
                                            ? (v) => setText((t) => t + v)
                                            : (v) => e.onClick(v))(v);
                                }}
                            />
                        ))}
                    </View>
                ) : null}
                <View style={styles.right}>
                    {actions.map((e) => (
                        <ButtonRight
                            text={e.text}
                            color={e.color}
                            onClick={(v) => {
                                if (e.ignore || check())
                                    (e.onClick === undefined
                                        ? (v) => setText((t) => t + v)
                                        : (v) => e.onClick(v))(v);
                            }}
                        />
                    ))}
                </View>
            </View>
            <StatusBar style="auto" />
        </>
    );
}

const styles = StyleSheet.create({
    top: {
        flex: 1,
        backgroundColor: "#333",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
    },
    main: {
        flex: 3,
        backgroundColor: "#333",
        justifyContent: "center",
        flexDirection: "row",
    },
    left: {
        flex: 3,
        borderWidth: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: "auto",
    },
    right: {
        flex: 1,
        borderWidth: 1,
    },
    text: {
        fontSize: 40,
        color: "#fff",
    },
});

import { useState } from "react";
import Dialog from "./Components/Dialog";
import Item from "./Components/Item";
import React from "react";

export const dialogContext = React.createContext(null);

function App() {
    const [data, setData] = useState([]);
    const [dialog, setDialog] = useState(null);

    return (
        <dialogContext.Provider value={setDialog}>
            <button
                onClick={() => {
                    setData((d) => [...d, Math.round(Math.random() * 1000)]);
                }}
            >
                Add
            </button>
            <button
                onClick={() => {
                    setData((d) => [Math.round(Math.random() * 1000), ...d]);
                }}
            >
                Push
            </button>

            <button
                onClick={() => {
                    setData([]);
                }}
            >
                Delete
            </button>
            {data.map((e) => (
                <Item
                    data={e}
                    del={() => {
                        setData((d) => d.filter((i) => i != e));
                    }}
                ></Item>
            ))}
            {dialog != null ? <Dialog>{dialog}</Dialog> : null}
        </dialogContext.Provider>
    );
}

export default App;

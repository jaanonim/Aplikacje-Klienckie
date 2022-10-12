import { useCallback, useEffect, useState } from "react";
import Average from "./Average";
import Opinion from "./Opinion";

function App() {
    const [data, setData] = useState([]);
    const [form, setForm] = useState([]);

    useEffect(() => {
        const f = async () => {
            try {
                const res = await fetch("http://localhost:5000");
                const d = await res.json();
                setData(d.data);
                setForm(d.form);
            } catch (error) {
                console.error(error);
            }
        };
        f();
    }, []);

    const set = useCallback(
        async (v) => {
            try {
                const res = await fetch("http://localhost:5000", {
                    method: "POST",
                    body: JSON.stringify({ data: v }),
                    headers: { "Content-Type": "application/json" },
                });
                const d = await res.json();
                setData(d.data);
            } catch (error) {
                console.error(error);
            }
        },
        [data],
    );

    return (
        <>
            <button
                onClick={() => {
                    set([
                        ...data,
                        {
                            zgodnoosc: 3,
                            wysylka: 3,
                            koszt: 3,
                            obsluga: 3,
                        },
                    ]);
                }}
            >
                Click me please 🙏
            </button>
            {data.map((e, i) => (
                <Opinion
                    info={form}
                    data={e}
                    id={i}
                    key={i}
                    update={(id, v) =>
                        set(data.map((e, j) => (j === id ? v : e)))
                    }
                    del={(id) => {
                        set(data.filter((_, j) => j !== id));
                    }}
                ></Opinion>
            ))}
            <hr></hr>
            <Average info={form} data={data}></Average>
        </>
    );
}

export default App;

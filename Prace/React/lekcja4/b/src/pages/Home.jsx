import React, { useState } from "react";
import Item from "../components/Item";
import ItemBig from "../components/ItemBig";

function Home({ data: [data, setData] }) {
    const [current, setCurrent] = useState(null);
    return (
        <div>
            {current == null ? null : <ItemBig data={current} />}
            {data.map((e, i) => (
                <Item
                    data={e}
                    select={(data) => {
                        setCurrent(data);
                    }}
                    key={i}
                ></Item>
            ))}
        </div>
    );
}

export default Home;

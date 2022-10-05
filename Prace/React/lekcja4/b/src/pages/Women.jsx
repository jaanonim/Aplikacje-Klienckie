import React, { useState } from "react";
import ItemBig from "../components/ItemBig";

import Item from "../components/Item";

function Women({ data: [data, setData] }) {
    const [current, setCurrent] = useState(null);
    return (
        <div>
            {current == null ? null : <ItemBig data={current} />}
            {data
                .filter((e) => e.name.split(" ")[0].endsWith("a"))
                .map((e, i) => (
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

export default Women;

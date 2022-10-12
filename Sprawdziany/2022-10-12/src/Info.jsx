import React from "react";
import Bar from "./Bar";

function Info({ info, data, update }) {
    return (
        <div className="info">
            {info.name}
            <Bar
                value={data}
                info={info.values}
                setValue={(v) => {
                    update(info.key, v);
                }}
            ></Bar>
        </div>
    );
}

export default Info;

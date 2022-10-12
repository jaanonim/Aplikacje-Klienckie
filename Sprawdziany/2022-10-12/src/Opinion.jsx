import React from "react";
import Info from "./Info";

function Opinion({ info, data, id, update, del }) {
    return (
        <div>
            {info.map((e, i) => (
                <Info
                    info={e}
                    data={data[e.key]}
                    key={i}
                    update={(key, v) => {
                        data[key] = v;
                        update(id, data);
                    }}
                ></Info>
            ))}
            <button onClick={() => del(id)}>Do not click me! Please 🙏</button>
        </div>
    );
}

export default Opinion;

import React from "react";

function Bar({ info, value, setValue }) {
    return (
        <div>
            {info.map((e, i) => (
                <div
                    key={i}
                    className={`box ${value >= i + 1 ? "check" : "nocheck"}`}
                    onClick={() => setValue(i + 1)}
                ></div>
            ))}
            <br></br>
            {info[value - 1]}
        </div>
    );
}

export default Bar;

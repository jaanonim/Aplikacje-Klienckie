import React from "react";

function Item({ data, select }) {
    return (
        <div
            onClick={() => {
                select(data);
            }}
        >
            {data._id}: {data.name}
        </div>
    );
}

export default Item;

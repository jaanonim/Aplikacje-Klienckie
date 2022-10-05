import React from "react";

function ItemBig({ data }) {
    return (
        <div>
            {data._id}: {data.name}
            {data.scores.map((s, i) => (
                <div key={i}>
                    {s.type} {s.score}
                </div>
            ))}
        </div>
    );
}

export default ItemBig;

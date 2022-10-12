import React from "react";
import Info from "./Info";

function Average({ info, data }) {
    return (
        <div>
            <h2>Średnie:</h2>
            {info.map((e, i) => (
                <Info
                    data={
                        data.length === 0
                            ? 0
                            : Math.round(
                                  data.reduce((p, c) => p + c[e.key], 0) /
                                      data.length,
                              )
                    }
                    info={e}
                    key={i}
                    update={() => {}}
                ></Info>
            ))}
        </div>
    );
}

export default Average;

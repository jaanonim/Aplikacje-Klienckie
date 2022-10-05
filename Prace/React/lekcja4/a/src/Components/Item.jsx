import React from "react";
import { dialogContext } from "../App";
import { useContext } from "react";

function Item({ data, del }) {
    const dialog = useContext(dialogContext);

    return (
        <div className="item">
            {data}
            <br />
            <button
                onClick={() => {
                    dialog(
                        <>
                            <div
                                style={{
                                    width: "50vw",
                                    height: "50vh",
                                    backgroundColor: "#333",
                                    border: "2px #fff solid",
                                    borderRadius: 10,
                                }}
                            >
                                <h2>Delete?</h2>
                                <button
                                    onClick={() => {
                                        del();
                                        dialog(null);
                                    }}
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={() => {
                                        dialog(null);
                                    }}
                                >
                                    No
                                </button>
                            </div>
                        </>,
                    );
                }}
            >
                Delete
            </button>
        </div>
    );
}

export default Item;

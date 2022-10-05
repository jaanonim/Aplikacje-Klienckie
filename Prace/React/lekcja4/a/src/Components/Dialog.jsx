import React from "react";
import { dialogContext } from "../App";
import { useContext } from "react";

function Dialog({ children }) {
    const dialog = useContext(dialogContext);

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                backgroundColor: "rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {children}
        </div>
    );
}

export default Dialog;

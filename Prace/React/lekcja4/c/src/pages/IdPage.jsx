import React from "react";
import { useParams } from "react-router-dom";

function IdPage() {
    const { id } = useParams();

    return <div>{id}</div>;
}

export default IdPage;

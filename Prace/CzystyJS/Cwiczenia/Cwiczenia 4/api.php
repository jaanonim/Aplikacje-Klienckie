<?php

include("creds.php");
$conn = new mysqli($host, $user, $passwd, $dbname);
if ($conn->connect_error) {
    die('{"error": "connection failed"}');
}

function get_table($conn, $name)
{
    $sql = "select * from $name";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $tab = [];
        while ($row = $result->fetch_assoc()) {
            array_push($tab, $row);
        }
        echo json_encode($tab);
    } else {
        echo "0 results";
    }
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    if ($action == "alloys") {
        get_table($conn, "alloys");
    } elseif ($action == "countrys") {
        get_table($conn, "countrys");
    } elseif ($action == "data") {
        get_table($conn, "data");
    } elseif ($action == "add") {
        $nr = $_GET['nr'];
        $country = $_GET['country'];
        $alloy = $_GET['alloy'];
        $year = $_GET['year'];
        $nominal = $_GET['nominal'];
        $sql = "insert into data (nr, country, alloy, year, nominal) values ('$nr', '$country', '$alloy', '$year', '$nominal')";
        if ($conn->query($sql) === TRUE) {
            echo '{"error": null}';
        } else {
            echo '{"error":"' . $sql . " " . $conn->error . '"}';
        }
    } elseif ($action == "delete") {
        $id = $_GET['ID'];
        $sql = "DELETE FROM data WHERE ID=$id";
        if ($conn->query($sql) === TRUE) {
            echo '{"error": null}';
        } else {
            echo '{"error":"' . $sql . " " . $conn->error . '"}';
        }
    } elseif ($action == "update") {
        $id = $_GET['ID'];
        $nr = $_GET['nr'];
        $country = $_GET['country'];
        $alloy = $_GET['alloy'];
        $year = $_GET['year'];
        $nominal = $_GET['nominal'];
        $sql = "UPDATE data SET nr='$nr', country='$country', alloy='$alloy', year='$year', nominal='$nominal' WHERE ID=$id";
        if ($conn->query($sql) === TRUE) {
            echo '{"error": null}';
        } else {
            echo '{"error":"' . $sql . " " . $conn->error . '"}';
        }
    } else {
        echo '{"error": "no action"}';
    }
}
$conn->close();

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
        $sql = "insert into data (nr, country, alloy, year, nominal) values (?,?,?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssss", $nr, $country, $alloy, $year, $nominal);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result === TRUE) {
            echo '{"error": null}';
        } else {
            echo '{"error":"' . $sql . " " . $conn->error . '"}';
        }
    } elseif ($action == "delete") {
        $id = $_GET['ID'];
        $sql = "DELETE FROM data WHERE ID=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result === TRUE) {
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
        $sql = "UPDATE data SET nr=?, country=?, alloy=?, year=?, nominal=? WHERE ID=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssss", $nr, $country, $alloy, $year, $nominal, $id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result === TRUE) {
            echo '{"error": null}';
        } else {
            echo '{"error":"' . $sql . " " . $conn->error . '"}';
        }
    } else {
        echo '{"error": "no action"}';
    }
}
$conn->close();

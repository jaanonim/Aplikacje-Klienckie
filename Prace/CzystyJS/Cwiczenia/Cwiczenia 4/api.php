<?php

    include("creds.php");
    $conn = new mysqli($host, $user, $passwd, $dbname);
    if ($conn->connect_error) {
        die('{"error": "connection failed"}');
    }

    function get_table($conn,$name){
        $sql = "select * from $name";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $tab = [];
            while($row = $result->fetch_assoc()) {
            array_push($tab, $row);
            }
            echo json_encode($tab);
        } else {
            echo "0 results";
        }
    }

    if(isset($_GET['action'])){
        $action = $_GET['action'];
        if($action=="alloys"){
            get_table($conn,"alloys");
        }
        else if($action=="countrys"){
            get_table($conn,"countrys");
        }
        else if($action=="data"){
            get_table($conn,"data");
        }
        else{
            echo '{"error": "no action"}';
        }
    }
    else{
      echo '{"error": "no action"}';
    }
    $conn->close();

?>

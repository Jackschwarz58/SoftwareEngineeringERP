<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("34.68.15.251", "root", "securepassword", "imdb");

$result = $conn->query("SELECT * FROM inventory ORDER BY id");

$outp = "[";
while($rs = $result->fetch_assoc()) {
    if ($outp != "[") {$outp .= ",";}
    $outp .= '{"id":"'    . $rs["id"] . '",';
    $outp .= '"name":"'   . $rs["name"] . '",';
    $outp .= '"quan":"'   . $rs["qty"] . '",';
    $outp .= '"desc":"'   . $rs["details"] . '",';
    $outp .= '"dateadd":"'   . $rs["dateadd"] . '",';
	$outp .= '"datemod":"'   . $rs["datemod"] . '",';
    $outp .= '"sold":"'   . $rs["sold"] . '",';
    $outp .= '"tags":"'   . $rs["tags"] . '",';
    $outp .= '"total":"'  . $rs["total"]. '"}';
}
$outp .="]";


$conn->close();

echo($outp);
?>
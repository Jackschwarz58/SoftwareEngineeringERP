<?php

$conn = new mysqli("34.68.15.251", "root", "securepassword", "imdb");


$id = $_REQUEST["id"];
$name = '"' . $_REQUEST["n"] . '"';
$qty = $_REQUEST["q"];
$desc = '"' . $_REQUEST["d"] . '"';
$sold = $_REQUEST["s"];
$tags = '"' . $_REQUEST["t"] . '"';
$total = $_REQUEST["tot"];

/*
echo("ID: " . $id . 
	"Name: " . $name .
	"Qty: " . $qty .
	"Desc: " . $desc .
	"sold: " . $sold .
	"tags: " . $tags .
	"total: " . $total);
	
	
	echo("UPDATE inventory SET name = " . '"' . $name . '"' . 
	", qty = " . $qty .
	", details = " . '"' . $desc . '"' .
	", sold = " . intval($sold) . 
	", tags = " . '"' . $tags . '"' .
	", total = " . intval($total) . 
	" WHERE id = " . $id);*/

//$result = $conn->query("SELECT * FROM inventory WHERE id = " $id);

echo $id;
if ($id == 0) {
	$sql = "INSERT INTO inventory (name, qty, details, sold, total, tags)" .
	" VALUES (" . $name . "," . $qty . "," . $desc .
	"," . $sold . "," . $total . "," . $tags . ");";
}
else {
	$sql = "UPDATE inventory SET name = " . $name . 
	", qty = " . $qty .
	", details = " . $desc .
	", sold = " . intval($sold) . 
	", tags = " . $tags .
	", total = " . intval($total) . 
	" WHERE id = " . $id;
}

$conn->query($sql);
	
$conn->close();
?>
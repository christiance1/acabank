<?php 
	include_once('connect.php'); 
	$connection=connectDB();
	$IDest=$_POST['IDest'];
	$query="Select * from municipio where nukidestado='$IDest'";
	$result=pg_query($connection,$query);
	$datos=pg_fetch_all($result);
	echo json_encode($datos)	
?>
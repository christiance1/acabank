<?php 
	include_once('connect.php'); 
	$connection=connectDB();	
	$query="Select * from carreras";
	$result=pg_query($connection,$query);
	$datos=pg_fetch_all($result);
	echo json_encode($datos)	
?>
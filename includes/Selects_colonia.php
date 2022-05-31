<?php 
	include_once('connect.php'); 
	$connection=connectDB();
	$IDmun=$_POST['IDmun'];
	$query="Select * from colonia where nukidmunicipio='$IDmun' order by 1";
	$result=pg_query($connection,$query);
	$datos=pg_fetch_all($result);
	echo json_encode($datos)	
?>
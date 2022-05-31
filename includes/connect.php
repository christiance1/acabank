<?php 
	function connectDB(){
		$host="host=localhost";
		$port="port=5432";
		$dbname="dbname=Acabank";
		$user="user=postgres";
		$password="password=123";
		$db= pg_connect("$host $port $dbname $user $password");
		if (!$db){
			echo "Error: ".pg_last_error;
		} else {
			return $db;
		}
	}
?>
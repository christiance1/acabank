<?php 
	include_once('connect.php');
	$connection=connectDB();
	$messageOK=false;
	$mesasageStatus='El sistema no se encuentra disponible'; 
	$datos=$_POST['Dat'];
	$PerQuery="Select * from persona where cuenta_unam='$datos[9]'";
	$Per=pg_fetch_array(pg_query($connection,$PerQuery));
	$DirQuery="Select * from direccion where calle='$datos[6]' and num_ext='$datos[7]' and id_col='$datos[5]'";
	$Dir=pg_fetch_array(pg_query($connection,$DirQuery));
	$Dirper=array('id_persona'=>intval($Per[0]),'id_direccion'=>intval($Dir[0]));
	$res=pg_insert($connection,'direcciones',$Dirper,PGSQL_DML_EXEC);	
	if(!$res):
		$mesasageStatus='No se pudo dar de alta la nueva relacion direccion-persona';
	else:
		$mesasageStatus='Relacion direccion-persona dada de alta con exito';
		$messageOK=true;
	endif;
	$salidaJSON=array('respuesta' => $messageOK, 'mensaje' =>$mesasageStatus);
	echo json_encode($salidaJSON);
?>
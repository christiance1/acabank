<?php 
	include_once('connect.php');
	$connection=connectDB();
	$messageOK=false;
	$mesasageStatus='El sistema no se encuentra disponible'; 
	$datos=$_POST['Dat'];
	$direc=array('calle'=>$datos[6],'num_ext'=>$datos[7],'id_col'=>intval($datos[5]));
	$res1=pg_insert($connection,'direccion',$direc,PGSQL_DML_EXEC);
	if(!$res1):
		$mesasageStatus='No se pudo dar de alta la nueva direccion';
	else:
		$pers=array('nombre'=>$datos[0],'ap_paterno'=>$datos[1],'ap_materno'=>$datos[2],'contraseña'=>$datos[10],'edad'=>intval($datos[3]),'curp_persona'=>$datos[4],'cuenta_unam'=>$datos[9],'id_carrera'=>$datos[8],'telefono'=>$datos[12]);
		$res2=pg_insert($connection,'persona',$pers,PGSQL_DML_EXEC);
		if(!$res2):
			$mesasageStatus='No se pudo dar de alta la nueva persona';
		else:			
				$mesasageStatus='Registro exitoso';
				$messageOK=true;
		endif;
	endif;
	$salidaJSON=array('respuesta' => $messageOK, 'mensaje' =>$mesasageStatus);
	echo json_encode($salidaJSON);
?>
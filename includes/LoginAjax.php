<?php 
	include_once('connect.php'); 
	$messageOK=false;
	$mesasageStatus='El sistema no se encuentra disponible';
	$connection=connectDB();	
	if(isset($_POST['Usuari'],$_POST['Contra'])):
		if($_POST['Usuari']!=""):
			if($_POST['Contra']!=""):
				$Username=$_POST['Usuari'];
				$Password=$_POST['Contra'];
				$query="Select * from persona where cuenta_unam='$Username' and contraseña='$Password'";
				$result=pg_query($connection,$query);
				if(pg_num_rows($result)>0):
					$messageOK=true;
					$reg=pg_fetch_array($result);
					session_start();
					$_SESSION['ID']=$reg[0];
					$_SESSION['NOMBRE']=$reg[1].' '.$reg[2].' '.$reg[3];
					$mesasageStatus='';
				else:
					$mesasageStatus='Usuario o contraseña incorrecta';
				endif;
			else:
				$mesasageStatus='Por favor, ingrese su contraseña';
			endif;
		else:
			$mesasageStatus='Por favor, ingrese su numero de cuenta';
		endif;
	else:
			$mesasageStatus='Por favor, ingrese los datos requeridos';
	endif;
	$salidaJSON=array('respuesta' => $messageOK, 'mensaje' =>$mesasageStatus);
	echo json_encode($salidaJSON)
?>
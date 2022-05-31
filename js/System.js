function login(){
	var Username=$('#user').val();
	var Password=$('#pass').val();
	$.ajax({
		type:"POST",
		dataType:'json',
		url:'includes/LoginAjax.php',
		data:{Usuari:Username,Contra:Password},
		success:function(response){
			if(response.respuesta==true){
				window.open("Cliente.html",'_self');
			}else{
				$('#mensaje').text(response.mensaje);
			}
		}
	});
}

var name, apep, apem, sexo, day, year, month, estado, mun, col, state, num, calle, cp, carrera, cuenta, pass, pass_confirm;


function elementos(){
	var datos= new Array(10);
	var FechaBD= new Date($('#date').val());
    var FechaT = new Date();
	datos[0] =$('#name').val();								//0Nombre
    datos[1] =$('#apep').val();								//1Apellido Paterno 
    datos[2] =$('#apem').val();								//2Apellido Materno        
    datos[3] =((FechaT-FechaBD)/31536000000).toFixed();		//3Edad
    datos[4] =$('#curp').val();								//4Curp        
    datos[5] =$('#Coln option:selected').val();				//5Colonia
    datos[6] =$('#stre').val();								//6Calle
    datos[7] =$('#nume').val();								//7Numero exterior
    datos[8] =$('#carr option:selected').val();				//8Carrera
    datos[9] =$('#unam').val();								//9Numero de cuenta UNAM
    datos[10]=$('#pss1').val();								//10Contraseña
    datos[11]=$('#pss2').val();								//11Confirmacion de la contraseña
    datos[12]=$('#nute').val();								//12Numero telefonico
    var verificador=false;
    var final=0;
    for(i=0;i<13;i++)
    	if(datos[i].length<1)
    		verificador=true
    if(verificador)
    	alert('Por favor, ingrese todos los campos');
    else
    {
    	//valida nombres y apellidos
    	final+=validanom($('#name').val());
    	final+=validaapP($('#apep').val());
    	final+=validaapM($('#apem').val());
    	//valida la edad
    	final+=validaEd(datos[3])
    	//valida curp
    	final+=validaCurp($('#curp').val());
    	//Valida Numero de Telefono
    	final+=validaTel($('#nute').val());
    	//Valida Numero de cuenta de UNAM
    	final+=validaCue($('#unam').val());
    }
    if(final==7)
    {
    	$.ajax({
			type:"POST",
			dataType:'json',
			url:'includes/Registro.php',
			data:{Dat:datos},
			success:function(response){
				if(response.respuesta==true){
					$.ajax({
						type:"POST",
						dataType:'json',
						url:'includes/DirPer.php',
						data:{Dat:datos},
						success:function(res){
							if(res.respuesta==true){
								alert('Registro Completado!');
								window.open("login.html",'_self');
							}else{
								$('#mensaje').text(res.mensaje);
							}
						}
					});
				}else{
					$('#mensaje').text(response.mensaje);
				}
			}
		});
    }
}
//////////////////////// FUNCIONES PARA VALIDAR (NO TOCAR) /////////////////////////////////////
function validanom(inputtxt) //Valida Nombre
{
	var letters = /^[A-Za-z \u00E0-\u00FC]+$/;
	if(inputtxt.match(letters)) //Si esta bien el nombre
	{
		if(inputtxt.length<3) //Checamos que no haya puesto basura
		{
			alert('El Nombre es muy corto');
			return 0;
		}
		else
			if(inputtxt.length>50)
				{
					alert('El Nombre es muy largo');
					return 0;
				}
			else
				return 1;
	}
	else
	{
		alert('A menos que lleves numeros en el Nombre llama al 55-81637476');
		return 0;
	}
}
function validaapP(inputtxt) //Valida Apellido Paterno
{
	var letters = /^[A-Za-z \u00E0-\u00FC]+$/;
	if(inputtxt.match(letters)) //Si esta bien el APP
	{
		if(inputtxt.length<3) //Checamos que no haya puesto basura
		{
			alert('El Apellido Paterno es muy corto');
			return 0;
		}
		else
			if(inputtxt.length>50)
			{
				alert('El Apellido Paterno es muy largo');
				return 0;
			}
			else
				return 1;
	}
	else
	{
		alert('A menos que lleves numeros en el Apellido Paterno llama al 55-81637476');
		return 0;
	}
}
function validaapM(inputtxt) //Valida Apellido Materno
{
	var letters = /^[A-Za-z \u00E0-\u00FC]+$/;
	if(inputtxt.match(letters)) //Si esta bien el APM
	{
		if(inputtxt.length<3) //Checamos que no haya puesto basura
		{
			alert('El Apellido Materno es muy corto');
			return 0;
		}
		else
			if(inputtxt.length>50)
			{
				alert('El Apellido Materno es muy largo');
				return 0;
			}
			else
				return 1;
	}
	else
	{
		alert('A menos que lleves numeros en el Apellido Materno llama al 55-81637476');
		return 0;
	}
}
function validaEd(edad) // Valida Edad
{
	if(edad>80 || edad <16)
	{
		alert("Debes tener entre 18 y 79 años \n para poder tener una cuenta");
		return 0;
	}
	else
		return 1;
}
function validaCurp(curp) //Valida Curp
{
	if(curp.length!=18)
	{
		alert('Ingresa un CURP valido');
		return 0;
	}	
	else
		return 1;
}
function validaTel(inputtxt) //Valida Numero Telefonico
{
  	var phoneno = /^[0-9]+$/;
  	if(inputtxt.match(phoneno))
    {
    	if(inputtxt.length==10)//Numero de celular (BIEN)
    	{
    		return 1;
    	}
    	else if(inputtxt.length==8) //Numero fijo (BIEN)
    	{
    		return 1;
    	}
    	else
    	{
    		alert("Ingresa un Numero telefonico valido \n Si es celular: 55123.. \n Si es fijo: 123...");
    		return 0;
    	}
    }
    else
    {
	    alert("Ingresa un Numero telefonico valido \n Si es celular: 55123.. \n Si es fijo: 123...");
	    return 0;
    }
}
function validaCue(unam) //Valida cuenta UNAM
{
	var nums = /^[0-9]+$/;
  	if(unam.match(nums))
    {
    	if(unam.length!=9)
    	{
    		alert("Ingresa un Numero de Cuenta valido");
    		return 0;
    	}
    	else
    		return 1;
    }
    else
    {
    	alert("Ingresa un Numero de Cuenta valido");
    	return 0;
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////


function EqualPass(){
	if($('#pss1').val()!=$('#pss2').val()){
		$('#veripass').text("Contraseñas no  coinciden");
		$('#veripass').css("color",'red');
		$('#regi').attr("disabled", true);
	}else{
		$('#veripass').text("Contraseñas coinciden");
		$('#veripass').css("color",'green');
		$('#regi').attr("disabled", false);
	}
}
function selects(){
	//Ajax para estado
	$.ajax({type:"POST",dataType:'json',url:'includes/Selects_estado.php',
		success:function(arr){
			$('#Estd').append('<option value="0">Elija un estado</option>');
			$('#Estd option[value=0]').attr('disabled','disabled');
			for(i=0;i<arr.length;i++)
				$('#Estd').append('<option value="'+arr[i].nukidestado+'">'+arr[i].chd_estado+'</option>')
		}
	});
	//Ajax para carreras
	$.ajax({type:"POST",dataType:'json',url:'includes/Selects_carreras.php',
		success:function(arr){
			$('#carr').append('<option value="0">Elija su carrera</option>');
			$('#carr option[value=0]').attr('disabled','disabled');
			for(i=0;i<arr.length;i++)
				$('#carr').append('<option value="'+arr[i].id_carrera+'">'+arr[i].nom_carrera+'</option>')
		}
	});
}

function select_municipio(estd){
	//Ajax para municipio
	$.ajax({type:"POST",dataType:'json',url:'includes/Selects_municipio.php',data:{IDest:estd},
		success:function(arr){
			$('#Mncp').children().remove();
			$('#Mncp').append('<option value="0">Elija un municipio</option>');
			$('#Mncp option[value=0]').attr('disabled','disabled');
			$('#Coln').children().remove();
			$('#Coln').append('<option value="0">---------------</option>');
			for(i=0;i<arr.length;i++)
				$('#Mncp').append('<option value="'+arr[i].nukidmunicipio+'">'+arr[i].chd_municipio+'</option>')
		}
	});
}

function select_colonia(munc){
	//Ajax para colonia
	$.ajax({type:"POST",dataType:'json',url:'includes/Selects_colonia.php',data:{IDmun:munc},
		success:function(arr){
			$('#Coln').children().remove();
			$('#Coln').append('<option value="0">Elija una colonia</option>');
			$('#Coln option[value=0]').attr('disabled','disabled');
			for(i=0;i<arr.length;i++)
				$('#Coln').append('<option value="'+arr[i].nukidcolonia+'">'+arr[i].chdescripcion+'</option>')
		}
	});
}
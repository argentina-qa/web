console.log($(".partial"));

$(".partial").on("click", function(event){
	event.preventDefault();
	let dirNueva = $(this).attr("href")
	$.ajax({
		url: dirNueva,
		success: function(data){
			$(".contenedor").html(data)
			
			//aca recien existe el boton js-fav
			
		}
	});
});


// js formulario- Alert para decirle q se mando con exito la receta!
function enviarForm(){
	alert("Tu mensaje ha sido enviado de forma exitosa, gracias por compartir con nosotros tu receta!");
}


//esta funcion recaga la tabla cuando ni bien carga este html (cargar tu propia receta)
function recargaTabla(){
		let numGrupo = $(".js-numGrupo").val();
		$ajax({
			"url": "http://web-unicen.herokuapp.com/api/thing/group/"+numGrupo, 
			"method": "GET",
			"dataType": "JSON",
			"success": function(data){
				let html = "";
				for(let i = 0; i<data.information.length; i++){
					let receta=  data.information[i].thing;
					html+= "<tr>" + receta.nombreReceta + "</tr>";
					html+= "<tr>" + receta.categoria + "</tr>";
					html+= "<tr>" + receta.tiempococ + "</tr>";
					
					html+= "<td>" + receta.nombreReceta + "</td>";
					html+= "<td>" + receta.categoria + "</td>";
					html+= "<td>" + receta.tiempococ + "</td>";

				}
				$("js-getEnviar").html(html);
				
				alert(data);
			},
			"error": function(XMLHttpRequest, response, Error){
				console.log(error);
		}
			
		})
	};
	

//Rest para cargar la tabla.
$(document).ready(function(){
	"use strict";
	console.log("bind de eventos");
	$(".js-getEnviar").on("click", recargaTabla)
	
	
	function guardadoOK(data){
		console.log(data);
		//TODO: actualizar la tabla
	}

	
	$(".js-getEnviar").on("click", function(event){
	event.preventDefault;
	let numGrupo = 33;
	let receta = 
		{
			nombreReceta: $("#nombreR").val(),//TODO: leer del form id de receta field,
			categoria: $('input[name=blankRadio]:checked').val(),
			tiempococ:$("#tiempoPrep").val()
		};
		

	$.ajax(
		{
			"url":"http://web-unicen.herokuapp.com/api/thing/",
			"method": "POST",
			"data": JSON.stringify(receta),
			"dataType": "JSON",
			"sucess": guardadoOK,
			"error": function(xmlhr, response, error){
				console.log(error);
		}
		}
	);
});
});


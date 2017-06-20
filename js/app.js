//partial render, aca voy a recargar el html q necesito.
$(".partial").on("click", function(event){
	event.preventDefault();
	let dirNueva = $(this).attr("href")
	$.ajax({
		url: dirNueva,
		success: function(data){
			$(".contenedor").html(data);
			
			if(dirNueva == "html/cargarReceta.html"){ //cuando voy a cargar mi receta ahi me va a llamar el metodo recargaTabla
				recargaTabla();
				$(".js-getEnviar").on("click", agregarReceta); //una vez que aprieto el boton enviar me agrega la receta a la tabla
				$(".js-enviarTres").on("click", agregarTres); //cuando aprieto el boton agregar3, me agrega 3 recetas de una.
			}
		}
	});
});

//funcion que le paso a success para que me agregue 3.
function agregar3OK()
{
	recargaTabla();
}

//Esta funcion me agrega 3 recetas a la vez.
function agregarTres()
{
	let numGrupo = $(".js-numGrupo").val();
	let receta;
	for(let i=1; i<=3; i++)
	{
		receta = 
		{
			nombreReceta: "Receta ejemplo "+i,
			categoria: "categoria "+i,
			tiempococ: i*60+" minutos"
		};
	let objet = {"group" : numGrupo, "thing": receta};

	// aca hago el POST que voy a guardar en esa url, un JSON cuando sea success
	$.ajax(
		{
			"url":"http://web-unicen.herokuapp.com/api/thing",
			"method": "POST",
			"data": JSON.stringify(objet),
			"dataType": "JSON",
			"contentType": "application/json; charset=utf-8",
			"success": agregar3OK,
			"error": function(xmlhr, response, error){
				console.log(error);
			}
		}
	);
	}
}

//esta funcion recaga la tabla cuando ni bien carga este html (cargar tu propia receta)
function recargaTabla(){
		let numGrupo = $(".js-numGrupo").val();
		$.ajax({
			"url": "http://web-unicen.herokuapp.com/api/thing/group/"+numGrupo,
			"method": "GET",
			"dataType": "JSON",
			"success": function(data){
				let html = "";
				for(let i = 0; i<data.information.length; i++){
					let receta=  data.information[i].thing;
					html+= "<tr>";
					html+= "<td>" + receta.nombreReceta + "</td>";
					html+= "<td>" + receta.categoria + "</td>";
					html+= "<td>" + receta.tiempococ + "</td>";
					html+= '<td><button type="button" class="btn btn-default btn-lg js-eliminar" data-id="'+data.information[i]._id+'"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';
					html+= "</tr>";
				
				}
				$("#listasRecetas").html(html);
				// bindeamos los nuevos botones
				$(".js-eliminar").on("click", eliminarReceta);
				console.log(data);
			},
			"error": function(XMLHttpRequest, response, Error){
				console.log(error);
		}
			
		})
	};
	
// Agrega la receta que fue cargada en el formulario, en el success va a tirar un alert que fue guardada exitosamente.
function agregarReceta(event){
	event.preventDefault();
	let numGrupo = $(".js-numGrupo").val();;
	let receta = 
		{
			nombreReceta: $("#nombreR").val(),
			categoria: $('input[name=categoria]:checked').val(),
			tiempococ:$("#tiempoPrep").val()
		};
	let objet = {"group" : numGrupo, "thing": receta};
	$.ajax(
		{
			"url":"http://web-unicen.herokuapp.com/api/thing",
			"method": "POST",
			"data": JSON.stringify(objet),
			"dataType": "JSON",
			"contentType": "application/json; charset=utf-8",
			"success": guardadoOK,
			"error": function(xmlhr, response, error){
				console.log(error);
			}
		}
	);
}
// js formulario- Alert para decirle q se mando con exito la receta!
function guardadoOK(){
	alert("Tu mensaje ha sido enviado de forma exitosa, gracias por compartir con nosotros tu receta!");
	recargaTabla();
}

// funcion del boton eliminar, cuando apreto el boton eliminar me tirar un alert y me recarga la tabla.
function eliminadoOK(){
	alert("Estas seguro que desea eliminar la receta?");
	recargaTabla();
}
// Esta funcion elimina la receta
function eliminarReceta()
{
	let idObjeto = $(this).data("id");
	$.ajax({
			"url":"http://web-unicen.herokuapp.com/api/thing/"+idObjeto,
			"method": "DELETE",
			"success": eliminadoOK,
			"error": function(xmlhr, response, error){
				console.log(error);
			}
		}
	);
}


//Rest para cargar la tabla.
$(document).ready(function(){
	"use strict";
	//console.log("bind de eventos");
});


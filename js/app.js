console.log($(".partial"));

$(".partial").on("click", function(evento){
	evento.preventDefault();
	let dirNueva = $(this).attr("href")
	$.ajax({
		url: dirNueva,
		success: function(data){
			$(".contenedor").html(data)
		}
	});
});


// js formulario- Alert para decirle q se mando con exito la receta!

function enviarForm(){
	alert("Tu mensaje ha sido enviado de forma exitosa, gracias por compartir con nosotros tu receta!");
}

//Rest para cargar la tabla.
$(document).ready(function(){
	"use strict";
	$(".js-getFav").on("click", function(){
		alert("click en boton");
	})
});

var UrlGetArticulos = 'http://34.68.196.220:90/G4_19/Articulos/controller/articulos.php?op=GetArticulos';
var UrlPostArticulo = 'http://34.68.196.220:90/G4_19/Articulos/controller/articulos.php?op=InsertArticulos';
var UrlGetUno = 'http://34.68.196.220:90/G4_19/Articulos/controller/articulos.php?op=GetUno';
var UrlPutArticulo = 'http://34.68.196.220:90/G4_19/Articulos/controller/articulos.php?op=UpdateArticulos';
var UrlDaleteArticulo = 'http://34.68.196.220:90/G4_19/Articulos/controller/articulos.php?op=DeleteArticulos';
// cuando el documento(pagina este lista) aparecen los datos de articulos
$(document).ready(function(){
    CargarArticulos();
});

function CargarArticulos(){
    $.ajax({
        url: UrlGetArticulos,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores = '';
            for(i =0; i < MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].ID +'</td>'+
                '<td>'+ MiItems[i].DESCRIPCION +'</td>'+
                '<td>'+ MiItems[i].UNIDAD +'</td>'+
                '<td>'+ MiItems[i].COSTO +'</td>'+
                '<td>'+ MiItems[i].PRECIO +'</td>'+
                '<td>'+ MiItems[i].APLICA_ISV +'</td>'+
                '<td>'+ MiItems[i].PORCENTAJE_ISV +'</td>'+
                '<td>'+ MiItems[i].ESTADO +'</td>'+
                '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
                '<td>'+
                '<button class="btn btn-outline-info" onclick="CargarArticulo('+MiItems[i].ID+')">Editar</button>'+
                '<button class="btn btn-outline-danger" onclick="EliminarArticulo('+MiItems[i].ID+')">Eliminar</button>'+
                '</td>'+
                '</tr>';
            $('.articulos').html(Valores);
            }
        }
    });
}

function AgregarArticulo(){
    var datosarticulo = {
        descripcion: $('#descripcion').val(),
        unidad: $('#unidad').val(),
        costo: $('#costo').val(),
        precio: $('#precio').val(),
        aplica_isv: $('#aplica_isv').val(),
        porcentaje_isv: $('#porcentaje_isv').val(),
        estado: $('#estado').val(),
        id_socio: $('#id_socio').val()
    };
    var datosarticulojson = JSON.stringify(datosarticulo);

    $.ajax({
        url: UrlPostArticulo,
        type: 'POST',
        data: datosarticulojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
            
        }
    });
    alert("Articulo Agregado");
}

function CargarArticulo(idarticulo){
    var datosarticulo = {
        id: idarticulo
    };
    var datosarticulojson = JSON.stringify(datosarticulo);
    // alert(datosarticulojson);
    $.ajax({        
        url: UrlGetUno,
        type: 'POST',
        data: datosarticulojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#descripcion').val(MiItems[0].DESCRIPCION);
            $('#unidad').val(MiItems[0].UNIDAD);
            $('#costo').val(MiItems[0].COSTO);
            $('#precio').val(MiItems[0].PRECIO);
            $('#aplica_isv').val(MiItems[0].APLICA_ISV);
            $('#porcentaje_isv').val(MiItems[0].PORCENTAJE_ISV);
            $('#estado').val(MiItems[0].ESTADO)
            $('#id_socio').val(MiItems[0].ID_SOCIO);
            var btnactualizar = 
            '<input type="submit" id="btn_actualizar" onclick="ActualizarArticulo('+MiItems[0].ID+')"'+
            'value="Actualizar Articulo" class="btn btn-outline-primary"></input>';
            $('.button').html(btnactualizar);
            
        }
    });
}

function ActualizarArticulo(idarticulo){
    var datosarticulo = {
        id: idarticulo,
        descripcion: $('#descripcion').val(),
        unidad: $('#unidad').val(),
        costo: $('#costo').val(),
        precio: $('#precio').val(),
        aplica_isv: $('#aplica_isv').val(),
        porcentaje_isv: $('#porcentaje_isv').val(),
        estado: $('#estado').val(),
        id_socio: $('#id_socio').val()
    };
    var datosarticulojson = JSON.stringify(datosarticulo);

    $.ajax({
        url: UrlPutArticulo,
        type: 'PUT',
        data: datosarticulojson,
        datatype: 'JSON',
        contentType: 'aplication/json',
        success: function(response){
            console.log(response);
            
        }
    });
    alert("Articulo Actualizado");
}

function EliminarArticulo(idarticulo){
    var datosarticulo = {
        id: idarticulo
    };
    var datosarticulojson = JSON.stringify(datosarticulo);

    $.ajax({
        url: UrlDaleteArticulo,
        type: 'DELETE',
        data: datosarticulojson,
        datatype: 'JSON',
        contentType: 'aplication/json',
        success: function(response){
            console.log(response);
            
        }
    });
    alert("Articulo Eliminado");
    CargarArticulos();
}

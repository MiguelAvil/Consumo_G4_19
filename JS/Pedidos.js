var UrlGetPedidos = 'http://127.0.0.1:90/G4_19/controller/pedidos.php?op=GetPedidos';
var UrlPostPedido = 'http://127.0.0.1:90/G4_19/controller/pedidos.php?op=InsertPedidos';
var UrlGetUno = 'http://127.0.0.1:90/G4_19/controller/pedidos.php?op=GetUno';
var UrlPutPedidos = 'http://127.0.0.1:90/G4_19/controller/pedidos.php?op=UpdatePedidos';
var UrlDeletePedido = 'http://127.0.0.1:90/G4_19/controller/pedidos.php?op=DeletePedidos';

$(document).ready(function(){
    CargarPedidos();
});

function CargarPedidos(){
    $.ajax({
        url: UrlGetPedidos,
        type: 'GET',
        datatype: 'JSON',

        success: function(response){
            var MiItems = response;
            var Valores = '';
            for(i = 0; i < MiItems.length; i++){
                Valores += '<tr>'+
                    '<td>'+ MiItems[i].ID +'</td>'+
                    '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
                    '<td>'+ MiItems[i].FECHA_PEDIDO +'</td>'+
                    '<td>'+ MiItems[i].DETALLE +'</td>'+
                    '<td>'+ MiItems[i].SUB_TOTAL +'</td>'+
                    '<td>'+ MiItems[i].TOTAL_ISV +'</td>'+
                    '<td>'+ MiItems[i].TOTAL +'</td>'+
                    '<td>'+ MiItems[i].FECHA_ENTREGA +'</td>'+
                    '<td>'+ MiItems[i].ESTADO +'</td>'+
                    '<td>'+
                    '<button class="btn btn-outline-warning" onclick="CargarPedido('+ MiItems[i].ID +')">Editar</button>' +
                    '<td>'+
                    '<button class="btn btn-outline-danger" onclick="EliminarPedido('+ MiItems[i].ID +')">Eliminar</button>' +
                    '<td>'+
                '</tr>';
            $('.pedidos2').html(Valores);
            }
        }

    });
}

function AgregarPedido(){
    var datospedidos ={
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_PEDIDO: $('#FECHA_PEDIDO').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_ENTREGA: $('#FECHA_ENTREGA').val()
    }

    var datospedidosjson = JSON.stringify(datospedidos);

    $.ajax({
        url: UrlPostPedido,
        type: 'POST',
        data: datospedidosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Pedido Agregado")

}

function CargarPedido(IdPedido){
    var datospedido ={
        ID: IdPedido
    };

    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV );
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA);
            $('#ESTADO').val(MiItems[0].ESTADO);
            var btnactulizar = '<input type="submit" id="btn_actuazlizar" onclick="ActualizarPedido('+ MiItems[0].ID +')" value="Actualizar Provedor" class="btn btn-outline-primary"></input>';
            $('.button').html(btnactulizar);
        }
    });
}

function ActualizarPedido(IdPedido){
    var datospedidos ={
        ID: IdPedido,
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_PEDIDO: $('#FECHA_PEDIDO').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_ENTREGA: $('#FECHA_ENTREGA').val(),
        ESTADO: $('#ESTADO').val()
    }

    var datospedidosjson = JSON.stringify(datospedidos);

    $.ajax({
        url: UrlPutPedidos,
        type: 'PUT',
        data: datospedidosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Pedido Actualizado")
}

function EliminarPedido(IdPedido){
    var datospedido ={
        ID: IdPedido
    };

    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlDeletePedido,
        type: 'DELETE',
        data: datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Pedido Eliminado")
}
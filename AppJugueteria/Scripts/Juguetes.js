var dataTable, listaJuguetes = [];
$(document).ready(function () {
    LLenarTabla();

    $("#btnNuevo").on("click", function () {
        LevantaModal(1, 0);
    });

    $("#btnAgregar").on("click", function () {
        Agregar();
    });
});


function LevantaModal(opc, data) {

    LimpiarModal();

    if (opc == 2) {

        var objArray = listaJuguetes.filter(element => {
            return element["Id"] === data
        });
        var obj = objArray[0];

        $("#txtId").val(obj.Id);
        $("#txtNombre").val(obj.Nombre);
        $("#txtPrecio").val(obj.Precio);
        $("#txtCompania").val(obj.Compania);
        $("#txtEdad").val(obj.RestriccionEdad);
        $("#txtDescripcion").val(obj.Descripcion);
        $("#btnAgregar").text("Actualizar");
        $(".modal-title").text("ACTUALIZAR JUGUETE");
    }

    $("#dvAgregar").modal("show");

};

function LimpiarModal() {
    $("#txtId").val("0");
    $("#txtNombre").val("");
    $("#txtPrecio").val("");
    $("#txtCompania").val("");
    $("#txtEdad").val("");
    $("#txtDescripcion").val("");
    $("#btnAgregar").text("Agregar");
    $(".modal-title").text("AGREGAR JUGUETE");
}

function LLenarTabla() {

    $.ajax({
        type: "GET",
        url: "/Juguetes/Get",
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (!data.Error) {

                $("#dtJuguetes").dataTable().fnClearTable();
                $("#dtJuguetes").dataTable().fnDestroy();

                listaJuguetes = JSON.parse(data.Data);

                dataTable = $("#dtJuguetes").DataTable({
                    data: listaJuguetes,
                    columns: [
                        { "data": "Id" },
                        { "data": "Nombre" },
                        { "data": "Descripcion" },
                        { "data": "RestriccionEdad" },
                        { "data": "Compania" },
                        { "data": "Precio" },
                        {
                            "data": "Id", "render": function (data) {
                                return "<a class='btn btn-default btn-sm' onclick='LevantaModal(2," + data + ")' ><i class='fa fa-pencil'></i> Edit</a><a class='btn btn-danger btn-sm' style='margin-left:5px'onclick=Delete(" + data + ")><i class='fa fa-trash'></i> Delete</a>";
                            },
                            "orderable": false,
                            "searchable": false,
                            "width": "150px"
                        }],
                    columnDefss: [{
                        "targets": 0,
                        "visible": true
                    }],
                    "language": {

                        "emptyTable": "tabla vacia, por favor has click en boton <b>Nuevo</b> "
                    }

                });
            } else {
                alert("Error al consultar datos.");
                console.log(data.Data);
            }

        }
    });
}

function Agregar() {

    var datos = {
        Id: $("#txtId").val(),
        Nombre: $("#txtNombre").val(),
        Descripcion: $("#txtDescripcion").val(),
        RestriccionEdad: $("#txtEdad").val(),
        Compania: $("#txtCompania").val(),
        Precio: $("#txtPrecio").val()
    };

    $.ajax({
        type: "POST",
        url: "/Juguetes/Post",
        data: JSON.stringify(datos),
        async: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#dvAgregar").modal("hide");
        },
        success: function (data) {

            if (!data.Error) {

                var res = JSON.parse(data.Data);

                if (res.Id > 0) {
                    Swal.fire("Actualizado", datos.Nombre + " ha sido actualizado con éxito.", "success");

                } else {
                    Swal.fire("Guardado", datos.Nombre + " ha sido guardado con éxito.", "success");
                }
                LLenarTabla();
            }
            else {
                alert("Error al realizar la accion.");
                console.log(data.Data);
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            Swal.fire('Error', 'A ocurrido un error' + textStatus, 'error');
        }
    })
}

function Delete(id) {

    if (confirm('¿Desea realmente eliminar este dato?')) {
        $.ajax({
            type: "POST",
            url: "/Juguetes/Delete",
            async: true,
            data: JSON.stringify({ Id: id }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (!data.Error) {

                    Swal.fire("Eliminado", "El registro ha sido eliminado con éxito.", "success");
                    LLenarTabla();
                } else {
                    Swal.fire("Error", "Ocurrio un error al eliminar el registro.", "error");
                    console.log(data.Data);
                }
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Swal.fire('Error', 'A ocurrido un error' + textStatus, 'error');
            }
        });
    }
}
function filterFloat(evt, input) {
    // Backspace = 8, Enter = 13, ‘0′ = 48, ‘9′ = 57, ‘.’ = 46, ‘-’ = 43
    var key = window.Event ? evt.which : evt.keyCode;
    var chark = String.fromCharCode(key);
    var tempValue = input.value + chark;
    if (key >= 48 && key <= 57) {
        if (filter(tempValue) === false) {
            return false;
        } else {
            return true;
        }
    } else {
        if (key == 8 || key == 13 || key == 0) {
            return true;
        } else if (key == 46) {
            if (filter(tempValue) === false) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}
function filter(__val__) {
    var preg = /^([0-9]+\.?[0-9]{0,2})$/;
    if (preg.test(__val__) === true) {
        return true;
    } else {
        return false;
    }

}


function soloNumeros(evt) {

    // code is the decimal ASCII representation of the pressed key.
    var code = (evt.which) ? evt.which : evt.keyCode;

    if (code == 8) { // backspace.
        return true;
    } else if (code >= 48 && code <= 57) { // is a number.
        return true;
    } else { // other keys.
        return false;
    }
}
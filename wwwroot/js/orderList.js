var dataTable;
$(document).ready(function () {
    loadTable();
});


function loadTable() {
    dataTable = $("#DT_load").DataTable({
       // "processing": true,
       // "serverSide": true,
        "ajax": {
            "url": "/Orders/getall",
            "type": "GET",
            "datatype": "json",
            "error": function (e) { },
            "dataSrc": function (d) {
                return d;
            }
        },
        "order": [[0, "asc"]],

        "stateSave": "true",
       
        "columns": [
            { "data": "userName", "width": "40%" },
            { "data": "date", "width": "30%" },
            { "data": "adminAproval", "width": "10%" },
            { "data": "isSend", "width": "10%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center btn-group" style="direction:ltr">
                                <a onclick=Delete('/Orders/Delete?id=${data}') class="btn btn-oval btn-danger text-withe" style="cursor:pointer; width:70px;">
                                 حذف
                                    </a>
                                <a href="/Orders/Upsert?id=${data}" class="btn btn-oval btn-info text-withe" style="cursor:pointer; width:70px;">
                                تعديل
                                    </a>
                                </div>`;
                }, "width": "10%"
            }
        ],
       
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    });
   
}
function Delete(url) {
    swal({
        title: "تأكيد الحذف",
        text: "هل أنت متأكد من إجراء عملية الحذف؟",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}




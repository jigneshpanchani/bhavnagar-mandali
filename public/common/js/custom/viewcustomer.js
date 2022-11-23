$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $(document).on('click', '.customerstatus', function () {
        var customerId = $(this).attr('data-id');
        var customerStatus = $(this).attr('data-status');
        let dataArr = {
            id: customerId,
            status: customerStatus
        }

        $.ajax({
            type: "POST",
            url: site_url + "api/customer/ajaxAction",
            dataType: "json",
            data: { 'action': 'updateStatus', 'data': dataArr },
            success: function (response) {
                kendo.ui.progress($(document.body), false);
                $(document).find('#' + id).getKendoWindow().close();
                $('#customerList').data('kendoGrid').refresh();
                $('#customerList').data('kendoGrid').dataSource.read();
                notificationDisplay(response.message, '', response.status);
            }
        });
    });

    $("#customerList").kendoGrid({
        dataSource: customDataSource(
            "api/customer-data", {
            // id: { type: "integer" },
            // name: { type: "string" },
            // created_by: { type: "string" },
            // updated_by: { type: "string" }
        },
        ),
        pageable: customPageableArr(),
        dataBound: function (e) {

            setTimeout(function () {
                setFilterIcon("#customerList");
            }, 100);
        },

        filterable: true,
        sortable: true,
        resizable: true,

        columns: [
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: id #</div>",
                field: "id",
                title: "ID"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: first_name #</div>",
                field: "first_name",
                title: "First Name"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: current_post #</div>",
                field: "current_post",
                title: "Current Post"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: branch_name #</div>",
                field: "branch_name",
                title: "Branch Name"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: member_nominee_name #</div>",
                field: "member_nominee_name",
                title: "Member Nominee Name"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: bank_name #</div>",
                field: "bank_name",
                title: "Bank Name"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: status #</div>",
                field: "status",
                title: "Status"
            },

            {
                template: function (dataItem) {
                    return manageAction(dataItem.id);
                },
                field: "action",
                title: "ACTIONS",
                filterable: false,
            },

        ],
        noRecords: noRecordTemplate()
    });
    customGridHtml("#customerList");

    function manageAction(id) {
        return '<div class="custom-dropdown">\n' +
                    '<div class="dropdown topbar-item bg-gray-100 btn-group btn-group-lg p-1 rounded-md" data-toggle="dropdown">\n' +
                        '<button class="btn-icon btn-clean btn-dropdown">\n' +
                            '<span class="k-icon k-i-more-vertical k-icon-gray"></span>\n' +
                            '<span class="sr-only">Toggle Dropdown</span>\n' +
                        '</button>\n' +
                    '</div>\n' +
                    '<div class="dropdown-menu dropdown-menu-anim-up">\n' +
                        '<ul class="navi navi-hover">\n' +
                            '<li class="navi-item">\n' +
                                '<a href="customer/' + id + '/edit" class="editCustomer navi-link flex space-x-3 py-2 w-full" data-id = "' + id + '"><span class="k-icon k-i-edit k-icon-edit"></span><span class="text-sm leading-5 navi-text text-gray-700">Edit</span></a>\n' +
                            '</li>\n' +
                            '<li class="navi-item">\n' +
                            '   <a href="#" class="deletecustomer navi-link flex space-x-3 py-2 w-full" data-id = "' + id + '"><span class="k-icon k-i-delete k-icon-delete"></span><span class="text-sm leading-5 navi-text text-red-700">Delete</span></a>\n' +
                            '</li>\n' +
                            '<li class="navi-item">\n' +
                                '<a href="javascript:;" class="customerstatus navi-link flex space-x-3 py-2 w-full" data-id = "' + id + '" data-status = "Approve"><span class="k-icon k-i-status k-i-active" k-icon-status"></span><span class="text-sm leading-5 navi-text text-red-700">Approve</span></a>\n' +
                            '</li>\n' +
                            '<li class="navi-item">\n' +
                                '<a href="javascript:;" class="customerstatus navi-link flex space-x-3 py-2 w-full" data-id = "' + id + '" data-status = "Decline"><span class="k-icon k-i-status k-i-active" k-icon-status"></span><span class="text-sm leading-5 navi-text text-red-700">Decline</span></a>\n' +
                            '</li>\n' +
                            '<li class="navi-item">\n' +
                                '<a href="customer/' + id + '/" class="yojna navi-link flex space-x-3 py-2 w-full" data-id = "' + id + '"><span class="k-icon k-i-edit k-icon-edit"></span><span class="text-sm leading-5 navi-text text-gray-700">Yojna</span></a>\n' +
                            '</li>\n' +
                        '</ul>\n' +
                    '</div>\n' +
                '</div>\n';
    }

    function onOpenDeleteDialog(gridID) {
        $(gridID).parent().find('.k-dialog-titlebar').addClass("bg-gradient-to-l from-green-400 to-blue-500");
        $(gridID).parent().find('button:first').addClass('bg-white shadow border hover:shadow-lg rounded-lg  border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-500');
        $(gridID).parent().find('.k-primary').addClass('text-white bg-primary-blue-500 hover:shadow-lg rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-500');
    }

    $("#deleteCustomerModal").kendoDialog({
        width: "400px",
        title: "Delete",
        content: "Are you sure you want to Delete Customer? <input type='hidden' name='id' id='deleteAgentDocId' />",
        actions: [
            { text: 'Close' },
            { text: 'Yes', primary: true, action: function () { deleteCustomerFunction($("#deleteCustomerModal").find("#deleteAgentDocId").val()); } }
        ],
        animation: {
            open: {
                effects: "fade:in"
            }
        },
        open: onOpenDeleteDialog('#deleteCustomerModal'),
        visible: false
    });

    function deleteCustomerFunction(primaryID) {
        if (primaryID > 0) {
            kendo.ui.progress($(document.body), true);
            $.ajax({
                type: "POST",
                url: site_url + "api/remove-customer",
                dataType: "json",
                data: { 'id': primaryID },
                success: function (response) {
                    kendo.ui.progress($(document.body), false);
                    $('#customerList').data('kendoGrid').refresh();
                    $('#customerList').data('kendoGrid').dataSource.read();
                    notificationDisplay(response.message, '', response.status);
                }
            });
        }
    }

    $("body").on("click", ".deletecustomer", function () {
        let primaryID = $(this).attr('data-id');
        $("#deleteCustomerModal").data("kendoDialog").open();
        $("#deleteCustomerModal").find("#deleteAgentDocId").val(primaryID);
    });

});
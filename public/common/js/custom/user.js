$(document).ready(function(){

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    // $("#loader").kendoLoader();
    // kendo.ui.progress.messages = {
    //     loading: '<div class="vue-simple-spinner animate-spin" style="position:absolute;top:50%;left:50%;transfrom:translate(-50%,-50%); margin: 0px auto; border-radius: 100%; border-color: rgb(50, 157, 243) rgb(238, 238, 238) rgb(238, 238, 238); border-style: solid; border-width: 3px; border-image: none 100% / 1 / 0 stretch; width: 90px; height: 90px;"></div>'
    // };

    $("#userList").kendoGrid({
        dataSource: customDataSource(
            "api/users-data", {
                id: { type: "integer" },
                name:  { type: "string" },
                email: { type: "string" }
            },
            
        ),
        pageable: customPageableArr(),
        dataBound: function(e) {
            setTimeout(function() {
                setFilterIcon("#userList");
            }, 100);
        },
        filterable: true,
        sortable: true,
        resizable: true,
        columns: [
            {
                template: "<div class='flex items-center text-sm leading-5 fff font-normal text-gray-600'>#: id #</div>",
                field: "id",
                title: "ID"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: name #</div>",
                field: "name",
                title: "NAME"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: email #</div>",
                field: "email",
                title: "Email"
            },
            {
                template: function(dataItem) {
                    return manageAction(dataItem.id);
                },
                field: "action",
                title: "ACTIONS",
                filterable: false,
            },
        ],
        noRecords: noRecordTemplate()
    });
    customGridHtml("#userList");

    function manageAction(id){
        return  '<div class="custom-dropdown">\n' +
                    '<div class="dropdown topbar-item bg-gray-100 btn-group btn-group-lg p-1 rounded-md" data-toggle="dropdown">\n' +
                        '<button class="btn-icon btn-clean btn-dropdown">\n' +
                            '<span class="k-icon k-i-more-vertical k-icon-gray"></span>\n' +
                            '<span class="sr-only">Toggle Dropdown</span>\n' +
                        '</button>\n' +
                    '</div>\n' +
                    '<div class="dropdown-menu dropdown-menu-anim-up">\n' +
                        '<ul class="navi navi-hover">\n' +
                            '<li class="navi-item">\n' +
                                '<a href="#" class="editUser navi-link flex space-x-3 py-2 w-full" data-id = "' + id + '"><span class="k-icon k-i-edit k-icon-edit"></span><span class="text-sm leading-5 navi-text text-gray-700">Edit</span></a>\n' +
                            '</li>\n' +
                            '<li class="navi-item">\n' +
                                '<a href="#" class="deleteUser navi-link flex space-x-3 py-2 w-full" data-id = "' + id + '"><span class="k-icon k-i-delete k-icon-delete"></span><span class="text-sm leading-5 navi-text text-red-700">Delete</span></a>\n' +
                            '</li>\n' +
                        '</ul>\n' +
                    '</div>\n' +
                '</div>\n';
    }

    $("body").on("click", ".addUser", function(){
        $(document).find("#addUserModal").find('input[name]').removeClass('k-invalid');
        kendowindowOpen("#addUserModal");
    });

    $("#addUserModal").kendoWindow(modalopen('Add User'));
    $("#editUserModal").kendoWindow(modalopen('Edit User'));
    $("#deleteUserModal").kendoWindow(modalopen('Delete User'));

    function saveModalData(formId='', type='' ,modalId=''){
        kendo.ui.progress($(document.body), true);
        let serializeArr = $(document).find("#"+modalId).find('input[name], select[name], textarea[name]').serializeArray();
        let dataArr = {}
        $(serializeArr).each(function (i, field) {
            dataArr[field.name] = field.value;
        });
        $.ajax({
            type: "POST",
            url: site_url + "api/users/ajaxAction",
            dataType: "json",
            data: {'action': type, 'data': dataArr },
            success: function (response) {
                kendo.ui.progress($(document.body), false);
                $(document).find('#'+modalId).getKendoWindow().close();
                $('#userList').data('kendoGrid').refresh();
                $('#userList').data('kendoGrid').dataSource.read();
                notificationDisplay(response.message, '', response.status);
            }
        });
    }

    $("#addUserForm").kendoForm({
        orientation: "vertical",
        items: [
            { field: "name", label: "Name:", validation: { required: { message: "Enter User Name" } } },
            { field: "email", label: "Email:", validation: { required: { message: "Enter User Email" }, email: true  } },
            { field: "password",
              label: "Password:",
              validation: { required: true },
                    editor: function (container, options) {
                    // $('<input type="password" name="password" />')
                    $('<input type="password" id="Password" name="' + options.field + '" title="Password" required="required"  />')
                    .appendTo(container)
                    .kendoTextBox();
                    },
            }
                   
        ],
        buttonsTemplate: '<div class="w-full inline-flex space-x-4 items-center justify-end py-2">\n' +
                            '<div class="float-right flex space-x-4 items-center justify-end">\n' +
                                '<button type="button" class="btn btn-outline-secondary font-weight-bold btn-sm cancel-btn" data-type-id="addUserModal" type="button">Cancel</button>\n' +
                                '<button type="submit" class="btn btn-primary font-weight-bold btn-sm" type="submit">Add User</button>\n' +
                            '</div>\n' +
                        '</div>',
        submit: function(ev) {
            saveModalData('addUserForm' , 'save_user','addUserModal');
            ev.preventDefault();
            return false;
        }
    });

    $("#editUserForm").kendoForm({
        // dataSource: customDataSource(
        //     "api/user-data",{
        //         name:     {type: "string"},
        //         email:    {type: "string"},
        //         password: {type: "string"},
        //     }
        // ),
        formData: {
            name: "",
            email: "",
            // password: ""
         },
        orientation: "vertical",
        items: [
            { field: "name", label: "Name:", validation: { required: { message: "Enter User Name" } } },
            { field: "email", label: "Email:", validation: { required: { message: "Enter User Email" }, email: true  } },
            // { field: "password", label: "Password:", validation: { required: { message: "Enter User Password" } }},
        ],
        buttonsTemplate: '<div class="w-full inline-flex space-x-4 items-center justify-end py-2">\n' +
                            '<div class="float-right flex space-x-4 items-center justify-end">\n' +
                                '<button type="button" class="btn btn-outline-secondary font-weight-bold btn-sm cancel-btn" data-type-id="editUserModal" type="button">Cancel</button>\n' +
                                '<input type="hidden" id="editId" name="id">\n' +
                                '<button type="submit" class="btn btn-primary font-weight-bold btn-sm" type="submit">Edit User</button>\n' +
                            '</div>\n' +
                        '</div>',
        submit: function(ev) {
            saveModalData('editUserForm' , 'save_user', 'editUserModal');
            ev.preventDefault();
            return false;
        }
    });

    $("body").on("click", ".editUser", function(){
        let primaryID = $(this).attr('data-id');
        if (primaryID > 0) {
            kendo.ui.progress($(document.body), true);
            $.ajax({
                type: "POST",
                url: site_url + "api/get-user-details",
                dataType: "json",
                data: {'id': primaryID},
                success: function (response) {
                    kendo.ui.progress($(document.body), false);
                    let editUser = $(document).find('#editUserForm');
                    editUser.find("#editId").val(primaryID);
                    editUser.find('#name').val(response.data.name);
                    editUser.find("#email").val(response.data.email);
                    editUser.find("#password").val(response.data.password);

                }
            });
       }
        kendowindowOpen("#editUserModal");
    });

    function onOpenDeleteDialog(gridID) {
        $(gridID).parent().find('.k-dialog-titlebar').addClass("bg-gradient-to-l from-green-400 to-blue-500");
        $(gridID).parent().find('button:first').addClass('bg-white shadow border hover:shadow-lg rounded-lg  border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-500');
        $(gridID).parent().find('.k-primary').addClass('text-white bg-primary-blue-500 hover:shadow-lg rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-500');
    }

    $("#deleteUserModal").kendoDialog({
        width: "400px",
        title: "Delete",
        content: "Are you sure you want to Delete User? <input type='hidden' name='id' id='deleteAgentDocId' />",
        actions: [
            {text: 'Close'},
            {text: 'Yes', primary: true, action: function () { deleteUserFunction($("#deleteUserModal").find("#deleteAgentDocId").val()); } }
        ],
        animation: {
            open: {
                effects: "fade:in"
            }
        },
        open: onOpenDeleteDialog('#deleteUserModal'),
        visible: false
    });

    function deleteUserFunction(primaryID) {
        if (primaryID > 0) {
            kendo.ui.progress($(document.body), true);
            $.ajax({
                type: "POST",
                url: site_url + "api/remove-user",
                dataType: "json",
                data: { 'id': primaryID},
                success: function(response) {
                    kendo.ui.progress($(document.body), false);
                    $('#userList').data('kendoGrid').refresh();
                    $('#userList').data('kendoGrid').dataSource.read();
                }
            });
        }
    }

    $("body").on("click", ".deleteUser", function() {
        let primaryID = $(this).attr('data-id');
        $("#deleteUserModal").data("kendoDialog").open();
        $("#deleteUserModal").find("#deleteAgentDocId").val(primaryID);
    });

});

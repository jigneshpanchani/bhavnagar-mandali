$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $("#loader").kendoLoader();
    kendo.ui.progress.messages = {
        loading: '<div class="vue-simple-spinner animate-spin" style="position:absolute;top:50%;left:50%;transfrom:translate(-50%,-50%); margin: 0px auto; border-radius: 100%; border-color: rgb(50, 157, 243) rgb(238, 238, 238) rgb(238, 238, 238); border-style: solid; border-width: 3px; border-image: none 100% / 1 / 0 stretch; width: 90px; height: 90px;"></div>'
    };


    $("#divisionList").kendoGrid({
        dataSource: customDataSource(
            "api/division-data", {
            id:         { type: "string" },
            name:       { type: "string" },
            created_by: { type: "string" },
            updated_by: { type: "string" }
        },
        ),
        pageable: customPageableArr(),
        dataBound: function (e) {
            setTimeout(function () {
                setFilterIcon("#divisionList");
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
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: division_name #</div>",
                field: "division_name",
                title: "NAME"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: createdBy #</div>",
                field: "createdBy",
                title: "CREATED BY"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: updatedBy #</div>",
                field: "updatedBy",
                title: "UPDATE BY"
            },
            {
                template: function (dataItem) {
                    return manageAction(dataItem.id);
                },
                field: "action",
                title: "ACTION",
                filterable: false,
            },
        ],
        noRecords: noRecordTemplate()
    });
    customGridHtml("#divisionList");

    function saveModalData(formId = '', type = '', modalId = '') {
        kendo.ui.progress($(document.body), true);
        let serializeArr = $(document).find("#" + modalId).find('input[name], select[name], textarea[name]').serializeArray();
        let dataArr = {}
        $(serializeArr).each(function (i, field) {
            dataArr[field.name] = field.value;
        });
        dataArr.created_by = login_id;
        dataArr.updated_by = login_id;
        $.ajax({
            type: "POST",
            url: site_url + "api/division/ajaxAction",
            dataType: "json",
            data: { 'action': 'save_division', 'data': dataArr },
            success: function (response) {
                kendo.ui.progress($(document.body), false);
                $(document).find("#" + modalId).find('input[name]').val('');
                $(document).find("#" + modalId).find('input[name]').removeClass('k-invalid');
                $(document).find('#' + modalId).getKendoWindow().close();
                $('#divisionList').data('kendoGrid').refresh();
                $('#divisionList').data('kendoGrid').dataSource.read();
                notificationDisplay(response.message, '', response.status);
            }
        });
    }


    $("body").on("click", ".adddivision", function () {
        $(document).find("#addDivisionModal").find('input[name]').removeClass('k-invalid');
        kendowindowOpen("#addDivisionModal");
    });

    $("#addDivisionModal").kendoWindow(modalopen('Add Division'));
    $("#editDivisionModal").kendoWindow(modalopen('Edit Division'));



    $("#addDivisionForm").kendoForm({
        orientation: "vertical",
        items: [
            { field: "name", label: "Name:", validation: { required: { message: "Enter Division Name" } } },
        ],
        buttonsTemplate: '<div class="w-full inline-flex space-x-4 items-center justify-end py-2">\n' +
            '<div class="float-right flex space-x-4 items-center justify-end">\n' +
            '<button type="button" class="btn btn-outline-secondary font-weight-bold btn-sm cancel-btn" data-type-id="addDivisionModal" type="button">Cancel</button>\n' +
            '<button type="submit" class="btn btn-primary font-weight-bold btn-sm" type="submit">Add Division</button>\n' +
            '</div>\n' +
            '</div>',
        submit: function (ev) {
            saveModalData('addDivisionForm', 'save_division', 'addDivisionModal');
            ev.preventDefault();
            // return false;
        }
    });

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
            '<a href="#" class="editDivision navi-link flex space-x-3 py-2 w-full" data-id = "' + id + '"><span class="k-icon k-i-edit k-icon-edit"></span><span class="text-sm leading-5 navi-text text-gray-700">Edit</span></a>\n' +
            '</li>\n' +
            '<li class="navi-item">\n' +
            '<a href="#" class="deleteDivision navi-link flex space-x-3 py-2 w-full" data-id = "' + id + '"><span class="k-icon k-i-delete k-icon-delete"></span><span class="text-sm leading-5 navi-text text-red-700">Delete</span></a>\n' +
            '</li>\n' +
            '</ul>\n' +
            '</div>\n' +
            '</div>\n';
    }

    $("#editDivisionForm").kendoForm({
        dataSource: customDataSource(
            "api/division-data", {
            name: { type: "string" }
        }
        ),
        formData: {
            name: "",
        },
        orientation: "vertical",
        items: [
            { field: "name", label: "Name:", validation: { required: { message: "Enter Division Name" } } },

        ],
        buttonsTemplate: '<div class="w-full inline-flex space-x-4 items-center justify-end py-2">\n' +
            '<div class="float-right flex space-x-4 items-center justify-end">\n' +
            '<button type="button" class="btn btn-outline-secondary font-weight-bold btn-sm cancel-btn" data-type-id="editDivisionModal" type="button">Cancel</button>\n' +
            '<input type="hidden" id="editId" name="id">\n' +
            '<button type="submit" class="btn btn-primary font-weight-bold btn-sm" type="submit">Edit Division</button>\n' +
            '</div>\n' +
            '</div>',
        submit: function (ev) {
            saveModalData('editDivisionForm', 'save_division', 'editDivisionModal');
            ev.preventDefault();
            return false;
        }
    });

    $("body").on("click", ".editDivision", function () {
        kendo.ui.progress($(document.body), true);
        let primaryID = $(this).attr('data-id');
        if (primaryID > 0) {
            $.ajax({
                type: "POST",
                url: site_url + "api/get-division-details",
                dataType: "json",
                data: { 'id': primaryID },
                success: function (response) {
                    kendo.ui.progress($(document.body), false);
                    let editDivision = $(document).find('#editDivisionForm');
                    editDivision.find("#editId").val(primaryID);
                    editDivision.find('#name').val(response.data.name);


                }
            });
        }
        kendowindowOpen("#editDivisionModal");
    });

    $("body").on("click", ".deleteDivision", function () {
        let primaryID = $(this).attr('data-id');
        $("#deleteDivisionModal").data("kendoDialog").open();
        $("#deleteDivisionModal").find("#deleteAgentDocId").val(primaryID);
    });


    //delete
    $("#deleteDivisionModal").kendoWindow(modalopen('Delete Division'));

    $("#deleteDivisionModal").kendoDialog({
        width: "400px",
        title: "Delete",
        content: "Are you sure you want to Delete Division? <input type='hidden' name='id' id='deleteAgentDocId' />",
        actions: [
            { text: 'Close' },
            { text: 'Yes', primary: true, action: function () { deleteDivisionFunction($("#deleteDivisionModal").find("#deleteAgentDocId").val()); } }
        ],
        animation: {
            open: {
                effects: "fade:in"
            }
        },
        visible: false
    });

    function deleteDivisionFunction(primaryID) {
        if (primaryID > 0) {
            kendo.ui.progress($(document.body), true);
            $.ajax({
                type: "POST",
                url: site_url + "api/remove-division",
                dataType: "json",
                data: { 'id': primaryID },
                success: function (response) {
                    kendo.ui.progress($(document.body), false);
                    $('#divisionList').data('kendoGrid').refresh();
                    $('#divisionList').data('kendoGrid').dataSource.read();
                }
            });
        }
    }

});

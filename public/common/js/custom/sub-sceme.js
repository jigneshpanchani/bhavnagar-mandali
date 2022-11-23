$(document).ready(function(){

    let passArr = { 'sceme_name': $(document).find('#sceme_name').val() };

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $("#loader").kendoLoader();
    kendo.ui.progress.messages = {
        loading: '<div class="vue-simple-spinner animate-spin" style="position:absolute;top:50%;left:50%;transfrom:translate(-50%,-50%); margin: 0px auto; border-radius: 100%; border-color: rgb(50, 157, 243) rgb(238, 238, 238) rgb(238, 238, 238); border-style: solid; border-width: 3px; border-image: none 100% / 1 / 0 stretch; width: 90px; height: 90px;"></div>'
    };

    $("#subscemeList").kendoGrid({
        dataSource: customDataSource(
            "api/sub-sceme-data", {
                id: { type: "integer" },
                sceme_id: {type: "string"},
                name:  { type: "string" },
                rate_of_int: { type: "integer"},
                created_by: { type: "string" },
                updated_by: {type: "string"}
            },
        ),
        pageable: customPageableArr(),
        dataBound: function(e) {
            setTimeout(function() {
                setFilterIcon("#subscemeList");
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
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: sceme_name #</div>",
                field: "sceme_name",
                title: "SCEME NAME"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: sub_sceme_name #</div>",
                field: "sub_sceme_name",
                title: "SUB-SCEME NAME"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: rate_of_int #</div>",
                field: "rate_of_int",
                title: "Rate Of Interest"
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
    customGridHtml("#subscemeList");

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
                                '<a href="#" class="editSubSceme navi-link flex space-x-3 py-2 w-full" data-id = "' + id + '"><span class="k-icon k-i-edit k-icon-edit"></span><span class="text-sm leading-5 navi-text text-gray-700">Edit</span></a>\n' +
                            '</li>\n' +
                            '<li class="navi-item">\n' +
                                '<a href="#" class="deleteSubSceme navi-link flex space-x-3 py-2 w-full" data-id = "' + id + '"><span class="k-icon k-i-delete k-icon-delete"></span><span class="text-sm leading-5 navi-text text-red-700">Delete</span></a>\n' +
                            '</li>\n' +
                        '</ul>\n' +
                    '</div>\n' +
                '</div>\n';
    }
//add sub-sceme
    $("body").on("click", ".addsubsceme", function(){
        $(document).find("#addSubScemeModal").find('input[name]').removeClass('k-invalid');
        kendowindowOpen("#addSubScemeModal");
    });

    $("#addSubScemeModal").kendoWindow(modalopen('Add Sub-Sceme'));

    $("#addSubScemeForm").kendoForm({
        orientation: "vertical",
        items: [
            {
                field: "sceme_id",
                 editor: "DropDownList",
                label: "Select Sceme",
                editorOptions: {
                    optionLabel: "Select...",
                    dataSource: getDropdownDataSource('get-sceme-name', []),
                    dataValueField: "Id", //Id
                    dataTextField: "Name"
                    },
                    validation: { required: { message: "Select Sceme"} }
            },
            { field: "name", label: "Sub Sceme Name:", validation: { required: { message: "Enter Sub-Sceme Name" } } },
            { field: "rate_of_int", label: "Rate Of Interest:"}    
        ],
        buttonsTemplate: '<div class="w-full inline-flex space-x-4 items-center justify-end py-2">\n' +
                            '<div class="float-right flex space-x-4 items-center justify-end">\n' +
                                '<button type="button" class="btn btn-outline-secondary font-weight-bold btn-sm cancel-btn" data-type-id="addSubScemeModal" type="button">Cancel</button>\n' +
                                '<button type="submit" class="btn btn-primary font-weight-bold btn-sm" type="submit">Add Sub-Sceme</button>\n' +
                            '</div>\n' +
                        '</div>',
        submit: function(ev) {
            saveModalData('addSubScemeForm' , 'save_sub_sceme','addSubScemeModal');
            ev.preventDefault();
           // return false;
        }

    });

    function getDropdownDataSource(api_url, postArr = []) {
        return {
            schema: {
                data: 'data'
            },
            transport: {
                read: {
                    url: site_url + "api/" + api_url,
                    dataType: 'json',
                    type: 'POST',
                    data: postArr
                }
            }
        }
    }

    function saveModalData(formId='', type='' ,modalId=''){
        kendo.ui.progress($(document.body), true);
        let serializeArr = $(document).find("#"+modalId).find('input[name], select[name], textarea[name]').serializeArray();
        let dataArr = {}
        $(serializeArr).each(function (i, field) {
            dataArr[field.name] = field.value;
        });
        dataArr.created_by = login_id;
        dataArr.updated_by = login_id;
        $.ajax({
            type: "POST",
            url: site_url + "api/sub-sceme/ajaxAction",
            dataType: "json",
            data: {'action': 'save_sub_sceme', 'data': dataArr },
            success: function (response) {
                kendo.ui.progress($(document.body), false);
                $(document).find("#"+modalId).find('input[name]').val('');
                $(document).find("#"+modalId).find('input[name]').removeClass('k-invalid');
                $(document).find('#'+modalId).getKendoWindow().close();
                $('#subscemeList').data('kendoGrid').refresh();
                $('#subscemeList').data('kendoGrid').dataSource.read();
                notificationDisplay(response.message, '', response.status);

            }
        });
    }

    function getDropdownDataSource(api_url, postArr = []) {
        return {
            schema: {
                data: 'data'
            },
            transport: {
                read: {
                    url: site_url + "api/" + api_url,
                    dataType: 'json',
                    type: 'POST',
                    data: postArr
                }
            }
        }
    }

    function setDropdownList(fieldID, api_url, postArr = {}) {
        $("#" + fieldID).kendoDropDownList({
            autoWidth: true,
            // dataTextField: "text",
            dataValueField: "value",
            dataSource: getDropdownDataSource(api_url, postArr),
        });
    }

    //edit
    $("#editSubScemeModal").kendoWindow(modalopen('Edit Sub-Sceme'));

    $("body").on("click", ".editSubSceme", function(){

        let primaryID = $(this).attr('data-id');
        if (primaryID > 0) {
            // kendo.ui.progress($(document.body), true);
            $.ajax({
                type: "POST",
                url: site_url + "api/get-sub-sceme-details",
                dataType: "json",
                data: {'id': primaryID},
                success: function (response) {
                    // kendo.ui.progress($(document.body), false);
                    let editSubSceme = $(document).find('#editSubScemeForm');
                 //   console.log(response.data.sceme_id);  return false;
                    editSubSceme.find("#editId").val(primaryID);
                    editSubSceme.find('#name').val(response.data.name);
                    editSubSceme.find("#sceme_id").data('kendoDropDownList').value(response.data.sceme_id);
                    editSubSceme.find('#rate_of_int').val(response.data.rate_of_int);


                }
            });
       }
        kendowindowOpen("#editSubScemeModal");
    });

    $("#editSubScemeForm").kendoForm({
        dataSource: customDataSource(
            "api/sub-sceme-data",{

                name:    {type: "string"},
                rate_of_int: { type: "integer"},
            }
        ),
        formData: {
            name: "",
            rate_of_int: "",

         },
        orientation: "vertical",
        items: [
            {
                field: "sceme_id",
                 editor: "DropDownList",
                label: "Select Sceme",
                editorOptions: {
                    optionLabel: "Select...",
                    dataSource: getDropdownDataSource('get-sceme-name', []),
                    dataValueField: "Id", //Id
                    dataTextField: "Name"
                    },
                    validation: { required: { message: "Select Sceme"} }
            },
            { field: "name", label: "Sub Sceme Name:", validation: { required: { message: "Enter Sub-Sceme Name" } } },
            { field: "rate_of_int", label: "Rate Of Interest:"}    
        ],
        buttonsTemplate: '<div class="w-full inline-flex space-x-4 items-center justify-end py-2">\n' +
                            '<div class="float-right flex space-x-4 items-center justify-end">\n' +
                               '<button type="button" class="btn btn-outline-secondary font-weight-bold btn-sm cancel-btn" data-type-id="editSubScemeModal" type="button">Cancel</button>\n' +
                                '<input type="hidden" id="editId" name="id">\n' +
                                '<button type="submit" class="btn btn-primary font-weight-bold btn-sm" type="submit">Edit Sub-Sceme</button>\n' +
                            '</div>\n' +
                        '</div>',
        submit: function(ev) {
            saveModalData('editSubScemeForm' , 'save_sub_sceme', 'editSubScemeModal');
            ev.preventDefault();
            return false;
        }
    });

      //delete

      $("#deleteSubScemenModal").kendoWindow(modalopen('Delete Sub-Sceme'));
        $("#deleteSubScemenModal").kendoDialog({
        width: "400px",
        title: "Delete",
        content: "Are you sure you want to Delete User? <input type='hidden' name='id' id='deleteAgentDocId' />",
        actions: [
            {text: 'Close'},
            {text: 'Yes', primary: true, action: function () { deleteSubScemeFunction($("#deleteSubScemenModal").find("#deleteAgentDocId").val()); } }
        ],
        animation: {
            open: {
                effects: "fade:in"
            }
        },
        visible: false
    });

    $("body").on("click", ".deleteSubSceme", function() {
        let primaryID = $(this).attr('data-id');
        $("#deleteSubScemenModal").data("kendoDialog").open();
        $("#deleteSubScemenModal").find("#deleteAgentDocId").val(primaryID);
    });

    function deleteSubScemeFunction(primaryID) {
        if (primaryID > 0) {
            kendo.ui.progress($(document.body), true);
            $.ajax({
                type: "POST",
                url: site_url + "api/remove-sub-sceme",
                dataType: "json",
                data: { 'id': primaryID},
                success: function(response) {
                    kendo.ui.progress($(document.body), false);
                    $('#subscemeList').data('kendoGrid').refresh();
                    $('#subscemeList').data('kendoGrid').dataSource.read();
                }
            });
        }
    }

});

$(document).ready(function(){

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $("#vyajGanatriList").kendoGrid({
        dataSource: customDataSource(
            "api/reports-data", {
            },

        ),
        pageable: customPageableArr(),
        dataBound: function(e) {
            setTimeout(function() {
                setFilterIcon("#vyajGanatriList");
            }, 100);
        },
        filterable: true,
        sortable: true,
        resizable: true,
        columns: [
            {
                template: "<div class='flex items-center text-sm leading-5 fff font-normal text-gray-600'>#: account_no #</div>",
                field: "account_no",
                title: "ACCOUNT NO"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: customer_name #</div>",
                field: "customer_name",
                title: "CUSTOMER NAME"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: sub_scheme_name #</div>",
                field: "sub_scheme_name",
                title: "TYPE OF LOAN"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: loan_fd_amount #</div>",
                field: "loan_fd_amount",
                title: "LOAN AMOUNT"
            },
        ],
        noRecords: noRecordTemplate()
    });
    customGridHtml("#vyajGanatriList");


    $("body").on("click", ".vyaj-ganatri", function(){
        $(document).find("#vyajGanatriModal").find('input[name]').removeClass('k-invalid');
        kendowindowOpen("#vyajGanatriModal");
    });

    $("#vyajGanatriModal").kendoWindow(modalopen('Vyaj Ganatri Calculator'));

    $("#vyajGanatriForm").kendoForm({
        orientation: "vertical",
        layout: "grid",
        grid: {
            cols: 1,
            gutter: 20
        },
        items:
        [
            {
            type: "group",
            layout: "grid",
            grid: { cols: 4, gutter: 10 },
            items: [
                {
                    field: "scheme",
                    editor: "DropDownList",
                    label: "Select Yojna",
                    colSpan: 4,
                    editorOptions: {
                        select: function (e) {
                            if (e.dataItem) {
                                let postArr = { 'id': e.dataItem.Id }
                                setDropdownList('sub_scheme_id', 'get-sub-scheme-name', postArr);
                            }
                        },
                        optionLabel: "Select...",
                        dataSource: getDropdownDataSource('get-scheme-name', {}),
                        dataValueField: "Id",
                        dataTextField: "Name",
                        validation: { required: { message: "Select Scheme" } }
                    },
                },
                {
                    field: "sub_scheme_id",
                    editor: "DropDownList",
                    label: "Select sub yojna",
                    colSpan: 3,
                    editorOptions: {
                        optionLabel: "Select..."
                    },
                    validation: { required: { message: "Select subyojna" } }
                },
                {
                    field: "total_acc",
                    label: "Total Account",
                    colSpan: 1,
                    editor: function (container, options) {
                        $('<input type="text" id="'+ options.field +'" name="' + options.field + '"  disabled />')
                            .appendTo(container)
                            .kendoTextBox();
                    }
                },
                {
                    field: "counting_from",
                    editor: "DropDownList",
                    label: "Counting From",
                    colSpan: 4,
                    editorOptions: {
                        optionLabel: "Select...",
                        dataTextField: "text",
                        dataValueField: "value",
                        dataSource:[
                                {text:"Jan",value:"1"},
                                {text:"Feb",value:"2"},
                                {text:"Mar",value:"3"},
                                {text:"Apr",value:"4"},
                                {text:"May",value:"5"},
                                {text:"Jun",value:"6"},
                                {text:"Jul",value:"7"},
                                {text:"Aug",value:"8"},
                                {text:"Sep",value:"9"},
                                {text:"Oct",value:"10"},
                                {text:"Nov",value:"11"},
                                {text:"Dec",value:"12"},
                        ],
                        change: onChangeCountingtDate,
                    },
                },
                {
                    field: "start_date",
                    editor: "DatePicker",
                    label: "Start Date",
                    colSpan: 2,
                },
                {
                    field: "end_date",
                    editor: "DatePicker",
                    label: "End Date",
                    colSpan: 2,
                },
            ],
            },
        ],
        buttonsTemplate: '<div class="w-full inline-flex space-x-4 items-center justify-end py-2">\n' +
                            '<div class="float-right flex space-x-4 items-center justify-end">\n' +
                                '<button class="btn btn-primary font-weight-bold btn-sm" type="submit">Start Calculation</button>\n' +
                                '<button type="button" class="btn btn-primary font-weight-bold btn-sm">Start-Re-Calculation</button>\n' +
                            '</div>\n' +
                        '</div>',
        submit: function (ev) {
                saveModalData('vyajGanatriForm', 'total_vyaj_calculation', 'vyajGanatriModal');
                ev.preventDefault();
                return false;
        }
    });

    function saveModalData(formId = '', type = '', modalId = '') {
        let serializeArr = $(document).find("#" + modalId).find('input[name], select[name], textarea[name]').serializeArray();
        let dataArr = {}
        $(serializeArr).each(function (i, field) {
            dataArr[field.name] = field.value;
        });
        $.ajax({
            type: "POST",
            url: site_url + "api/customer/ajaxAction",
            dataType: "json",
            data: { 'action': type , 'data': dataArr },
            success: function (response) {
            }
        });
    }

    function onChangeSubYojna(e) {
        $.ajax({
            type: "POST",
            url: site_url + "api/get-total-customer-account",
            dataType: "json",
            data: { 'sub_scheme_id': e.sender.value() },
            success: function (response) {
                let vyajGanatriForm = $(document).find('#vyajGanatriForm');
                vyajGanatriForm.find('#total_acc').val(response.data);
            }
        });
    }

    function onChangeCountingtDate(e){

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), e.sender.value() -1);
        var lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0);
        var startDate = (firstDay.getMonth()+1)+'/'+firstDay.getDate()+'/'+firstDay.getFullYear();
        var endDate = (lastDay.getMonth()+1)+'/'+lastDay.getDate()+'/'+lastDay.getFullYear();
        $(document).find('#vyajGanatriModal').find('#start_date').val(startDate);
        $("#start_date").data("kendoDatePicker").enable(false);
        $(document).find('#vyajGanatriModal').find('#end_date').val(endDate);
        $("#end_date").data("kendoDatePicker").enable(false);;
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
            dataTextField: "Name",
            dataValueField: "Id",
            dataSource: getDropdownDataSource(api_url, postArr),
            change: onChangeSubYojna,

        });
    }
});



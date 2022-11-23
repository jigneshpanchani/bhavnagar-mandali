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
        items: [
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
                editorOptions: { optionLabel: "Select..." },
                validation: { required: { message: "Select subyojna" } }
            },
            {
                field: "total_acc",
                label: "Total Account",
                colSpan: 1
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
                            {text:"Jan",value:"Jan"},
                            {text:"Feb",value:"Feb"},
                            {text:"Mar",value:"Mar"},
                            {text:"Apr",value:"Apr"},
                            {text:"May",value:"May"},
                            {text:"Jun",value:"Jun"},
                            {text:"Jul",value:"Jul"},
                            {text:"Aug",value:"Aug"},
                            {text:"Sep",value:"Sep"},
                            {text:"Oct",value:"Oct"},
                            {text:"Nov",value:"Nov"},
                            {text:"Dec",value:"Dec"},
                    ],
                },
            },
            {
                field: "start_date",
                editor: "DatePicker",
                label: "Start Date",
                colSpan: 2,
                validation: {required: true}
            },
            {
                field: "end_date",
                editor: "DatePicker",
                label: "End Date",
                colSpan: 2,
                validation: {required: true}
            },
            {
                field: "details",
                label: "Details",
                colSpan: 4,
                validation: {required: true}
            },
            {
                field: "CheckBoxGroup",
                editor: "CheckBoxGroup",
                label: "",
                colSpan: 4,
                validation: { required: false },
                editorOptions: {
                    items: [
                            "Calculation of every account",
                            "interest calculation summary of all accounts",
                            "Show the interest and product of an account"
                           ],
                    layout: "vertical",
                    labelPosition: "after"
                }
            }
        ],
    },
        ],
        buttonsTemplate: '<div class="w-full inline-flex space-x-4 items-center justify-end py-2">\n' +
                            '<div class="float-right flex space-x-4 items-center justify-end">\n' +
                                '<button type="submit" class="btn btn-primary font-weight-bold btn-sm" type="submit">Start Calculation</button>\n' +
                                '<button type="submit" class="btn btn-primary font-weight-bold btn-sm" type="submit">Start-Re-Calculation</button>\n' +
                            '</div>\n' +
                        '</div>',
    });
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

function setDropdownList(fieldID, api_url, postArr = {}) {
    $("#" + fieldID).kendoDropDownList({
        autoWidth: true,
        dataTextField: "Name",
        dataValueField: "Id",
        dataSource: getDropdownDataSource(api_url, postArr),

    });
}

$(document).ready(function(){

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $("#reportsList").kendoGrid({
        dataSource: customDataSource(
            "api/reports-data", {
            },

        ),
        pageable: customPageableArr(),
        dataBound: function(e) {
            setTimeout(function() {
                setFilterIcon("#reportsList");
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
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: branch_name #</div>",
                field: "branch_name",
                title: "BRANCH"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: sub_scheme_name #</div>",
                field: "sub_scheme_name",
                title: "TYPE OF TRANSACTION"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: current_balance #</div>",
                field: "current_balance",
                title: "CURRENT BALANCE"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: loan_fd_amount #</div>",
                field: "loan_fd_amount",
                title: "LOAN AMOUNT"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: current_pending_due #</div>",
                field: "current_pending_due",
                title: "CURRENT PENDING DUE"
            },

        ],
        noRecords: noRecordTemplate()
    });
    customGridHtml("#reportsList");

    $("#reportsFilterForm").kendoForm({
        orientation: "vertical",
        layout: "grid",
        grid: {
            cols: 8,
            gutter: 20
        },
        items: [
            {
                field: "branch_name",
                editor: "DropDownList",
                label: "Select Branch Name:",
                editorOptions: {
                    optionLabel: "Select...",
                    dataSource: getDropdownDataSource('get-division-name', []),
                    dataValueField: "Id", //Id
                    dataTextField: "Name"
                },
                colSpan: 2,
            },
            {
                field: "scheme",
                editor: "DropDownList",
                label: "Select Yojna",
                editorOptions: {
                    select: function (e) {
                        if (e.dataItem) {
                            let postArr = { 'id': e.dataItem.Id }
                            setDropdownList('sub_scheme_id', 'get-sub-scheme-name', postArr);
                        }
                    },
                    optionLabel: "Select...",
                    dataSource: getDropdownDataSource('get-scheme-name', {}),
                    dataValueField: "Id", //Id
                    dataTextField: "Name",
                },
                colSpan: 2,
            },
            {
                field: "sub_scheme_id",
                editor: "DropDownList",
                label: "Select sub yojna",
                editorOptions: { optionLabel: "Select..." },
                colSpan: 2,
            },

        ],
        buttonsTemplate:    '<div class="float-right flex space-x-4 items-center justify-end pb-6">\n' +
                                '<button type="button" class="btn btn-outline-secondary font-weight-bold btn-sm cancel-btn" id="clearFilter">Cancel</button>\n' +
                                '<button type="button" class="applyReportFilter btn btn-primary font-weight-bold btn-sm">Apply Filter</button>\n' +
                            '</div>',
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


    $('body').on('click', '.applyReportFilter', function() {
        let serializeArr = $(document).find("#reportsFilterForm").find('input[name], select[name], textarea[name]').serializeArray();
        let dataArr = {}
        $(serializeArr).each(function (i, field) {
            dataArr[field.name] = field.value;
        });
        console.log(dataArr);
        manageFilterOnGrid("#reportsList", 'extra', dataArr);
    });

    $('body').on('click', '#clearFilter', function(e) {
        e.preventDefault();
        $("#reportsList").data("kendoGrid").dataSource.filter([]);
    });
});




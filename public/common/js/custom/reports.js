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
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: sub_sceme_name #</div>",
                field: "sub_sceme_name",
                title: "TYPE OF LOAN"
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
});
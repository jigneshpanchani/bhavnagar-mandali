$(document).ready(function(){

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $("#loader").kendoLoader();
    kendo.ui.progress.messages = {
        loading: '<div class="vue-simple-spinner animate-spin" style="position:absolute;top:50%;left:50%;transfrom:translate(-50%,-50%); margin: 0px auto; border-radius: 100%; border-color: rgb(50, 157, 243) rgb(238, 238, 238) rgb(238, 238, 238); border-style: solid; border-width: 3px; border-image: none 100% / 1 / 0 stretch; width: 90px; height: 90px;"></div>'
    };
   
    // //Transaction Detail  

    $(document).on("click", ".transactiondetail", function(){
        let id = $(this).attr('data-id');
        let vyavahar = $(document).find('#transactiondetailList');
        vyavahar.find("#transaction_id").val(id);
        // alert(id);
        $(document).find('#transactiondetailList').find("#transaction_id").val(id);
        
    });

    $(document).find("#transactiondetailList").kendoGrid({
        dataSource: customDataSource(
            "api/vyavahar-data", {}, 
            {id: transaction_id}
        ),
        pageable: customPageableArr(),
        dataBound: function(e) {
            setTimeout(function() {
                setFilterIcon("#transactiondetailList");
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
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: transaction_id #</div>",
                field: "transaction_id",
                title: "TRANSACTION ID"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: date #</div>",
                field: "date",
                title: "DATE"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: pay_through #</div>",
                field: "pay_through",
                title: "PAY THROUGH"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: amount #</div>",
                field: "amount",
                title: "AMOUNT"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: pay_receive #</div>",
                field: "pay_receive",
                title: "PAY-RECEIVE"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: check_no #</div>",
                field: "check_no",
                title: "CHECK NO"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: interest_paid #</div>",
                field: "interest_paid",
                title: "INTEREST PAID"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: principal_paid #</div>",
                field: "principal_paid",
                title: "PRINCIPAL PAID"
            }, 
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: remaining_amount #</div>",
                field: "remaining_amount",
                title: "REMAINING AMOUNT"
            },
        ],
    });
    customGridHtml("#transactiondetailList");
});
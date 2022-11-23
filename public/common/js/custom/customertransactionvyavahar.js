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

        $("#vyavaharList").kendoGrid({
            dataSource: customDataSource(

                "api/yojana-data", {

                    id: {type:"integer"},
                    subscheme_id:{type:"integer"} ,
                    account_no:{type:"integer"},
                    a_number: {type:"integer"},
                    start_date:{type:"date"},
                    loan_fd_amount:{type:"integer"},
                    cu_balance:{type:"integer"},
                    inst_amount:{type:"integer"},
                    maturity_date:{type:"date"},

                    // cu_due:{type:"integer"},
                    // cu_int_due:{type:"integer"},
                    // cu_pen_due:{type:"integer"},
                    // op_balance:{type:"integer"},
                    // close:{type:"integer"},
                    // created_by:{type:"integer"},
                    // updated_by: {type:"integer"}
                },
            ),
            pageable: customPageableArr(),
            dataBound: function(e) {
                setTimeout(function() {
                    setFilterIcon("#vyavaharList");
                }, 100);
            },
            filterable: true,
            sortable: true,
            resizable: true,
            
            columns: [
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: id #</div>",
                    field: "id ",
                    title: "ID"
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#:subscheme_id #</div>",
                    field: "subscheme_id",
                    title: "Scheme Name"
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: l #</div>",
                    field: "l",
                    title: "L"
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: sp  #</div>",
                    field: "sp",
                    title: "SP"
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: o #</div>",
                    field: "o",
                    title: "O"
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: account_no #</div>",
                    field: "account_no",
                    title: "Account No"
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: a_number #</div>",
                    field: "a_number",
                    title: "Uniq No"
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: start_date #</div>",
                    field: "start_date",
                    title: "Op.Date"
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: loan_fd_amount #</div>",
                    field: "loan_fd_amount",
                    title: "Loan/FD Amt"
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: cu_balance #</div>",
                    field: "cu_balance",
                    title: "Cu.Balance"
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: due_amt #</div>",
                    field: "due_amt",
                    title: "Due Amt"
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: inst_amount  #</div>",
                    field: "inst_amount",
                    title: "Inst. Amt"
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: iipo #</div>",
                    field: "iipo",
                    title: "IIPO"
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: rp #</div>",
                    field: "net",
                    title: "R/P"
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: tt #</div>",
                    field: "tt",
                    title: "TT"
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: tran_amt #</div>",
                    field: "tran_amt",
                    title: "Tran. Amt."
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: tran_detail #</div>",
                    field: "tran_detail",
                    title: "Tran.Detail"
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: dr_cr #</div>",
                    field: "dr_cr",
                    title: "Dr_Cr"
                },
                {
                    template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: maturity_date #</div>",
                    field: "maturity_date",
                    title: "Matunity_Data"
                },
            
            ],
            noRecords: noRecordTemplate()
        });
        customGridHtml("#vyavaharList");
 });







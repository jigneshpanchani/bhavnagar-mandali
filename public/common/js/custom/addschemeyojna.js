$(document).ready(function () {

    $("body").on("click", ".addyojna", function (){
        kendowindowOpen("#addYojnaModal");
    });

    $("#addYojnaModal").kendoWindow(modalopen('Add New'));

    $("#addYojnaForm").kendoForm({
        orientation: "vertical",
        items: [
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

                    validation: { required: { message: "Select Scheme" } }
                },
            },
            {
                field: "sub_scheme_id",
                editor: "DropDownList",
                label: "Select sub yojna",
                editorOptions: { optionLabel: "Select..." },
                validation: { required: { message: "Select subyojna" } }
            },

        ],
        buttonsTemplate: '<div class="w-full inline-flex space-x-4 items-center justify-end py-2">\n' +
            '<div class="float-right flex space-x-4 items-center justify-end">\n' +
            '<button type="button" class="btn btn-outline-secondary font-weight-bold btn-sm cancel-btn" data-type-id="addYojnaModal" type="button">Cancel</button>\n' +
            '<button type="submit" class="btn btn-primary font-weight-bold btn-sm"  type="submit">Add yojna</button>\n' +
            '</div>\n' +
            '</div>',
        submit: function (ev) {
            saveSchemeData('addYojnaForm', 'save_sub_scheme', 'addYojnaModal');
            ev.preventDefault();
        }
    });

    function saveSchemeData(formId = '', type = '', modalId = '') {
        let serializeArr = $(document).find("#" + modalId).find('input[name], select[name], textarea[name]').serializeArray();
        let dataArr = {}
        $(serializeArr).each(function (i, field) {
            dataArr[field.name] = field.value;
        });
        console.log(dataArr);

        var rateofInt = $("#rateogInt").val();
        var accountNo = $("#accountNo").val();

        if (dataArr.sub_scheme_id == 1 || dataArr.sub_scheme_id == 7) {
            $(document).find('#customerTransactionBachatModal').find("#account_no").val(accountNo);
            $(document).find('#customerTransactionBachatModal').find("#intrest_rate").val(rateofInt);
            $(document).find('#customerTransactionBachatModal').find("#member_id").val(member_id);
            $(document).find('#customerTransactionBachatModal').find("#sub_scheme_id").val(dataArr.sub_scheme_id);
            kendowindowOpen("#customerTransactionBachatModal");
            setTimeout(function(){
                $("#customerTransactionBachatModal_wnd_title").text($("#sub_scheme_id").data("kendoDropDownList").text());
            },100);

        }
        if(dataArr.sub_scheme_id == 11 || dataArr.sub_scheme_id == 12) {

            $(document).find('#customerFdModal').find("#account_no").val(accountNo);
            $(document).find('#customerFdModal').find("#intrest_rate").val(rateofInt);
            $(document).find('#customerFdModal').find("#member_id").val(member_id);
            $(document).find('#customerFdModal').find("#sub_scheme_id").val(dataArr.sub_scheme_id);
            $(document).find('#customerFdModal').find("#loanName").val($("#sub_scheme_id").data("kendoDropDownList").text());
            kendowindowOpen("#customerFdModal");
            setTimeout(function(){
                $("#customerFdModal_wnd_title").text($("#sub_scheme_id").data("kendoDropDownList").text());
            },100);
        }

        if (dataArr.sub_scheme_id == 2 || dataArr.sub_scheme_id == 3 || dataArr.sub_scheme_id == 4 || dataArr.sub_scheme_id == 5) {
            $(document).find('#customerTransactionLoanModal').find("#account_no").val(accountNo);
            $(document).find('#customerTransactionLoanModal').find("#intrest_rate").val(rateofInt);
            $(document).find('#customerTransactionLoanModal').find("#member_id").val(member_id);
            $(document).find('#customerTransactionLoanModal').find("#sub_scheme_id").val(dataArr.sub_scheme_id);
            $(document).find('#customerTransactionLoanModal').find("#loanName").val($("#sub_scheme_id").data("kendoDropDownList").text());
            kendowindowOpen("#customerTransactionLoanModal");
            setTimeout(function(){
                $("#customerTransactionLoanModal_wnd_title").text($("#sub_scheme_id").data("kendoDropDownList").text());
            },100);
        }
        $(document).find('#addYojnaModal').getKendoWindow().close();
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
            // valueTemplate: '<span class="selected-value" data-selected="#:data.rate_of_int#">',
            // template: '<span class="k-state-default" data-selected="#:data.rate_of_int#"></span>',
            dataSource: getDropdownDataSource(api_url, postArr),
            select: fnItemSelected
        });
    }

    function fnItemSelected(e){
        console.log(e.dataItem.rate_of_int);
        $('#rateogInt').val(e.dataItem.rate_of_int)
    }
    //yojna list

    $("#yojnaList").kendoGrid({
        dataSource: customDataSource(
            "api/transaction-data", {},
            {id: member_id}
        ),
        pageable: customPageableArr(),
        dataBound: function(e) {
            setTimeout(function() {
                setFilterIcon("#yojnaList");
            }, 100);
        },
        filterable: true,
        sortable: true,
        resizable: true,
        scrollable: true,

        columns: [
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: id #</div>",
                field: "id ",
                width: 80,
                title: "ID"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#:ananya_no #</div>",
                field: "ananya_no",
                width: 140,
                title: "ANANYA NO"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: account_no #</div>",
                field: "account_no",
                width: 140,
                title: "ACCOUNT NO"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: sub_scheme_name #</div>",
                field: "sub_scheme_name",
                width: 140,
                title: "SUB SCHEME NAME"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: start_date #</div>",
                field: "start_date",
                width: 140,
                title: "START DATE"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: maturity_date #</div>",
                field: "maturity_date",
                width: 140,
                title: "MATURITY DATE"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: intrest_rate #</div>",
                field: "intrest_rate",
                width: 140,
                title: "INTREST RATE"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: loan_fd_amount #</div>",
                field: "loan_fd_amount",
                width: 140,
                title: "LOAN FD AMOUNT"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: installment_amount #</div>",
                field: "installment_amount",
                width: 140,
                title: "INSTALLMENT AMOUNT"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: current_due #</div>",
                field: "current_due",
                width: 140,
                title: "CURRENT DUE"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: current_balance  #</div>",
                field: "current_balance",
                width: 140,
                title: "CURRENT BALANCE"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: current_intrest_due  #</div>",
                field: "current_intrest_due",
                width: 140,
                title: "CURRENT INTREST DUE"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: current_pending_due  #</div>",
                field: "current_pending_due",
                width: 140,
                title: "CURRENT PENDING DUE"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: current_oc_due  #</div>",
                field: "current_oc_due",
                width: 140,
                title: "CURRENT OC DUE"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: opening_balance  #</div>",
                field: "opening_balance",
                width: 140,
                title: "OPENING BALANCE"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: closed  #</div>",
                field: "closed",
                width: 140,
                title: "CLOSED"
            },
            {
                template: function(dataItem) {
                    return manageAction(dataItem.id);
                },
                field: "action",
                width: 100,
                title: "ACTIONS",
                filterable: false,
            },
        ],
        noRecords: noRecordTemplate()
    });
    customGridHtml("#yojnaList");

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
                                '<a href="#" class="vyavahar navi-link flex space-x-3 py-2 w-full" data-id = "' + id + '"><span class="k-icon k-i-edit k-icon-edit"></span><span class="text-sm leading-5 navi-text text-gray-700">Vyavahar</span></a>\n' +
                            '</li>\n' +
                            // '<input type="hidden" id="transaction_id" name="id">\n' +
                            '<li class="navi-item">\n' +
                                '<a href="/customertransaction/' + id + '" class="transactiondetail navi-link flex space-x-3 py-2 w-full" data-id = "' + id + '"><span class="k-icon k-i-edit k-icon-edit"></span><span class="text-sm leading-5 navi-text text-gray-700">Transaction Detail</span></a>\n' +
                            '</li>\n' +
                        '</ul>\n' +
                    '</div>\n' +
                '</div>\n';
    }

    // Vyavahar

    $("#vyavaharModal").kendoWindow(modalopen('Vyavahar'));

    var accountNo = $("#accountNo").val();
    var todayDate = kendo.toString(kendo.parseDate(new Date()), 'MM/dd/yyyy');

    $(document).on("click", ".vyavahar", function(){
        let id = $(this).attr('data-id');
        let vyavahar = $(document).find('#vyavaharForm');
        vyavahar.find("#transaction_id").val(id);
        $(document).find('#vyavaharModal').find("#account_no").val(accountNo);
        $(document).find('#vyavaharModal').find("#date").val(todayDate);
        kendowindowOpen("#vyavaharModal");
    });

    $("#vyavaharForm").kendoForm({
        orientation: "vertical",
        items: [
            {
                field: "account_no",
                label: "Account No:",
                validation: { required: true }
            },
            {
                field: "date",
                editor: "DatePicker",
                label: "Date:",
                validation: { required: true }
            },
            {
                field: "pay_through",
                editor: "DropDownList",
                label: "Pay Through:",
                editorOptions: {
                    optionLabel: "Select...",
                    dataTextField: "text",
                    dataValueField: "value", //Id
                    dataSource: [
                        { text: "IDBI", value: "IDBI" },
                        { text: "Cash", value: "Cash" },
                        { text: "Check", value: "Check"},
                        { text: "Bhavnagar District Bank Saving Account", value: "Bhavnagar District Bank Saving Account" },
                        { text: "Bhavnagar District Bank Current Account", value: "Bhavnagar District Bank Current Account" },
                        { text: "Bhavnagar District Bank Rowsakh", value: "Bhavnagar District Bank Rowsakh" },
                        { text: "Saurashtra Gramin Bank Saving", value: "Saurashtra Gramin Bank Saving" },
                        { text: "Saurashtra Gramin Bank Over-Draft account", value: "Saurashtra Gramin Bank Over-Draft account" },
                    ]
                },
                validation: { required: true}
            },
            {
                field: "pay_receive",
                editor: "RadioGroup",
                label: "Pay Receive:",
                editorOptions: {
                    items: ["Pay", "Receive"],
                    layout: "horizontal",
                    labelPosition: "before"
                },
                validation: { required: true}
            },
            {
                field: "amount",
                label: "Amount:",
                validation: { required: true }
            },
            {
                field: "check_no",
                label: "Check No:",
            },

        ],
        buttonsTemplate: '<div class="w-full inline-flex space-x-4 items-center justify-end py-2">\n' +
            '<div class="float-right flex space-x-4 items-center justify-end">\n' +
            '<input type="hidden" id="transaction_id" name="transaction_id">\n' +
            '<button type="button" class="btn btn-outline-secondary font-weight-bold btn-sm cancel-btn" data-type-id="vyavaharModal" type="button">Cancel</button>\n' +
            '<button type="submit" class="btn btn-primary font-weight-bold btn-sm" type="submit">Submit</button>\n' +
            '</div>\n' +
            '</div>',

        submit: function (ev) {
            saveModalData('vyavaharForm', 'Save_vyavahar', 'vyavaharModal');
            ev.preventDefault();
        },

    });

    function saveModalData(formId='', type='' ,modalId=''){
        // kendo.ui.progress($(document.body), true);
        let serializeArr = $(document).find("#"+modalId).find('input[name], select[name], textarea[name]').serializeArray();
        let dataArr = {}
        $(serializeArr).each(function (i, field) {
            dataArr[field.name] = field.value;
        });
        $.ajax({
            type: "POST",
            url: site_url + "api/vyavahar/ajaxAction",
            dataType: "json",
            data: {'action': type, 'data': dataArr },
            success: function (response) {
                // kendo.ui.progress($(document.body), false);
                $(document).find('#'+modalId).getKendoWindow().close();
                notificationDisplay(response.message, '', response.status);
            }
        });
    }


});

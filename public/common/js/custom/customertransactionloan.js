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

    function customModal2(title){
        return {
            title: title,
            width: "50%",
            actions: ["close"],
            draggable: false,
            resizable: false,
            modal: true,
            position: {
                top: "8%",
                left: "25%"
            },
            animation: {
                close: {
                    effects: "fade:out"
                }
            }

        };
    }

    $("#customerTransactionLoanModal").kendoWindow(customModal2('Loan'));

    $("#customertransactionloanform").kendoForm({
        orientation: "vertical",
        items:
        [
            {
            type: "group",
            layout: "grid",
            grid: { cols: 6, gutter: 10 },
            items: [
                {
                    field: "account_no",
                    label: "Account No:",
                    colSpan: 3,
                    validation: { required: true }
                },
                {
                    field: "loan_fd_amount",
                    label: "Loan amount:",
                    colSpan: 3,
                    validation: { required: true }
                },
                {
                    field: "loan_duration",
                    label: "Duration In Years:",
                    colSpan: 2,
                    validation: { required: true }
                },
                {
                    field: "intrest_rate",
                    label: "Rate Of Int:",
                    colSpan: 2,
                    validation: { required: true }
                },
                {
                    field: "installment_amount",
                    label: "Installment Amount:",
                    colSpan: 2,
                    validation: { required: true }
                },
                {
                    field: "start_date",
                    editor: "DatePicker",
                    label: "Start Date:",
                    colSpan: 3,
                    validation: { required: true },
                    editorOptions: {
                        change: onChangeStartDate,
                    }
                },
                {
                    field: "maturity_date",
                    editor: "DatePicker",
                    label: "Maturity Date:",
                    colSpan: 3,
                    validation: { required: true }
                },
                {
                    field: "loan_purpose",
                    label: "Loan Purpose:",
                    colSpan: 3,
                    validation: { required: true }
                },
                {
                    field: "oprated_by",
                    label: "Oprated By:",
                    colSpan: 3,
                    validation: { required: true }
                },
                {
                    field: "surity1_name",
                    editor: "DropDownList",
                    label: "Surity1",
                    colSpan: 3,
                    editorOptions: {
                        optionLabel: "Select...",
                        dataSource: getDropdownDataSource('get-customer-name', []),
                        dataValueField: "Id", //Id
                        dataTextField: "Name"
                    },
                    validation: { required: { message: "Select Name" } }
                },
                {
                    field: "surity2_name",
                    editor: "DropDownList",
                    label: "Surity2",
                    colSpan: 3,
                    editorOptions: {
                        optionLabel: "Select...",
                        dataSource: getDropdownDataSource('get-customer-name', []),
                        dataValueField: "Id", //Id
                        dataTextField: "Name"
                    },
                    validation: { required: { message: "Select Name" } }
                },
            ],
            },
        ],
        buttonsTemplate: '<div class="w-full inline-flex space-x-4 items-center justify-end py-2">\n' +
        '<div class="float-right flex space-x-4 items-center justify-end">\n' +
        '<input type="hidden" id="member_id" name="member_id">\n' +
        '<input type="hidden" id="sub_scheme_id" name="sub_scheme_id">\n' +
        '<button type="button" class="btn btn-outline-secondary font-weight-bold btn-sm cancel-btn" data-type-id="customerTransactionLoanModal" type="button">Cancel</button>\n' +
        '<button type="submit" class="customertransactionloan btn btn-primary font-weight-bold btn-sm" type="submit">Save</button>\n' +
        '</div>\n' +
        '</div>',
        submit: function (ev) {
            saveModalData('customertransactionloanform', 'Save_customertransactionloan', 'customerTransactionLoanModal');
            ev.preventDefault();
        },
    });

    function onChangeStartDate(){
       var start_date = $(document).find('#customerTransactionLoanModal').find("#start_date").val();
       var loan_duration = $(document).find('#customerTransactionLoanModal').find("#loan_duration").val();
       var dt = new Date(start_date);
       var date = dt.getDate();
       var month = dt.getMonth() + 1;
       var year = dt.getFullYear()+ parseInt(loan_duration);
       var finishDate = month +'/'+date+'/'+year;
       $(document).find('#customerTransactionLoanModal').find('#maturity_date').val(finishDate);
    }

    function saveModalData(formId = '', type = '', modalId = '') {
        let serializeArr = $(document).find("#" + modalId).find('input[name], select[name], textarea[name]').serializeArray();
        let dataArr = {}
        $(serializeArr).each(function (i, field) {
            dataArr[field.name] = field.value;
        });
        $.ajax({
            type: "POST",
            url: site_url + "api/customertransactionloan/ajaxAction",
            dataType: "json",
            data: { 'action': 'Save_customertransactionloan', 'data': dataArr },
            success: function (response) {
                $(document).find('#' + modalId).getKendoWindow().close();
                $('#yojnaList').data('kendoGrid').refresh();
                $('#yojnaList').data('kendoGrid').dataSource.read();
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


    var installment = 0;
    $(document).find('#customerTransactionLoanModal').find("#intrest_rate").on('change',function(){
        var ratOfint = $(this).val();
        var loanAmount = $('#loan_fd_amount').val();
        var duration = $('#loan_duration').val();
        emiCalculator(ratOfint,loanAmount,duration);
    });

    $('#loan_duration').on('change',function(){
        var ratOfint =  $(document).find('#customerTransactionLoanModal').find("#intrest_rate").val();
        var loanAmount = $('#loan_fd_amount').val();
        var duration = $(this).val();
        emiCalculator(ratOfint,loanAmount,duration);
    });

    $('#loan_fd_amount').on('change',function(){
        var ratOfint = $(document).find('#customerTransactionLoanModal').find("#intrest_rate").val();
        var loanAmount = $(this).val();
        var duration = $('#loan_duration').val();
        emiCalculator(ratOfint,loanAmount,duration);
    });

    function emiCalculator(ratOfint,loanAmount,duration){
        if(ratOfint != '' && loanAmount != '' && duration !=''){
            var N = duration * 12;
			var I = (ratOfint / 100) / 12;
			var v = Math.pow((1 + I), N);
			var t = (I * v) / (v - 1);
			var result = Math.ceil(loanAmount * t);
            $('#installment_amount').val(result)
        }
    }
});


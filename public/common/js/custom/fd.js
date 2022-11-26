$(document).ready(function () {

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $("body").on("click", ".customerfd", function () {
        kendowindowOpen("#customerFdModal");
    });

    $("#customerFdModal").kendoWindow(modalopen('FD'));

    $("#customerFdform").kendoForm({

        orientation: "vertical",
        items: [
            {
                field: "account_no",
                label: "Account No",
                validation: { required: true }
            },
            {
                field: "start_date",
                editor: "DatePicker",
                label: "Start Date",
                validation: { required: true}
            },
            {
                field: "maturity_date",
                editor: "DatePicker",
                label: "Maturity Date",
                validation: { required: true}
            },
            {
                field: "intrest_rate",
                label: "Intrest Rate",
                validation: { required: true}
            },
            {
                field: "loan_fd_amount",
                label: "FD Amount",
                validation: { required: true}
            },

        ],
        buttonsTemplate: '<div class="w-full inline-flex space-x-4 items-center justify-end py-2">\n' +
                        '<div class="float-right flex space-x-4 items-center justify-end">\n' +
                        '<input type="hidden" id="member_id" name="member_id">\n' +
                        '<input type="hidden" id="sub_scheme_id" name="sub_scheme_id">\n' +
                        '<button type="button" class="btn btn-outline-secondary font-weight-bold btn-sm cancel-btn" data-type-id="customerFdModal" type="button">Cancel</button>\n' +
                        '<button type="submit" class="customertransactionloan btn btn-primary font-weight-bold btn-sm"  type="submit">Save</button>\n' +
                        '</div>\n' +
                        '</div>',

        submit: function (ev) {
            saveModalData('customerFdform', 'save_fd', 'customerFdModal');
            ev.preventDefault();

        },
    });

    function saveModalData(formId = '', type = '', modalId = '') {
        let serializeArr = $(document).find("#" + modalId).find('input[name], select[name], textarea[name]').serializeArray();
        let dataArr = {}
        $(serializeArr).each(function (i, field) {
            dataArr[field.name] = field.value;
        });
        // alert();
        $.ajax({
            type: "POST",
            url: site_url + "api/fd/ajaxAction",
            dataType: "json",
            data: { 'action': type, 'data': dataArr },
            success: function (response) {
                $(document).find('#' + modalId).getKendoWindow().close();
                $('#yojnaList').data('kendoGrid').refresh();
                $('#yojnaList').data('kendoGrid').dataSource.read();
                notificationDisplay(response.message, '', response.status);
            }
        });
    }
});

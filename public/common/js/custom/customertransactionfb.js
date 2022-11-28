
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

    function customModal(title){
        return {
            title: title,
            width: "40%",
            actions: ["close"],
            draggable: false,
            resizable: false,
            modal: true,
            position: {
                top: "10%",
                left: "30%"
            },
            animation: {
                close: {
                    effects: "fade:out"
                }
            }

        };
    }

    $("body").on("click", ".customertransaction", function () {
        kendowindowOpen("#customerTransactionBachatModal");
    });

    $("#customerTransactionBachatModal").kendoWindow(customModal('Farjiyat Bachat'));

    $("#customertransactionform").kendoForm({
        orientation: "vertical",
        items:
        [
            {
            type: "group",
            layout: "grid",
            grid: { cols: 4, gutter: 10 },
            items: [
                {
                    field: "account_no",
                    label: "Account No:",
                    colSpan: 4,
                    validation: { required: true }
                },
                {
                    field: "start_date",
                    editor: "DatePicker",
                    label: "Start Date:",
                    colSpan: 2,
                    validation: { required: true }
                },
                {
                    field: "maturity_date",
                    editor: "DatePicker",
                    label: "End Date:",
                    colSpan: 2,
                    validation: { required: true }
                },
                {
                    field: "current_balance",
                    label: "Amount:",
                    colSpan: 4,
                    validation: { required: true }
                },
                {
                    field: "intrest_rate",
                    label: "Rate Of Int:",
                    colSpan: 4,
                    validation: { required: true }
                },

            ],
            },
        ],
        buttonsTemplate: '<div class="w-full inline-flex space-x-4 items-center justify-end py-2">\n' +
            '<div class="float-right flex space-x-4 items-center justify-end">\n' +
            '<input type="hidden" id="member_id" name="member_id">\n' +
            '<input type="hidden" id="sub_scheme_id" name="sub_scheme_id">\n' +
            // '<button type="button" class="btn btn-outline-secondary font-weight-bold btn-sm cancel-btn" data-type-id="customerTransactionLoanModal" type="button">Cancel</button>\n' +
            '<button type="button" class="btn btn-outline-secondary font-weight-bold btn-sm cancel-btn" data-type-id="customerTransactionLoanModal" type="button">Cancel</button>\n' +
            '<button type="submit" class="customertransactionloan btn btn-primary font-weight-bold btn-sm"  type="submit">Save</button>\n' +
            '</div>\n' +
            '</div>',
        submit: function (ev) {
            saveModalData('customertransactionform', 'save_customertransaction', 'customerTransactionBachatModal');
            ev.preventDefault();
        },

    });

    function saveModalData(formId = '', type = '', modalId = '') {
        // kendo.ui.progress($(document.body), true);
        let serializeArr = $(document).find("#" + modalId).find('input[name], select[name], textarea[name]').serializeArray();
        let dataArr = {}
        $(serializeArr).each(function (i, field) {
            dataArr[field.name] = field.value;
        });
        $.ajax({
            type: "POST",
            url: site_url + "api/customertransaction/ajaxAction",
            dataType: "json",
            data: { 'action': 'save_customertransaction', 'data': dataArr },
            success: function (response) {
                // kendo.ui.progress($(document.body), false);
                $(document).find('#' + modalId).getKendoWindow().close();
                $('#yojnaList').data('kendoGrid').refresh();
                $('#yojnaList').data('kendoGrid').dataSource.read();
                notificationDisplay(response.message, '', response.status);
            }
        });
    }
});

$(document).ready(function () {

    $("#loader").kendoLoader();
    kendo.ui.progress.messages = {
        loading: '<div class="vue-simple-spinner animate-spin" style="position:absolute;top:50%;left:50%;transfrom:translate(-50%,-50%); margin: 0px auto; border-radius: 100%; border-color: rgb(50, 157, 243) rgb(238, 238, 238) rgb(238, 238, 238); border-style: solid; border-width: 3px; border-image: none 100% / 1 / 0 stretch; width: 90px; height: 90px;"></div>'
    };

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $("#customerForm").kendoForm({
        layout: "grid",
        grid: {
            cols: 1,
            gutter: 20
        },
        items: [
            {
                type: "group",
                layout: "grid",
                grid: { cols: 6, gutter: 10 },
                items: [
                    {
                        field: "first_name",
                        label: "First Name:",
                        colSpan: 3,
                        validation: { required: true }
                    },
                    {
                        field: "middle_name",
                        label: "Middle Name:",
                        colSpan: 3,
                        validation: { required: true }
                    },
                    {
                        field: "last_name",
                        label: "Last Name:",
                        colSpan: 3,
                        validation: { required: true }
                    },
                    {
                        field: "DOB",
                        editor: "DatePicker",
                        label: "DOB",
                        colSpan: 3,
                        validation: { required: true }
                    },

                    {
                        field: "blood_group",
                        editor: "DropDownList",
                        label: "Blood Group:",
                        colSpan: 3,
                        editorOptions: {
                            optionLabel: "Select...",
                            dataTextField: "text",
                            dataValueField: "value",
                            dataSource: [
                                { text: "A+", value: "A+" },
                                { text: "A-", value: "A-" },
                                { text: "B+", value: "B+" },
                                { text: "B-", value: "B-" },
                                { text: "O+", value: "O+" },
                                { text: "O-", value: "O-" },
                                { text: "AB+", value: "AB+" },
                                { text: "AB-", value: "AB-" },

                            ]
                        },
                        validation: { required: true }
                    },
                    {
                        field: "joining_date",
                        editor: "DatePicker",
                        label: "Joining Date:",
                        colSpan: 3,
                        validation: { required: true }
                    },
                    {
                        field: "retirement_date",
                        editor: "DatePicker",
                        label: "Retirement Date:",
                        colSpan: 3,
                        // validation: { required: true }
                    },
                    {
                        field: "current_post",
                        label: "Current Post:",
                        colSpan: 3,
                        validation: { required: true }
                    },
                    {
                        field: "branch_name",
                        editor: "DropDownList",
                        label: "Select Branch Name:",
                        colSpan: 3,
                        editorOptions: {
                            optionLabel: "Select...",
                            dataSource: getDropdownDataSource('get-division-name', []),
                            dataValueField: "Id", //Id
                            dataTextField: "Name"
                        },
                        validation: { required: { message: "Select Branch Name" } }
                    },

                    {
                        field: "branch_phonenumber",
                        label: "Branch Phone Number:",
                        type: "number",
                        colSpan: 3,
                        // validation: { Number:true,required: true}
                    },
                    {
                        field: "branch_address",
                        label: "Branch Address",
                        editor: "TextArea",
                        editorOptions: { rows: 6 },
                        colSpan: 3,
                        validation: { required: true }
                    },
                    {
                        field: "home_address",
                        label: "Home Address ",
                        editor: "TextArea",
                        editorOptions: { rows: 6 },
                        colSpan: 3,
                        validation: { required: true }
                    },
                    {
                        field: "gpf_no_cpf_no",
                        label: "GPF/CPF Number:",
                        colSpan: 3,
                        validation: { Number: true, required: true }
                    },

                    {
                        field: "mobile_number",
                        label: "Mobile Number:",
                        colSpan: 3,
                        validation: { Number: true, required: true, }
                    },
                    {
                        field: "member_nominee_name",
                        label: "Member Nominee Name:",
                        colSpan: 3,
                        validation: { required: true }
                    },
                    {
                        field: "nominee_relation",
                        editor: "DropDownList",
                        label: "Member Relation:",
                        colSpan: 3,
                        editorOptions: {
                            optionLabel: "Select...",
                            dataTextField: "text",
                            dataValueField: "value", //Id
                            dataSource: [
                                { text: "Father", value: "Father" },
                                { text: "Mother", value: "Mother" },
                                { text: "Brother", value: "Brother" },
                                { text: "Sister", value: "Sister" },
                                { text: "Son", value: "Son" },
                                { text: "Wife", value: "Wife" },

                            ]
                        },
                        validation: { required: true }
                    },
                    {
                        field: "nominee_DOB",
                        editor: "DatePicker",
                        label: "Member DOB:",
                        colSpan: 3,
                        validation: { required: true }
                    },
                    {
                        field: "nominee_mobile",
                        label: "Member Mobile Number:",
                        colSpan: 3,
                        validation: { Number: true, required: true }
                    },
                    {
                        field: "bank_name",
                        label: "Bank Name:",
                        colSpan: 3,
                        validation: { required: true }
                    },
                    {
                        field: "bank_branch",
                        label: "Bank Branch Name:",
                        colSpan: 3,
                        // validation: {required: true}
                    },
                    {
                        field: "bank_account",
                        label: "Bank Account Number:",
                        colSpan: 3,
                        validation: { Number: true, required: true }
                    },
                    {
                        field: "ifsc_code",
                        label: "IFSC Code:",
                        colSpan: 3,
                        validation: { min: 0, required: true }
                    },
                    {
                        field: "payment_type",
                        label: "Payment Type:",
                        editor: "RadioGroup",
                        editorOptions: {
                            items: ["Cash", "Check"],
                            layout: "horizontal",
                            labelPosition: "before"
                        },
                        colSpan: 2,
                        validation: { required: true },
                    },

                    {
                        field: "check_number",
                        label: "Check Number:",
                        colSpan: 2,
                        validation: { number: true, required: true }
                    },

                    {
                        field: "payment_receiver_name",
                        label: "Payment Recever Name:",
                        colSpan: 2,
                        validation: { required: true }
                    },


                ],
            },

        ],
        buttonsTemplate:'<div class="w-full inline-flex space-x-4 items-center justify-end py-2">\n' +
                            '<div class="float-right flex space-x-4 items-center justify-end">\n' +
                                '<button type="button" class="btn btn-outline-secondary font-weight-bold btn-sm cancel-btn" data-type-id="customerModal" type="button">Cancel</button>\n' +
                                '<button type="submit" class="btn btn-primary font-weight-bold btn-sm">Submit</button>\n' +
                            '</div>\n' +
                        '</div>',
        submit: function (ev) {
            let dataArr = {}
            let serializeArr = $("#customerForm").find('input[name], select[name], textarea[name]').serializeArray();
            $(serializeArr).each(function (i, field) {
                dataArr[field.name] = field.value;
                saveModalData('customerForm', 'save_customer', 'customerModal');
                ev.preventDefault();
                return false;
            });
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
            data: { 'action': 'save_customer', 'data': dataArr },
            success: function (response) {
                window.location.href = "/customer";
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
});

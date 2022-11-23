    //const { extendWith } = require("lodash");

    $(document).ready(function(){


    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

        var customer = JSON.parse($('#customerdata').val());

        var member =JSON.parse($('#memberdata').val());
      $("#editCustomerForm").kendoForm({
        formData: {
                id : customer[0].id,
                first_name : customer[0].first_name ,
                middle_name : customer[0]. middle_name,
                last_name : customer[0].last_name,
                DOB : customer[0]. DOB,
                blood_group :customer[0].blood_group ,
                joining_date :customer[0].joining_date ,
                retirement_date : customer[0].retirement_date,
                current_post : customer[0]. current_post,
                branch_name : customer[0]. branch_name,
                branch_address : customer[0]. branch_address,
                branch_phonenumber : customer[0]. branch_phonenumber,
                gpf_no_cpf_no : customer[0]. gpf_no_cpf_no,
                home_address : customer[0]. home_address,
                mobile_number : customer[0]. mobile_number ,
                member_nominee_name : customer[0]. member_nominee_name ,
                nominee_relation :customer[0].nominee_relation ,
                nominee_DOB : customer[0]. nominee_DOB,
                nominee_mobile : customer[0]. nominee_mobile ,
                bank_name : customer[0].bank_name  ,
                bank_branch : customer[0]. bank_branch ,
                bank_account : customer[0].bank_account ,
                ifsc_code : customer[0].ifsc_code,
                payment_type: customer [0]. payment_type,
                check_number: customer [0].  check_number,
                payment_receiver_name: customer [0]. payment_receiver_name,
            },
            layout: "grid",
            grid: {
                cols: 1,
                gutter: 20
            },
            items: [
                {
                    type: "group",
                    layout: "grid",
                    grid: { cols: 6, gutter: 10},
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
                            validation: {required: true}
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
                                dataSource:[
                                        {text:"A+",value:"A+"},
                                        {text:"A-",value:"A-"},
                                        {text:"B+",value:"B+"},
                                        {text:"B-",value:"B-"},
                                        {text:"O+",value:"O+"},
                                        {text:"O-",value:"O-"},
                                        {text:"AB+",value:"AB+"},
                                        {text:"AB-",value:"AB-"},

                                 ]
                            },
                                 validation: { required: true}
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
                            validation: {required: true}
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
                                 validation: { required: { message: "Select Branch Name"} }
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
                            validation: {required: true}
                        },
                        {
                            field: "home_address",
                            label: "Home Address ",
                            editor: "TextArea",
                            editorOptions: { rows: 6 },
                            colSpan: 3,
                            validation: {required: true}
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
                            validation: { Number: true, required: true,}
                        },
                        {
                            field: "member_nominee_name",
                            label: "Member Nominee Name:",
                            colSpan: 3,
                            validation: {required: true}
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
                                dataSource:[
                                        {text:"Father",value:"Father"},
                                        {text:"Mother",value:"Mother"},
                                        {text:"Brother",value:"Brother"},
                                        {text:"Sister",value:"Sister"},
                                        {text:"Son",value:"Son"},
                                        {text:"Wife",value:"Wife"},

                                ]
                            },
                                 validation: { required: true}
                        },
                        {
                            field: "nominee_DOB",
                            editor: "DatePicker",
                            label: "Member DOB:",
                            colSpan: 3,
                            validation: {required: true}
                        },
                        {
                            field: "nominee_mobile",
                            label: "Member Mobile Number:",
                            colSpan: 3,
                            // validation: { Number:true, required: true}
                        },
                        {
                            field: "bank_name",
                            label: "Bank Name:",
                            colSpan: 3,
                            validation: {required: true}
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
                            validation: { Number:true, required: true}
                        },
                        {
                            field: "ifsc_code",
                            label: "IFSC Code:",
                            colSpan: 3,
                            validation: { min: 0, required: true}
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
                            validation: {required: true}
                        },


                    ],
                },

            ],

            buttonsTemplate: '<div class="w-full inline-flex space-x-4 items-center justify-end py-2">\n' +
                            '<div class="float-right flex space-x-4 items-center justify-end">\n' +
                                '<button type="button" class="btn btn-outline-secondary font-weight-bold btn-sm cancel-btn data-type-id="customerModal" type="button">Cancel</button>\n' +
                                '<input type="hidden" id="editId" name="id">\n' +
                                '<button type="submit" class="btn btn-primary font-weight-bold btn-sm" type="submit">Edit Customer</button>\n' +
                            '</div>\n' +
                        '</div>',
            submit: function(ev) {
                let dataArr = {}
                let serializeArr = $("#editCustomerForm").find('input[name], select[name], textarea[name]').serializeArray();
                $(serializeArr).each(function (i, field) {
                    dataArr[field.name] = field.value;

                });


            // console.log(serializeArr);
                $.ajax({
                    type: "POST",
                    url: site_url + "api/customer/ajaxAction",
                    dataType: "json",
                    data: {'action': 'save_customer', 'data': dataArr },
                    success: function (response) {
                        kendo.ui.progress($(document.body), false);
                        let editCustomer = $(document).find('#editCustomerForm');
                        notificationDisplay(response.message, '', response.status);
                        window.location.href = "/customer";

                    }
                });

                ev.preventDefault();

            return false;
            },
        });

        // function saveModalData(formId = '', type = '', modalId = '') {
        //     let serializeArr = $(document).find("#" + modalId).find('input[name], select[name], textarea[name]').serializeArray();
        //     let dataArr = {}
        //     $(serializeArr).each(function (i, field) {
        //         dataArr[field.name] = field.value;
        //     });
        //     console.log(dataArr);
        //     $.ajax({
        //         type: "POST",
        //         url: site_url + "api/customer/ajaxAction",
        //         dataType: "json",
        //         data: { 'action': 'save_customer', 'data': dataArr },
        //         success: function (response) {
        //             window.location.href = "/customer";
        //         }
        //     });
        // }

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
            // dataTextField: "text",
            dataValueField: "value",
            dataSource: getDropdownDataSource(api_url, postArr),
        });
    }

 });

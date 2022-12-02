$(document).ready(function(){

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $("#vyajShowList").kendoGrid({
        dataSource: customDataSource("api/vyaj-show-data",{}),
        pageable: customPageableArr(),
        dataBound: function(e) {
            setTimeout(function() {
                setFilterIcon("#vyajShowList");
            }, 100);
        },
        filterable: true,
        sortable: true,
        resizable: true,
        columns: [
            {
                template: "<div class='flex items-center text-sm leading-5 fff font-normal text-gray-600'>#: account_no #</div>",
                field: "account_no",
                title: "ACCOUNT NO",
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: customer_name #</div>",
                field: "customer_name",
                title: "CUSTOMER"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: branch_name #</div>",
                field: "branch_name",
                title: "BRANCH"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: sub_scheme_name #</div>",
                field: "sub_scheme_name",
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
            {
                template: "<div class='flex items-center text-sm leading-5 font-semibold text-green-600'>#: interest_paid #</div>",
                field: "total_interest",
                title: "TOTAL INTEREST",
            },
        ],
        noRecords: noRecordTemplate()
    });


    $("#vyajGanatriList").kendoGrid({
        dataSource: customDataSource(
            "api/loan-transaction-data", {
                account_no: { type: "string",  editable: false},
                customer_name:  { type: "string",  editable: false },
                branch_name: { type: "string",  editable: false},
                sub_scheme_name: {type: "string",  editable: false},
                loan_fd_amount: {type: "string",  editable: false },
                current_pending_due: { type: "string",  editable: false },
                installment_amount: {type: "string",  editable: false},
                total_interest: {type: "string",  editable: false},
                total_paid_amount: {type: "string" },
            },

        ),
        pageable: customPageableArr(),
        dataBound: function(e) {
            setTimeout(function() {
                setFilterIcon("#vyajGanatriList");
            }, 100);
        },
        filterable: true,
        sortable: true,
        resizable: true,
        columns: [
            {
                template: "<div class='flex items-center text-sm leading-5 fff font-normal text-gray-600'>#: account_no #</div>",
                field: "account_no",
                title: "ACCOUNT NO",
                editable: false
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: customer_name #</div>",
                field: "customer_name",
                title: "CUSTOMER"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: branch_name #</div>",
                field: "branch_name",
                title: "BRANCH"
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: sub_scheme_name #</div>",
                field: "sub_scheme_name",
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
            {
                template: "<div class='flex items-center text-sm leading-5 font-normal text-gray-600'>#: installment_amount #</div>",
                field: "installment_amount",
                title: "INSTALLMENT"
            },
            {
                template: function(dataItem) {
                    return interestCalculation(dataItem.intrest_rate, dataItem.installment_amount, dataItem.current_pending_due);
                },
                field: "total_interest",
                title: "INTEREST",
            },
            {
                template: "<div class='flex items-center text-sm leading-5 font-semibold text-gray-600'>#: total_paid_amount #</div>",
                field: "total_paid_amount",
                title: "PAID AMOUNT"
            },
            {
                selectable: true,
                width: "50px",
                //template: '<input type="checkbox" id="#=id#" class="gridCK" />'
            },
        ],
        editable: true,
        noRecords: noRecordTemplate()
    });
    customGridHtml("#vyajGanatriList");

    function interestCalculation(intrest_rate, installment_amount, current_pending_due){

        let rate = intrest_rate;
        let remainingAmount = current_pending_due;
        let emi = installment_amount;

        let interestAmount = (rate/100/12) * remainingAmount;
        return '<div class="flex items-center text-sm leading-5 font-normal text-gray-600">'+ Math.ceil(interestAmount) + '</div>';
    }


    $("body").on("click", ".vyaj-ganatri", function(){
        $(document).find("#vyajGanatriModal").find('input[name]').removeClass('k-invalid');
        kendowindowOpen("#vyajGanatriModal");
    });

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

    $("#vyajGanatriModal").kendoWindow(customModal('Vyaj Ganatri Calculator'));

    $("#vyajGanatriForm").kendoForm({
        orientation: "vertical",
        layout: "grid",
        grid: {
            cols: 1,
            gutter: 20
        },
        items:
        [
            {
            type: "group",
            layout: "grid",
            grid: { cols: 4, gutter: 10 },
            items: [
                {
                    field: "scheme",
                    editor: "DropDownList",
                    label: "Select Yojna",
                    colSpan: 4,
                    editorOptions: {
                        select: function (e) {
                            if (e.dataItem) {
                                let postArr = { 'id': e.dataItem.Id }
                                setDropdownList('sub_scheme_id', 'get-sub-scheme-name', postArr);
                            }
                        },
                        optionLabel: "Select...",
                        dataSource: getDropdownDataSource('get-scheme-name', {}),
                        dataValueField: "Id",
                        dataTextField: "Name",
                    },
                    validation: { required: { message: "Select Scheme" } }
                },
                {
                    field: "sub_scheme_id",
                    editor: "DropDownList",
                    label: "Select sub yojna",
                    colSpan: 3,
                    editorOptions: {
                        optionLabel: "Select..."
                    },
                    validation: { required: { message: "Select subyojna" } }
                },
                {
                    field: "total_acc",
                    label: "Total Account",
                    colSpan: 1,
                    editor: function (container, options) {
                        $('<input type="text" id="'+ options.field +'" name="' + options.field + '"  disabled />')
                            .appendTo(container)
                            .kendoTextBox();
                    }
                },
                {
                    field: "counting_from",
                    editor: "DropDownList",
                    label: "Counting From",
                    colSpan: 4,
                    editorOptions: {
                        optionLabel: "Select...",
                        dataTextField: "text",
                        dataValueField: "value",
                        dataSource:[
                                {text:"Jan",value:"1"},
                                {text:"Feb",value:"2"},
                                {text:"Mar",value:"3"},
                                {text:"Apr",value:"4"},
                                {text:"May",value:"5"},
                                {text:"Jun",value:"6"},
                                {text:"Jul",value:"7"},
                                {text:"Aug",value:"8"},
                                {text:"Sep",value:"9"},
                                {text:"Oct",value:"10"},
                                {text:"Nov",value:"11"},
                                {text:"Dec",value:"12"},
                        ],
                        change: onChangeCountingtDate,
                    },
                    validation: { required: { message: "Select Counting" } }
                },
                {
                    field: "start_date",
                    editor: "DatePicker",
                    label: "Start Date",
                    colSpan: 2,
                    validation: { required: true }
                },
                {
                    field: "end_date",
                    editor: "DatePicker",
                    label: "End Date",
                    colSpan: 2,
                    validation: { required: true }
                },
            ],
            },
        ],
        buttonsTemplate: '<div class="w-full inline-flex space-x-4 items-center justify-end py-2">\n' +
                            '<div class="float-right flex space-x-4 items-center justify-end">\n' +
                                '<button class="btn btn-primary font-weight-bold btn-sm" type="submit">Start Calculation</button>\n' +
                            '</div>\n' +
                        '</div>',
        submit: function (ev) {
                saveModalData('vyajGanatriForm', 'total_vyaj_calculation', 'vyajGanatriModal');
                ev.preventDefault();
                return false;
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
            data: { 'action': type , 'data': dataArr },
            success: function (response) {
                $(document).find('#'+modalId).getKendoWindow().close();
                $('#vyajGanatriList').data('kendoGrid').refresh();
                $('#vyajGanatriList').data('kendoGrid').dataSource.read();
                notificationDisplay(response.message, '', response.status);
            }
        });
    }

    function onChangeSubYojna(e) {
        $.ajax({
            type: "POST",
            url: site_url + "api/get-total-customer-account",
            dataType: "json",
            data: { 'sub_scheme_id': e.sender.value() },
            success: function (response) {
                let vyajGanatriForm = $(document).find('#vyajGanatriForm');
                vyajGanatriForm.find('#total_acc').val(response.data);
            }
        });
    }

    function onChangeCountingtDate(e){
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), e.sender.value() -1);
        var lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0);
        var startDate = (firstDay.getMonth()+1)+'/'+firstDay.getDate()+'/'+firstDay.getFullYear();
        var endDate = (lastDay.getMonth()+1)+'/'+lastDay.getDate()+'/'+lastDay.getFullYear();
        $(document).find('#vyajGanatriModal').find('#start_date').val(startDate);
        // $("#start_date").data("kendoDatePicker").enable(false);
        $(document).find('#vyajGanatriModal').find('#end_date').val(endDate);
        // $("#end_date").data("kendoDatePicker").enable(false);
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
            dataSource: getDropdownDataSource(api_url, postArr),
            // change: onChangeSubYojna,

        });
    }

    $("#vyajGanatriFilterForm").kendoForm({
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
                label: "Select Sub Yojna",
                editorOptions: { optionLabel: "Select..." },
                colSpan: 2,
            },
            {
                field: "counting_from",
                editor: "DropDownList",
                label: "Counting From",
                colSpan: 2,
                editorOptions: {
                    optionLabel: "Select...",
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource:[
                            {text:"Jan",value:"01"},
                            {text:"Feb",value:"02"},
                            {text:"Mar",value:"03"},
                            {text:"Apr",value:"04"},
                            {text:"May",value:"05"},
                            {text:"Jun",value:"06"},
                            {text:"Jul",value:"07"},
                            {text:"Aug",value:"08"},
                            {text:"Sep",value:"09"},
                            {text:"Oct",value:"10"},
                            {text:"Nov",value:"11"},
                            {text:"Dec",value:"12"},
                    ],
                },
            },
            // {
            //     field: "start_date",
            //     editor: "DatePicker",
            //     label: "Start Date",
            //     colSpan: 2,
            //     validation: { required: true }
            // },
            // {
            //     field: "end_date",
            //     editor: "DatePicker",
            //     label: "End Date",
            //     colSpan: 2,
            //     validation: { required: true }
            // },
        ],
        buttonsTemplate:    '<div class="float-right flex space-x-4 items-center justify-end pb-6 pl-4">\n' +
                                '<button type="button" class="btn btn-outline-secondary font-weight-bold btn-sm cancel-btn" id="clearFilter">Cancel</button>\n' +
                                '<button type="button" class="applyVyajGanatriFilter btn btn-primary font-weight-bold btn-sm">Submit</button>\n' +
                                '<button type="button" class="vyajPosted btn btn-primary font-weight-bold btn-sm">Post</button>\n' +
                            '</div>',
    });

    $('body').on('click', '.applyVyajGanatriFilter', function() {
        let serializeArr = $(document).find("#vyajGanatriFilterForm").find('input[name], select[name], textarea[name]').serializeArray();
        let dataArr = {}
        $(serializeArr).each(function (i, field) {
            dataArr[field.name] = field.value;
        });

        manageFilterOnGrid("#vyajGanatriList", 'extra', dataArr);
    });

    $('body').on('click','.vyajPosted',function(){
        var grid = $("#vyajGanatriList").data("kendoGrid");
        var selectedDataToEnter = [];
        grid.select().each(function(){

            let rate = grid.dataItem(this).intrest_rate;
            let remainingAmount = grid.dataItem(this).current_pending_due;
            let emi = grid.dataItem(this).installment_amount;

            let interestAmount = (rate/100/12) * remainingAmount;

            var array = {
                id : grid.dataItem(this).id,
                installment_amount : grid.dataItem(this).installment_amount,
                loan_fd_amount : grid.dataItem(this).loan_fd_amount,
                total_paid_amount : (typeof grid.dataItem(this).total_paid_amount === 'undefined') ? grid.dataItem(this).installment_amount : grid.dataItem(this).total_paid_amount,
                intrest_rate : grid.dataItem(this).intrest_rate,
                current_pending_due : grid.dataItem(this).current_pending_due,
                total_interest : Math.ceil(interestAmount)
            }

            selectedDataToEnter.push(array);
        });

        var selectedMonth = $('#counting_from').val();


        if(selectedMonth != '' && selectedDataToEnter.length > 0){
            var data = {month : selectedMonth,selectedData : selectedDataToEnter};
            console.log(data);
            $.ajax({
                type: "POST",
                url: site_url + "api/customer/ajaxAction",
                dataType: "json",
                data: { 'action': 'total_vyaj_calculation' , 'data': data },
                success: function (response) {
                    // $(document).find('#'+modalId).getKendoWindow().close();
                    $('#vyajGanatriList').data('kendoGrid').refresh();
                    $('#vyajGanatriList').data('kendoGrid').dataSource.read();
                    notificationDisplay(response.message, '', response.status);
                }
            });
        } else {
            notificationDisplay('Please select month or checked posted user', '', 'error');
        }
    });

    $('body').on('click', '#clearFilter', function(e) {
        e.preventDefault();
        $("#vyajGanatriList").data("kendoGrid").dataSource.filter([]);
    });

});



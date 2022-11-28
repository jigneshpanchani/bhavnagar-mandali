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

    $("body").on("click", ".customertransactionvyavahardetail", function(){
        kendowindowOpen("#customertransactionvyavahardetailModal");
    });

    $("#customertransactionvyavahardetailModal").kendoWindow(modalopen('vyavahar detail'));

    $("#customertransactionvyavahardetailform").kendoForm({
            orientation: "vertical",
            items: [
            {
                field: "branch_account_name",
                editor: "DropDownList",
                label: "Branch Account Name",
                editorOptions: {
                    optionLabel: "Select...",
                    dataTextField: "text",
                    dataValueField: "value", //Id
                    dataSource:[
                            {text:"IDBI",value:"1"},
                            {text:"Rokad khate",value:"2"},
                            {text:"Bhava.ji.Bank ChaluKhate",value:"3"},
                            {text:"Bhava.ji.Bank Ro.Shakh",value:"4"},
                            {text:"Bhava.ji.Bank BachatKhate",value:"5"},
                            {text:"SaurashtraGraminBank Bachat",value:"6"},
                            {text:"SaurashtraGraminBank OverDraftKhatu",value:"7"}

                    ],
                },
                validation: { required: { message: "Select Name"} }
            },
            {
                field: "tranjection_detail",
                label: "Transaction Detail",
                validation: { required: true  }
            },
            {
                field: "receipt_no",
                label: "Receipt No:",
                validation: { required: true  }
            },
            {
                field: "total_rec",
                label: "Total Rec:",
                validation: { required: true  }
            },
            {
                field: "transaction_amt",
                label: "Sum of Amt In Paid:",
                validation: { required: true  }
            },
            {
                field: "net",
                label: "Net:",
                editor: "RadioGroup",
                editorOptions: {
                    items: ["Rec", "Pay"],
                    layout: "horizontal",
                    labelPosition: "before"
                },
                colSpan: 1,
                validation: { required: true },
            },
            {
                field: "amount",
                label: "Amount:",
                validation: { required: true  }
            },

            ],
        buttonsTemplate: '<div class="w-full inline-flex space-x-4 items-center justify-end py-2">\n' +
                '<div class="float-right flex space-x-4 items-center justify-end">\n' +
                    '<button type="button" class="btn btn-outline-secondary font-weight-bold btn-sm cancel-btn" data-type-id="customertransactionvyavahardetail" type="button">Cancel</button>\n' +
                    '<button type="submit" class="btn btn-primary font-weight-bold btn-sm"  type="submit">Save</button>\n' +
                '</div>\n' +
            '</div>',
        submit: function(ev) {
            saveModalData('customertransactionvyavahardetailform','Save_customertransactionvyavahar','customertransactionvyavahardetailModal');
            kendoWindow.getKendoWindow().close;
            ev.preventDefault();

        },
    });

    function saveModalData(formId='', type='' ,modalId=''){
        kendo.ui.progress($(document.body), true);
        let serializeArr = $(document).find("#"+modalId).find('input[name], select[name], textarea[name]').serializeArray();
        let dataArr = {}
            $(serializeArr).each(function (i, field) {
            dataArr[field.name] = field.value;
        });
        $.ajax({
            type: "POST",
            url: site_url + "api/customertransactionvyavahar/ajaxAction",
            dataType: "json",
            data: {'action': 'Save_customertransactionvyavahar', 'data': dataArr },
            success: function (response) {
                kendo.ui.progress($(document.body), false);
                $(document).find('#'+modalId).getKendoWindow().close();
                notificationDisplay(response.message, '', response.status);

            }
        });
    }

    function modalopen(title){
        return {
            title: title,
            width: "34%",
            actions: ["close"],
            draggable: false,
            resizable: false,
            modal: true,
            position: {
                top: "15%",
                left: "33%"
            },
            animation: {
                close: {
                    effects: "fade:out"
                }
            }

        };
    }

    function kendowindowOpen(windowID) {
        let kendoWindow = $(document).find(windowID);
        kendoWindow.getKendoWindow().open();
        kendoWindow.parent('div').find(".k-window-titlebar")
            .addClass('titlebar-sms-modal bg-gradient-to-l from-green-400 to-blue-500')
            .find('.k-window-title')
            .addClass('text-lg font-medium leading-normal text-white');
    }

 });

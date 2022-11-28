function ajaxcallwithMethod(url, data, method, callback) {
    //  App.startPageLoading();
    var rtrn = $.ajax({
        type: method,
        url: url,
        data: data,
        headers: { 'X-CSRF-TOKEN': $('input[name="_token"]').val() },
        success: function(result) {
            //   App.stopPageLoading();
            callback(result);
        },
        error: function(result) {
            callback(result);
        }
    });
    return rtrn;
}



function ajaxcallwithMethodFileKendo(url, data, method, callback) {

    kendo.ui.progress($(document.body), true);
    var rtrn = $.ajax({
        type: method,
        url: url,
        data: data,
        processData: false,
        contentType: false,
        headers: { 'X-CSRF-TOKEN': $('input[name="_token"]').val() },
        success: function(result) {

            kendo.ui.progress($(document.body), false);
            callback(result);
        },
        error: function(result) {
            kendo.ui.progress($(document.body), false);
            callback(result);
        }
    });
    return rtrn;
}

function ajaxcallwithMethodKendo(url, data, method, callback) {
    //  App.startPageLoading();
    kendo.ui.progress($(document.body), true);
    var rtrn = $.ajax({
        type: method,
        url: url,
        data: data,
        headers: { 'X-CSRF-TOKEN': $('input[name="_token"]').val() },
        success: function(result) {
            //   App.stopPageLoading();
            kendo.ui.progress($(document.body), false);
            callback(result);
        },
        error: function(result) {
            kendo.ui.progress($(document.body), false);
            callback(result);
        }
    });
    return rtrn;
}

function handleAjaxFormSubmitLaravel(form, type) {
    if (typeof type === 'undefined') {
        ajaxcallwithMethod($(form).attr('action'), $(form).serialize(), $(form).attr('method'), function(output) {

            if (typeof output.responseText !== 'undefined') {
                output = output.responseText;
            }
            console.log(output);
            handleAjaxResponseNew(output);
        });
    } else if (type === true) {
        // App.startPageLoading();
        var options = {
            resetForm: false, // reset the form after successful submit
            success: function(output) {
                //   App.stopPageLoading();
                handleAjaxResponseNew(output);
            }
        };
        $(form).ajaxSubmit(options);
    }
    return false;
}

function handleAjaxResponseNew(output) {

    if (typeof output == 'string') {
        output = JSON.parse(output);
    }

    if (output.message != '' && typeof output.errors === 'undefined') {
        showToster(output.status, output.message, '');
    }
    if (output.message != '' && typeof output.errors !== 'undefined') {
        for (var key in output.errors) {
            showToster('error', output.errors[key], '');
        }
    }
    if (typeof output.redirect !== 'undefined' && output.redirect != '') {
        setTimeout(function() {
            window.location.href = output.redirect;
        }, 4000);
    }
    if (typeof output.jscode !== 'undefined' && output.jscode != '') {
        eval(output.jscode);
    }
}

function replaceDataItHtml(replaceDataObj) {

    $.each(replaceDataObj, function(key, value) {


        if (typeof value == 'string' || typeof value == 'number') {
            if ($('.' + key).is('input, select')) {
                $('.' + key).val(value);
            } else {
                $('.' + key).text(value);
            }

        }
        if (typeof value == 'object') {
            var tableHtml = '';
            $.each(value, function(objKey, objValue) {
                tableHtml += '<tr><td>' + objValue.comments + '</td></tr>';
                $('.' + key).html(tableHtml);
            });
        }
    });
}

function onLoadSidebarOpen(){
    $(".treeview").each(function (){
        if($(this).closest('li').hasClass('active')){
            if (!$(this).next('ul').is(':visible')) {
                $(this).next('ul').show();
            }
        }
    });
}

$('.updateNotificationCount').on('click', function() {
    var id = $(this).attr('data-id');
    var notificationcount = $(this).attr('data-count');
    if (notificationcount > 0) {
        $('.updateNotificationCount').find('g').remove();
        $.ajax({
            url: site_url + "dashboard/ajaxAction",
            method: "POST",
            headers: {
                'X-CSRF-TOKEN': $('input[name="_token"]').val()
            },
            data: { 'action': 'notificationcountupdate', 'data': { 'id': id } },
            success: function(data) {
                if (data == 'success') {
                    $('.updateNotificationCount').attr('data-count', '0');
                }
            }
        });
    }
});

$(".treeview").click(function() {
    // $('.sidebar-menu ul').slideUp('fast');
    if (!$(this).next('ul').is(':visible')) {
        $(this).next('ul').slideDown('fast');
    }else{
        $(this).next('ul').slideUp('fast');
    }
});

$('.menuli').click(function() {
    $('.leftsidebarmenu li').removeClass('bg-geekBlue-500');
    $(this).addClass('bg-geekBlue-500');
    $(this).removeClass('hover:bg-gray-700');
});

$('#menuBtn').click(function() {
    $('.toogleWidth.w-64').toggleClass('d-none');
    $('.main-header .logo').toggleClass('hidden');
});

$('#user-menu').on('click', function(event) {
    $(this).parent().toggleClass("open");
});

$('body').on('click', function(e) {
    if (!$('#user-menu').is(e.target) && $('#user-menu').has(e.target).length === 0 && $('.open').has(e.target).length === 0) {
        $('#user-menu').parent().removeClass('open');
    }
});

window.onload = function() {
    var selItem = sessionStorage.getItem("SelItem");
    $('#sort-item').val(selItem);
    onLoadSidebarOpen();
}

$('#sort-item').change(function() {
        var selVal = $(this).val();
        sessionStorage.setItem("SelItem", selVal);
    });

function customDataSource(api_url, fields, dateField=[], extraField=[]){
    return {
        type: "json",
        transport: {
            read: {
                url: site_url + api_url,
                dataType: 'json',
                type: 'POST',
                data: dateField
            },
            parameterMap: function(data, operation) {
                if (operation == "read") {
                    if (data.filter && extraField.length > 0) {
                        $.each(data.filter.filters, function(index, value) {
                            if ($.inArray(value.field, extraField) != -1){
                                data.filter.filters[index].value = kendo.toString(data.filter.filters[index].value, "yyyy-MM-dd");;
                            }
                        });
                    }
                    return data;
                }
            }
        },
        schema: {
            data: "data.data",
            total: "data.total",
            model: {
                id: "id",
                fields: fields
            }
        },
        pageSize: 20,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true
    }
}

function customPageableArr() {
    return {
        pageSizes: [20, 50, 100, 'All'],
        previousNext: true,
        buttonCount: 5,
        messages: {
            display: "Showing {0} to {1} of {2} results",
            select: "test",
            empty: "No Record Found",
            first: "&laquo;",
            last: "&raquo;",
            next: "&rsaquo;",
            previous: "&lsaquo;"
        }
    }
}

function customDataBoundWithActionMenu(gridID, e) {
    let grid = e.sender;
    let rows = grid.tbody.find("[role='row']").not(":last-child");
    rows.unbind("click");
    rows.on("click", onClickForCheckbox);
    setTimeout(function() { setFilterIcon(gridID); }, 100);
}

function customDataBoundWithCheckbox(gridID, e) {
    let grid = e.sender;
    let rows = grid.tbody.find("[role='row']");
    rows.unbind("click");
    rows.on("click", onClickForCheckbox);
    setTimeout(function() { setFilterIcon(gridID); }, 100);

    /* Manage pager & no record template */
    manageGridPagerTemplate(gridID);
};

function onClickForCheckbox(e) {
    if ($(e.target).hasClass("k-checkbox"))
        return;
    let row = $(e.target).closest("tr");
    let checkbox = $(row).find(".k-checkbox");
    checkbox.click();
};

function customGridHtml(gridID) {
    /* Change filter icon from column & apply filter data */
    setFilterIcon(gridID);

    /* Change custom pagination for grid & needs only page load time*/
    customPagination(gridID);
}

function setFilterIcon(gridID) {
    let gridHtml = $(document).find(gridID);
    let activeIcon = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 2C1 1.44772 1.44772 1 2 1H12C12.5523 1 13 1.44772 13 2V3.25245C13 3.51767 12.8946 3.77202 12.7071 3.95956L8.62623 8.04044C8.43869 8.22798 8.33333 8.48233 8.33333 8.74755V10.3333L5.66667 13V8.74755C5.66667 8.48233 5.56131 8.22798 5.37377 8.04044L1.29289 3.95956C1.10536 3.77202 1 3.51767 1 3.25245V2Z" stroke="#1890FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    let icon = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 2C1 1.44772 1.44772 1 2 1H12C12.5523 1 13 1.44772 13 2V3.25245C13 3.51767 12.8946 3.77202 12.7071 3.95956L8.62623 8.04044C8.43869 8.22798 8.33333 8.48233 8.33333 8.74755V10.3333L5.66667 13V8.74755C5.66667 8.48233 5.56131 8.22798 5.37377 8.04044L1.29289 3.95956C1.10536 3.77202 1 3.51767 1 3.25245V2Z" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    gridHtml.find('.k-grid-filter').each(function() {
        if ($(this).hasClass('k-state-active'))
            $(this).html(activeIcon);
        else
            $(this).html(icon);
    });
}

function customPagination(gridID) {
    let gridHtml = $(document).find(gridID);
    gridHtml.find('.k-pager-sizes').contents().filter(function() { return this.nodeType === 3; }).remove();
    gridHtml.find('.k-grid-pager').append('<div class="flex justify-between w-full"><div class="gridInfo"></div><div class="gridPagination k-pager-wrap k-grid-pager k-widget k-floatwrap"></div></div>');
    gridHtml.find(".k-pager-sizes").appendTo(gridID + " .k-grid-pager .flex .gridInfo");
    gridHtml.find(".k-pager-info").insertAfter(gridID + " .k-grid-pager .flex .gridInfo .k-pager-sizes");
    gridHtml.find(".k-pager-wrap a, .k-pager-wrap .k-pager-numbers-wrap").appendTo(gridID + " .k-grid-pager .flex .gridPagination");
    gridHtml.find(".k-pager-wrap.k-grid-pager.k-widget.k-floatwrap").removeClass('k-pager-sm');
}

function manageGridPagerTemplate(gridID){
    let cnt = $(gridID).data('kendoGrid').dataSource.total();
    if(cnt == 0)
        $(gridID).find('.k-pager-wrap').hide();
    else
        $(gridID).find('.k-pager-wrap').show();
}

function manageListPagerTemplate(gridID){
    let cnt = $(gridID).data('kendoListView').dataSource.total();
    if(cnt == 0)
        $(gridID).parent("div").find('.no-record-template').html(noRecordTemplateHtml());
    else
        $(gridID).parent("div").find('.no-record-template').html('');
}

function noRecordTemplate(){
    return { template: noRecordTemplateHtml() };
}

function noRecordTemplateHtml(){
    return "<div class='inline-flex flex-col space-y-6 items-center justify-center w-full h-56'>" +
                "<span class='k-icon k-i-paste k-icon-64 icon-color-blue'></span>" +
                "<div class='flex flex-col space-y-2 items-center justify-center'>" +
                    "<p class='text-2xl font-bold leading-7 text-center text-gray-800'>No Results Found</p>" +
                    "<p class='text-sm leading-5 font-normal text-center text-gray-500'>Try using different filters.</p>" +
                "</div>" +
            "</div>";
}

function manageFilterOnGrid(gridID, fieldName, searchKeyword) {
    /* apply grid filter with custom filter using single array */

    var grid = $(gridID).data('kendoGrid');
    let tempArr = { field: fieldName, operator: 'contains', value: searchKeyword }

    if (typeof grid.dataSource.filter() != "undefined") {
        let flag = true;
        let oldFilterArr = grid.dataSource.filter().filters;
        Object.entries(oldFilterArr).forEach(filter => {
            if (filter[1].field == fieldName) {
                filter[1].value = searchKeyword;
                flag = false;
            }
        });
        if (flag) {
            oldFilterArr.push(tempArr);
        }
        grid.dataSource.read();
        //grid.dataSource.filter().filters.push(tempArr);
    } else {
        grid.dataSource.filter(tempArr);
    }
    setFilterIcon(gridID);
}

function manageProfilePic(id, profile_pic, nameStr) {
    /* Manage user name with profile picture or default 2 characters */
    let html = '';
    if (profile_pic == '') {
        let displayName = 'NA';
        if(typeof nameStr !== undefined && nameStr != null){
            let name = nameStr.toUpperCase().split(/\s+/);
            displayName = name[0].charAt(0) + name[1].charAt(0);
        }else{
            nameStr = 'N/A';
        }
        html = "<div class='flex items-center stud_" + id + "'><div class='user-profile-pic h-6 w-6 rounded-full bg-blue-500'><span class='text-xs leading-6'>" + displayName + "</span></div>&nbsp;<div class='student-first-name text-sm leading-4 text-gray-600'>" + nameStr + "</div></div>";
    } else {
        html = "<div class='flex items-center stud_" + id + "'><img class='h-6 w-6 rounded-full' src='" + profile_pic + "' alt=''>&nbsp;<div class='student-first-name w-5/6 text-sm leading-4 text-gray-600'>" + nameStr + "</div></div>";
    }
    return html;
}

function startDateChange(start, end) {
    let startDate = start.value();
    let endDate = end.value();
    if (startDate) {
        startDate = new Date(startDate);
        startDate.setDate(startDate.getDate());
        end.min(startDate);
    } else if (endDate) {
        start.max(new Date(endDate));
    } else {
        endDate = new Date();
        start.max(endDate);
        end.min(endDate);
    }
}

function endDateChange(start, end) {
    let startDate = start.value();
    let endDate = end.value();
    if (endDate) {
        endDate = new Date(endDate);
        endDate.setDate(endDate.getDate());
        start.max(endDate);
    } else if (startDate) {
        end.min(new Date(startDate));
    } else {
        endDate = new Date();
        start.max(endDate);
        end.min(endDate);
    }
}

function notificationDisplay(msg, title, status) {
    let notification = $("#notification").kendoNotification({
        position: {
            pinned: true,
            bottom: 30,
            left: 30
        },
        autoHideAfter: 0,
        stacking: "down",
        templates: [{
                type: "error",
                template: $("#errorTemplate").html()
            },
            {
                type: "success",
                template: $("#successTemplate").html()
            }
        ]
    }).data("kendoNotification");

    notification.show({
        title: title,
        message: msg,
    }, status);

    setTimeout(function() { notification.hide(); }, 2000);
}

function customLoader(){
    $("#loader").kendoLoader();
    kendo.ui.progress.messages = {
        loading: '<div class="vue-simple-spinner animate-spin" style="position:absolute;top:50%;left:50%;transfrom:translate(-50%,-50%); margin: 0px auto; border-radius: 100%; border-color: rgb(50, 157, 243) rgb(238, 238, 238) rgb(238, 238, 238); border-style: solid; border-width: 3px; border-image: none 100% / 1 / 0 stretch; width: 90px; height: 90px;"></div>'
    };
}

$("body").on("click", "#filterBtn", function() {
    $('.toggelfilter').toggleClass('widthzero');
    $('.toggelfilter').toggleClass('px-0');

    $('#toggelFilterDiv').toggleClass('w-full');
    $('#toggelFilterDiv').toggleClass('w-9/12');
});

$('body').on('keyup', '.searchInputField', function(e) {
    let gridID = '#' + $(this).attr('data-grid-id');
    let searchKeyword = $(this).val();
    manageFilterOnGrid(gridID, 'searchKey', searchKeyword);
});

function defaultWindowSlideFormat(title, widthVal=40){
    return {
        title: title,
        width: widthVal + '%',
        height: "100%",
        actions: [ "close" ],
        draggable: false,
        resizable: false,
        modal: true,
        position:{
            top: 0,
            left: (100 - widthVal) + '%'
        },
        animation: {
            open: {
                effects: "slideIn:left",
                duration: 500
            },
            close: {
                effects: "slideIn:left",
                reverse: true,
                duration: 500
            },
        },
        visible: false
    }
}

function swapDiv(showDiv, replaceDiv, response=[]) {
    $(showDiv).show();
    kendo.fx(showDiv).replace(replaceDiv, "swap").run();
    if(typeof(response.status) != "undefined" && response.status !== null){
        notificationDisplay(response.message, '', response.status);
    }
}

$(document).on('click', '.cancel-btn', function (){
    let modalID = $(this).attr('data-type-id');
     window.parent.$('#'+modalID).data("kendoWindow").close();
 });

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

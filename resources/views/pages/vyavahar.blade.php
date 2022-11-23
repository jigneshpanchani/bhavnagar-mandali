@extends('layouts.layout')

@section('content')

<div class="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
    <div class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div class="d-flex flex flex-col lign-items-center flex-wrap mr-2">
        <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">{{ (@$pagetitle) ? $pagetitle : 'Static' }}</h5>
        </div>
        {{-- <button class="customertransactionvyavahardetail btn btn-primary font-weight-bolder btn-sm justify-end">vyavahar</button> --}}
    </div>
</div>

<div class="flex flex-col space-y-4">
        <div class="flex flex-col bg-white p-6 rounded">
            <div class="inline-flex items-center space-x-6 justify-start w-full py-4">
                <div class="inline-flex flex-col space-y-4 items-start justify-start w-full">
                    <div class="inline-flex items-center justify-start w-full">
                        <p class="w-1/2 text-lg font-medium leading-4 text-gray-900">Ananya No:</p>
                        <p class="text-sm w-1/2 leading-5 font-medium text-gray-800">{{($td->ananya_no) ? $td->ananya_no : '' }}</p>
                    </div>
                    <div class="inline-flex items-center justify-start w-full">
                        <p class="w-1/2 text-lg font-medium leading-5 text-gray-900">Account No:</p>
                        <p class="text-sm w-1/2 leading-5 font-medium text-gray-800">{{($td->account_no) ? $td->account_no : '' }}</p>
                    </div>
                    <div class="inline-flex items-center justify-start w-full">
                        <p class="w-1/2 text-lg font-medium leading-4 text-gray-900">Name:</p>
                        <p class="text-sm w-1/2 leading-5 font-medium text-gray-800">{{($md->first_name) ? $md->first_name.' '.$md->middle_name.' '.$md->last_name : '' }}</p>
                    </div>
                    <div class="inline-flex items-center justify-start w-full">
                        <p class="w-1/2 text-lg font-medium leading-4 text-gray-900">Yojna:</p>
                        <p class="text-sm w-1/2 leading-5 font-medium text-gray-800">{{($scheme->name) ? $scheme->name : '' }}</p>
                    </div>
                    <div class="inline-flex items-center justify-start w-full">
                        <p class="w-1/2 text-lg font-medium leading-4 text-gray-900">Sub Yojna:</p>
                        <p class="text-sm w-1/2 leading-5 font-medium text-gray-800">{{($scheme_sub->name) ? $scheme_sub->name : '' }}</p>
                    </div>
                </div>
                <div class="inline-flex flex-col space-y-4 items-start justify-start w-full">
                    <div class="inline-flex items-center justify-start w-full">
                        <p class="w-1/2 text-lg font-medium leading-4 text-gray-900">Start Date:</p>
                        <p class="text-sm w-1/2 leading-5 font-medium text-gray-800">{{($td->start_date) ?  $td->start_date : '' }}</p>
                    </div>
                    <div class="inline-flex items-center justify-start w-full">
                        <p class="w-1/2 text-lg font-medium leading-4 text-gray-900">Maturity Date:</p>
                        <p class="text-sm w-1/2 leading-5 font-medium text-gray-800">{{($td->maturity_date) ?  $td->maturity_date : '' }}</p>
                    </div>
                    <div class="inline-flex items-center justify-start w-full">
                        <p class="w-1/2 text-lg font-medium leading-4 text-gray-900">Intrest Rate & Duration:</p>
                        <p class="text-sm w-1/2 leading-5 font-medium text-gray-800">{{($td->intrest_rate) ?  $td->intrest_rate : '' }}% ({{($td->loan_duration) ?  $td->loan_duration : '' }} Years)</p>
                    </div>
                    <div class="inline-flex items-center justify-start w-full">
                        <p class="w-1/2 text-lg font-medium leading-4 text-gray-900">Installment Amount:</p>
                        <p class="text-sm w-1/2 leading-5 font-medium text-gray-800">{{($td->installment_amount) ?  $td->installment_amount : '0' }}</p>
                    </div>
                    <div class="inline-flex items-center justify-start w-full">
                        <p class="w-1/2 text-lg font-medium leading-4 text-gray-900">Loan FD Amount:</p>
                        <p class="text-sm w-1/2 leading-5 font-medium text-gray-800">{{($td->loan_fd_amount) ?  $td->loan_fd_amount : '0' }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex bg-white p-1 rounded">
            <div id='transactiondetailList'></div>
        </div>

</div>

<script>
    var transaction_id = "<?php echo $id ?>";
 </script>

{{-- <script>
    //  var member_id = "<?php echo $id ?>";
</script> --}}

@endsection

@extends('layouts.layout')

@section('content')

<div class="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
    <div class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div class="d-flex align-items-center flex-wrap mr-2">
            <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">{{ (@$pagetitle) ? $pagetitle : 'Static' }}</h5>
        </div>
            <input type="hidden" value="{{ $customer }}" name="accountno" id="accountNo">
            <input type ="hidden" value="{{$rateofint}}" name="rateofint" id="rateogInt">
        <button class="addyojna btn btn-primary font-weight-bolder btn-sm justify-end">Add Yojna</button>
    </div>
</div>

<div class="bg-white p-1 rounded">
    <div id='yojnaList'></div>
</div>



<div id="addYojnaModal" style="display:none;">
    <form id="addYojnaForm">
    </form>
</div>

<div id="customerTransactionBachatModal" style="display:none;">
    <form id="customertransactionform">
    {{-- <!-- <input type="hidden" value="{{$customer}}" id ="customerdata">
     <input type="hidden" value="{{$id}}" name="id"> --> --}}
    </form>
</div>

<div id="customerTransactionLoanModal" style="display:none;">
    <form id="customertransactionloanform">
    </form>
</div>

<div id="customerFdModal" style="display:none;">
    <form id="customerFdform">
    </form>
</div>

<div id="vyavaharModal" style="display:none;">
    <form id="vyavaharForm"></form>
</div>

<div id="transactiondetailModal" style="display:none;">
    <div id="transactiondetailList"></div>
</div>

<script>
    var member_id = "<?php echo $customerId ?>";
</script>

@endsection

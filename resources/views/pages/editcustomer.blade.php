@extends('layouts.layout')

@section('content')

<div class="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
    <div class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div class="d-flex align-items-center flex-wrap mr-2">
            <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">{{ (@$pagetitle) ? $pagetitle : 'Static' }}</h5>
        </div>
        {{-- <a href="{{ route('customer.index') }}" class="addCustomer btn btn-primary font-weight-bolder btn-sm justify-end">Edit Customer</a> --}}
    </div>
</div>

<div class="bg-white w-full h-full rounded p-6">
    <div id="editcustomerModal">
        <form id="editCustomerForm">
        <input type="hidden" value="{{$customer}}" id ="customerdata">
        <input type="hidden" value="{{$member}}" id ="memberdata">
        <input type="hidden" value="{{$id}}" name="id">
        </form>
    </div>
</div>


@endsection

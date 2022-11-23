@extends('layouts.layout')

@section('content')

<div class="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
    <div class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div class="d-flex align-items-center flex-wrap mr-2">
            <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">{{ (@$pagetitle) ? $pagetitle : 'Static' }}</h5>
        </div>
        <button class="vyaj-ganatri btn btn-primary font-weight-bolder btn-sm justify-end">vyaj-ganatri</button>
    </div>
</div>

<div id='vyajGanatriList'></div>

<div id="vyajGanatriModal" style="display:none;">
    <form id="vyajGanatriForm">
    </form>
</div>

@endsection
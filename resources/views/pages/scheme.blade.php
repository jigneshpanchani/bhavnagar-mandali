@extends('layouts.layout')

@section('content')

<div class="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
    <div class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div class="d-flex align-items-center flex-wrap mr-2">
            <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">{{ (@$pagetitle) ? $pagetitle : 'Static' }}</h5>
        </div>
        <button class="addscheme btn btn-primary font-weight-bolder btn-sm justify-end">Add Scheme</button>
    </div>
</div>

<div class="bg-white p-1 rounded">
    <div id='schemeList'></div>
</div>

<div id="addSchemeModal" style="display:none">
    <form id="addSchemeForm">
    </form>
</div>

<div id="editSchemeModal" style="display:none">
    <form id="editSchemeForm">
    </form>
</div>

<div id="deleteSchemenModal" style="display: none"></div>

<script type="text/javascript">
    var login_id = "{{ $login_id }}";
</script>

@endsection

@extends('layouts.layout')

@section('content')

<div class="subheader py-2 py-lg-4 subheader-solid" id="kt_subheader">
    <div class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
        <div class="d-flex align-items-center flex-wrap mr-2">
            <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">{{ (@$pagetitle) ? $pagetitle : 'Static' }}</h5>
        </div>
        <button class="adddivision btn btn-primary font-weight-bolder btn-sm justify-end">Add Division</button>
    </div>
</div>

<div class="bg-white p-1 rounded">
    <div id='divisionList'></div>
</div>

<div id="addDivisionModal" style="display:none;">
    <form id="addDivisionForm">
    </form>
</div>

<div id="editDivisionModal" style="display:none">
    <form id="editDivisionForm">
    </form>
</div>

<div id="deleteDivisionModal" style="display:none"></div>

<script type="text/javascript">
    var login_id = "{{ $login_id }}";
</script>

@endsection


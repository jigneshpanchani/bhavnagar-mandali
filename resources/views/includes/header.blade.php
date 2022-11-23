   <!--begin::Head-->
   <head>
    <base href="">
    <meta charset="utf-8" />
    <title>BhavnagarMandali | {{ (@$pagetitle) ? $pagetitle : 'Static' }} </title>
    <meta name="description" content="Metronic admin dashboard live demo. Check out all the features of the admin panel. A large number of settings, additional services and widgets." />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    {{-- <link rel="canonical" href="https://keenthemes.com/metronic" /> --}}
    <!--begin::Fonts-->
    <link rel="stylesheet" href="{{ ('https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700') }}" />
    <!--end::Fonts-->

    <!--begin::Global Theme Styles(used by all pages)-->
    <link href="{{ asset('common/css/plugin/tailwind.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/plugins/global/plugins.bundle.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/style.bundle.css')}}" rel="stylesheet" type="text/css" />
    <!--end::Global Theme Styles-->

    <!--begin::Layout Themes(used by all pages)-->
    <link href="{{ asset('assets/css/themes/layout/header/base/light.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/themes/layout/header/menu/light.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/themes/layout/brand/dark.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('assets/css/themes/layout/aside/dark.css')}}" rel="stylesheet" type="text/css" />

    <link href="{{ asset('common/css/plugin/kendo.common.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('common/css/plugin/kendo.default-v2.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('common/css/plugin/newdesigntailwind.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{ asset('common/css/common.css')}}" rel="stylesheet" type="text/css" />
    <script>
        var site_url = "{{ url('/') }}/";
    </script>
    <!--end::Layout Themes-->
    <link rel="shortcut icon" href="{{ asset('assets/media/logos/favicon.ico') }}" />

    @if (!empty($css))
            @foreach ($css as $value)
                @if(!empty($value))
                    <link rel="stylesheet" href="{{ asset('common/css/custom/'.$value) }}">
                @endif
            @endforeach
		@endif


		@if (!empty($plugincss))
			@foreach ($plugincss as $value)
				@if(!empty($value))
					<link rel="stylesheet" href="{{ asset('common/css/plugin/'.$value) }}">
				@endif
			@endforeach
		@endif
 </head>
 <!--end::Head-->

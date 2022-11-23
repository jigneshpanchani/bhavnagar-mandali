<script>var HOST_URL = "https://preview.keenthemes.com/metronic/theme/html/tools/preview";</script>
      <!--begin::Global Config(global config for global JS scripts)-->
      <script>var KTAppSettings = { "breakpoints": { "sm": 576, "md": 768, "lg": 992, "xl": 1200, "xxl": 1400 }, "colors": { "theme": { "base": { "white": "#ffffff", "primary": "#3699FF", "secondary": "#E5EAEE", "success": "#1BC5BD", "info": "#8950FC", "warning": "#FFA800", "danger": "#F64E60", "light": "#E4E6EF", "dark": "#181C32" }, "light": { "white": "#ffffff", "primary": "#E1F0FF", "secondary": "#EBEDF3", "success": "#C9F7F5", "info": "#EEE5FF", "warning": "#FFF4DE", "danger": "#FFE2E5", "light": "#F3F6F9", "dark": "#D6D6E0" }, "inverse": { "white": "#ffffff", "primary": "#ffffff", "secondary": "#3F4254", "success": "#ffffff", "info": "#ffffff", "warning": "#ffffff", "danger": "#ffffff", "light": "#464E5F", "dark": "#ffffff" } }, "gray": { "gray-100": "#F3F6F9", "gray-200": "#EBEDF3", "gray-300": "#E4E6EF", "gray-400": "#D1D3E0", "gray-500": "#B5B5C3", "gray-600": "#7E8299", "gray-700": "#5E6278", "gray-800": "#3F4254", "gray-900": "#181C32" } }, "font-family": "Poppins" };</script>
      <!--end::Global Config-->
      <!--begin::Global Theme Bundle(used by all pages)-->
      <script src="{{ asset('assets/plugins/global/plugins.bundle.js')}}"></script>
      <script src="{{ asset('assets/js/scripts.bundle.js')}}"></script>
      <!--end::Global Theme Bundle-->

      <script src="{{ asset('assets/js/pages/widgets.js')}}"></script>

      <script src="{{ asset('common/js/commonfunction.js')}}"></script>
      <script src="{{ asset('common/js/plugin/ckeditor.js')}}"></script>
      <script src="{{ asset('common/js/plugin/jquery-2.2.3.min.js')}}"></script>
      <script src="{{ asset('common/js/plugin/jszip.min.js')}}"></script>
      <script src="{{ asset('common/js/plugin/kendo.all.min.js')}}"></script>

        @if (!empty($pluginjs))
            @foreach ($pluginjs as $value)
                <script src="{{ asset('common/js/plugin/'.$value) }}" type="text/javascript"></script>
            @endforeach
        @endif

        @if (!empty($js))
            @foreach ($js as $value)
                <script src="{{ asset('common/js/custom/'.$value) }}" type="text/javascript"></script>
            @endforeach
        @endif


        <span id="notification" style="display:none;"></span>

        <script id="errorTemplate" type="text/x-kendo-template">
            <div class="inline-flex space-x-3 items-center justify-start w-96 p-4 bg-red-50 border rounded-md border-gray-200"><span class="k-icon k-i-close-circle" style="color: rgb(153,27,27);"></span>
                <div class="flex space-x-3 items-center justify-start flex-1">
                    <span class="flex-1 text-sm font-medium leading-tight text-red-800">#= message #</span>
                    <div class="flex items-center justify-end w-8 h-full pl-1.5">
                        <div class="flex items-center justify-center p-1.5 bg-red-50 rounded-md">
                            <span class="k-icon k-i-close" style="color: rgb(153,27,27);"></span>
                        </div>
                    </div>
                </div>
            </div>
        </script>

        <script id="successTemplate" type="text/x-kendo-template">
            <div class="inline-flex space-x-3 items-center justify-start w-96 p-4 bg-green-50 border rounded-md border-gray-200">
                <img src="{{ asset('assets/success.png') }}" class=" " alt=" ">
                <div class="flex space-x-3 items-center justify-start flex-1">
                    <span class="flex-1 text-sm font-medium leading-tight text-green-800">#= message #</span>
                    <div class="flex items-center justify-end w-8 h-full pl-1.5">
                        <div class="flex items-center justify-center p-1.5 bg-green-50 rounded-md">
                            <img src="{{ asset('assets/close.png') }}" class=" " alt=" ">
                        </div>
                    </div>
                </div>
            </div>
        </script>

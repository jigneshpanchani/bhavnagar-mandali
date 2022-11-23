<?php

namespace App\Traits;

use Illuminate\Http\Request;
use App\Http\Controllers\api;

trait ResponseTrait {

    public function successResponse(?string $message, ?string $dataType, $data = null, int $code = 200): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status'  => 'success',
            'message' => ($message),
            $dataType => $data,
        ], $code);
    }

    public function errorResponse(string $message, ?string $dataType, $data = null, int $code = 400): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status'  => 'error',
            'message' => ($message),
            $dataType => $data,
        ], $code);
    }


}

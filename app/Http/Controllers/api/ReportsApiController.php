<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repository\Repository;
use App\Traits\ResponseTrait;
use App\Models\TransactionDetails;

class ReportsApiController extends Controller
{
    use ResponseTrait;

    public function __construct(
        TransactionDetails    $reportsModal
    ){
        $this->reportsModal  = new Repository($reportsModal);
    }

    public function getReportsData(Request $request)
    {
        $data['data'] = $this->reportsModal->getreportsData($request);
        $data['total'] = $this->reportsModal->getreportsData($request, true);
        return $this->successResponse('Data found successfully', 'data', $data);
    }

    public function getLoanTransactionData(Request $request)
    {
        $data['data'] = $this->reportsModal->getLoanTransactionData($request);
        $data['total'] = $this->reportsModal->getLoanTransactionData($request, true);
        return $this->successResponse('Data found successfully', 'data', $data);
    }

    public function getVyajShowData(Request $request)
    {
        $data['data'] = $this->reportsModal->getVyajShowData($request);
        $data['total'] = $this->reportsModal->getVyajShowData($request, true);
        return $this->successResponse('Data found successfully', 'data', $data);
    }
}

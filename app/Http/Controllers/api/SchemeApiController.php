<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Scheme;
use App\Traits\ResponseTrait;
use App\Repository\Repository;

class SchemeApiController extends Controller
{
    use ResponseTrait;

    public function __construct(Scheme $schemeModel){
         $this->schemeModel = new Repository($schemeModel);
    }

    public function getSchemeData(Request $request)
    {
        $data['data'] = $this->schemeModel->getSchemeData($request);
        $data['total'] = $this->schemeModel->getSchemeData($request, true);
        return $this->successResponse('Data found successfully','data', $data);
    }

    public function ajaxAction(Request $request) {

        $action = $request->input('action');
        $data = $request->input('data');

        switch ($action) {
            case 'save_scheme':
                $this->saveScheme($data);
                break;
        }
        exit;
    }

    public function saveScheme($data){


        if(isset($data['id'])){
            $editScheme = $this->schemeModel->update($data, $data['id']);
            $result = ['status'=>'success', 'message'=>'Scheme Updated Sucessfully'];
        }else{
            $createScheme = $this->schemeModel->create($data);
            $result = ['status'=>'success', 'message'=>'Scheme Created Sucessfully'];
        }
        echo json_encode($result);exit;
    }

    public function getSchemeDetails(Request $request){
        $fields = ['name'];
        $data = $this->schemeModel->getWhere(['id' => $request->id], $fields)->first();
        return $this->successResponse('Data found successfully','data',$data);
    }

    public function removeScheme(Request $request){

        $data = $this->schemeModel->delete($request->id);
        return $this->successResponse('Data found successfully','data',$data);
    }

    public function getSchemeName(Request $request)
    {
        $data =  $this->schemeModel->selectdata(['id as Id','name as Name'])->get()->toArray();
        // print_r($data); exit;
        return $this->successResponse('Data found successfully','data',$data);
    }
}

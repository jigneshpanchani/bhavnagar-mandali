<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SubScheme;
use App\Traits\ResponseTrait;
use App\Repository\Repository;
use BD;

class SubSchemeApiController extends Controller
{
    use ResponseTrait;

    public function __construct(
        SubScheme      $subSchemeModel
    ){
         $this->subSchemeModel   =new Repository($subSchemeModel);
    }

    public function getSubSchemeData(Request $request)
    {
        $data['data'] = $this->subSchemeModel->getSubSchemeData($request);
        $data['total'] = $this->subSchemeModel->getSubSchemeData($request, true);
        return $this->successResponse('Data found successfully','data', $data);
    }

    public function ajaxAction(Request $request) {

        $action = $request->input('action');
        $data = $request->input('data');

        switch ($action) {
            case 'save_sub_scheme':
                $this->saveSubScheme($data);
                break;
            case 'get_rat_of_int':
                print_r($data); exit;
        }
        exit;

    }

    public function saveSubScheme($data){


        if(isset($data['id'])){
            $result = $this->subSchemeModel->update($data, $data['id']);
            $result = ['status'=>'success', 'message'=>'Sub-Scheme Updated Sucessfully'];
        }else{
            $result = $this->subSchemeModel->create($data);
            $result = ['status'=>'success', 'message'=>'Sub-Scheme Created Sucessfully'];
        }
        echo json_encode($result);exit;
    }

    public function getSubSchemeDetails(Request $request){
        // $fields = ['scheme_id'];
        $fields = ['name','rate_of_int'];
        $data = $this->subSchemeModel->getWhere(['id' => $request->id], $fields)->first();
        // print_r($data);exit;
        return $this->successResponse('Data found successfully','data',$data);
    }

     public function getSubSchemeName(Request $request)
    {

        // $fields = ['id as Id','name as Name'];
        // $data = $this->subSchemeModel->getwhere(['scheme_id' => $request->input('id')],$fields)->get()->toArray();

        $data = $this->subSchemeModel->getData(['scheme_id' => $request->input('id')],['id as Id','name as Name','rate_of_int'])->get()->toArray();
        // print_r($data); exit;
        // $data =  $this->subSchemeModel->selectdata(['id as Id','name as Name'])->get()->toArray();

        return $this->successResponse('Data found successfully','data',$data);
    }

    public function removeSubScheme(Request $request){
        $data = $this->subSchemeModel->delete($request->id);
        return $this->successResponse('Data found successfully','data',$data);
    }


}

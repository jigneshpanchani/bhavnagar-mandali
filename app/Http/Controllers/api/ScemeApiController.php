<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sceme;
use App\Traits\ResponseTrait;
use App\Repository\Repository;

class ScemeApiController extends Controller
{
    use ResponseTrait;

    public function __construct(
        Sceme      $scemeModel
    ){
         $this->scemeModel   =new Repository($scemeModel);
    }

    public function getScemeData(Request $request)
    {
        $data['data'] = $this->scemeModel->getScemeData($request);
        $data['total'] = $this->scemeModel->getScemeData($request, true);
        return $this->successResponse('Data found successfully','data', $data);
    }

    public function ajaxAction(Request $request) {

        $action = $request->input('action');
        $data = $request->input('data');

        switch ($action) {
            case 'save_sceme':
                $this->saveSceme($data);
                break;
        }
        exit;
    }

    public function saveSceme($data){

        
        if(isset($data['id'])){
            $editSceme = $this->scemeModel->update($data, $data['id']);
            $result = ['status'=>'success', 'message'=>'Sceme Updated Sucessfully'];
        }else{
            $createSceme = $this->scemeModel->create($data);
            $result = ['status'=>'success', 'message'=>'Sceme Created Sucessfully'];
        }
        echo json_encode($result);exit;
    }

    public function getScemeDetails(Request $request){
        $fields = ['name'];
        $data = $this->scemeModel->getWhere(['id' => $request->id], $fields)->first();
        return $this->successResponse('Data found successfully','data',$data);
    }

    public function removeSceme(Request $request){
        
        $data = $this->scemeModel->delete($request->id);
        return $this->successResponse('Data found successfully','data',$data);
    }

    public function getScemeName(Request $request)
    {
        $data =  $this->scemeModel->selectdata(['id as Id','name as Name'])->get()->toArray();
        // print_r($data); exit;
        return $this->successResponse('Data found successfully','data',$data);
    }
}

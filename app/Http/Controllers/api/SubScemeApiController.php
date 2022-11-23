<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SubSceme;
use App\Traits\ResponseTrait;
use App\Repository\Repository;
use BD; 

class SubScemeApiController extends Controller
{
    use ResponseTrait;

    public function __construct(
        SubSceme      $subScemeModel
    ){
         $this->subScemeModel   =new Repository($subScemeModel);
    }

    public function getSubScemeData(Request $request)
    {
        $data['data'] = $this->subScemeModel->getSubScemeData($request);
        $data['total'] = $this->subScemeModel->getSubScemeData($request, true);
        return $this->successResponse('Data found successfully','data', $data);
    }

    public function ajaxAction(Request $request) {

        $action = $request->input('action');
        $data = $request->input('data');

        switch ($action) {
            case 'save_sub_sceme':
                $this->saveSubSceme($data);
                break;
            case 'get_rat_of_int':
                print_r($data); exit;    
        }
        exit;

    }

    public function saveSubSceme($data){

        
        if(isset($data['id'])){
            $result = $this->subScemeModel->update($data, $data['id']);
            $result = ['status'=>'success', 'message'=>'Sub-Sceme Updated Sucessfully'];
        }else{
            $result = $this->subScemeModel->create($data);
            $result = ['status'=>'success', 'message'=>'Sub-Sceme Created Sucessfully'];
        }
        echo json_encode($result);exit;
    }

    public function getSubScemeDetails(Request $request){
        // $fields = ['sceme_id'];
        $fields = ['name','rate_of_int'];
        $data = $this->subScemeModel->getWhere(['id' => $request->id], $fields)->first();
        // print_r($data);exit;
        return $this->successResponse('Data found successfully','data',$data);
    }

     public function getSubScemeName(Request $request)
    {
        
        // $fields = ['id as Id','name as Name'];
        // $data = $this->subScemeModel->getwhere(['sceme_id' => $request->input('id')],$fields)->get()->toArray();
        
        $data = $this->subScemeModel->getData(['sceme_id' => $request->input('id')],['id as Id','name as Name','rate_of_int'])->get()->toArray();
        // print_r($data); exit;
        // $data =  $this->subScemeModel->selectdata(['id as Id','name as Name'])->get()->toArray();
        
        return $this->successResponse('Data found successfully','data',$data);
    }

    public function removeSubSceme(Request $request){
        $data = $this->subScemeModel->delete($request->id);
        return $this->successResponse('Data found successfully','data',$data);
    }


}

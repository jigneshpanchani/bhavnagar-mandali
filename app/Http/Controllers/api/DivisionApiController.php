<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repository\Repository;
use App\Models\Division;
use App\Traits\ResponseTrait;

class DivisionApiController extends Controller
{
    use ResponseTrait;

    public function __construct(
        Division      $divisionModal
    ){
         $this->divisionModal   =new Repository($divisionModal);
    }

    public function getDivisionData(Request $request)
    {
        $data['data'] = $this->divisionModal->getDivisionData($request);
        $data['total'] = $this->divisionModal->getDivisionData($request, true);
         return $this->successResponse('Data found successfully','data', $data);
    }

    public function ajaxAction(Request $request) {

        $action = $request->input('action');
        $data = $request->input('data');

        switch ($action) {
            case 'save_division':
                $this->saveDivision($data);
                break;
        }
        exit;
    }
    
    public function saveDivision($data){

        
        if(isset($data['id'])){
            $editDivision = $this->divisionModal->update($data, $data['id']);
            $result = ['status'=>'success', 'message'=>'Division Updated Sucessfully'];
        }
        else{
            $createDivision = $this->divisionModal->create($data);
            $result = ['status'=>'success', 'message'=>'Division Created Sucessfully'];
        }
        echo json_encode($result);exit;
    }

    public function getDivisionDetails(Request $request){
        $fields = ['name'];
        $data = $this->divisionModal->getWhere(['id' => $request->id], $fields)->first();
        return $this->successResponse('Data found successfully','data',$data);
    }

    public function removeDivision(Request $request){
        
        $data = $this->divisionModal->delete($request->id);
        return $this->successResponse('Data found successfully','data',$data);
    }

    public function getDivisonName(Request $request)
    {
        $data = $this->divisionModal->selectdata(['id as Id','name as Name'])->get()->toArray();
        return $this->successResponse('Data found successfully','data',$data);
    }


    
}

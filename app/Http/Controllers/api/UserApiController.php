<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repository\Repository;
use App\Models\User;
use App\Traits\ResponseTrait;
use App\Traits;
use Illuminate\Support\Facades\DB;


class UserApiController extends Controller
{
    use ResponseTrait;
    
    public function __construct(
        User      $userModel
    ){
         $this->userModel   =new Repository($userModel);
    }

    public function getUserData(Request $request)
    {
        $data['data'] = $this->userModel->getUserData($request);
        $data['total'] = $this->userModel->getUserData($request, true);
        return $this->successResponse('Data found successfully','data', $data);
    }

    public function ajaxAction(Request $request) {

        $action = $request->input('action');
        $data = $request->input('data');

        switch ($action) {
            case 'save_user':
                $this->saveUser($data,$request);
                break;
        }
        exit;
    }

    public function saveUser($data){

        // $data['password'] = md5($data['password']);

        $user = User::where('email', $data['email'])->first();
       
        if(isset($data['id'])){
            $editUSer = $this->userModel->update($data, $data['id']);
            $result = ['status'=>'success', 'message'=>'User Updated Sucessfully'];
        }else{
            if(empty($user)){
                $createUser = $this->userModel->create($data);
                $result = ['status'=>'success', 'message'=>'User Created Sucessfully'];
            } else {
                $result = ['status'=>'error', 'message'=>'User allready exist'];
            }
           
        }
        echo json_encode($result);exit;
    }

    public function getUserDetails(Request $request){
        $fields = ['name','email'];
        $data = $this->userModel->getWhere(['id' => $request->id], $fields)->first();
        return $this->successResponse('Data found successfully','data',$data);
    } 

    public function removeUser(Request $request){
        
        $data = $this->userModel->delete($request->id);
        return $this->successResponse('Data delete successfully','data',$data);
    }

   
    
    
}

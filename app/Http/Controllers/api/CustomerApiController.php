<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\TransactionDetails;
use App\Models\vyavahar;
use App\Models\SubScheme;
use App\Repository\Repository;
use App\Traits\ResponseTrait;
use DB;
use Illuminate\Support\Facades\DB as FacadesDB;

//use Illuminate\Support\Facades\DB as FacadesDB;

class CustomerApiController extends Controller
{
    use ResponseTrait;

    public function __construct(
        Customer                  $customerModal,
        TransactionDetails        $transactionDetailsModal,
        SubScheme                 $subSchemeModal,
        vyavahar                  $vyavaharModal
    ){
         $this->customerModal            = new Repository($customerModal);
         $this->transactionDetailsModal  = new Repository($transactionDetailsModal);
         $this->subSchemeModal           = new Repository($subSchemeModal);
         $this->vyavaharModal                     = new Repository($vyavaharModal);
    }

    public function getCustomerData(Request $request){

        $data['data'] = $this->customerModal->getCustomerData($request);
        $data['total'] = $this->customerModal->getCustomerData($request, true);
        return $this->successResponse('Data found successfully','data', $data);
    }

    public function getCustomerDetails(Request $request){
        $data = $this->customerModal->getwhereData(['id' => $request->id])->first();
        $data = $this->transactionDetailsModal->getwhereData(['id' => $request->id])->first();
        return $this->successResponse('Data found successfully','data', $data);
    }

    public function getCustomerName(Request $request){
         $data = $this->customerModal->selectdata(['id as Id',DB::raw("CONCAT(first_name,'  ',last_name) as Name")])->get()->toArray();
         return $this->successResponse('Data found successfully','data',$data);
    }

    public function removeCustomer(Request $request){
        $data = $this->customerModal->delete($request->id);
        return $this->successResponse('Data deleted successfully','data',$data);
    }

    public function getTotalCustomerAccount(Request $request){
        $totalCustomerCount = TransactionDetails::where('sub_scheme_id', $request->sub_scheme_id)->get()->count();
        return $this->successResponse('Data found successfully','data', $totalCustomerCount);
    }

    public function ajaxAction(Request $request) {

        $action = $request->input('action');
        $data = $request->input('data');

        switch ($action) {
            case 'save_customer':
                $this->saveCustomer($data);
                break;
            case 'updateStatus':

                $this->customerModal->update($data,$data['id']);
                // if(isset($data['payment_receiver_name']) && isset($data['check_number']) && isset($data['payment_type'])){
                //     $this->transactionDetailsModal->update($data,$data['id']);
                // }
                $result = ['status'=>'success', 'message'=>'Customer ' .$data["status"]. ' Sucessfully'];
                echo json_encode($result);exit;
                break;
            case 'total_vyaj_calculation':
                $this->totalVyajCalculation($data);
                break;

        }

    }

    public function saveCustomer($data){

        $getSubScheme = SubScheme::where('name','Sabhasad')->first();

        $data['DOB'] = date('Y-m-d', strtotime($data['DOB']));
        $data['joining_date'] = date('Y-m-d', strtotime($data['joining_date']));
        $data['retirement_date'] = date('Y-m-d', strtotime($data['retirement_date']));
        $data['nominee_DOB'] = date('Y-m-d', strtotime($data['nominee_DOB']));

        if(isset($data['id'])){
            $data = $this->customerModal->update($data, $data['id']);
            $result = ['status'=>'success', 'message'=>'Customer Updated Sucessfully'];
        }
        else{
            $createCustomer = $this->customerModal->create($data);
            $result = ['status'=>'success', 'message'=>'Customer Created Sucessfully'];

            $last_record = TransactionDetails::orderBy('id', 'desc')->first();

            if(isset($last_record) && !empty($last_record)){
                $id = $last_record->ananya_no;
                $id++;
                if(mb_strlen($id) == 1){
                    $zero_string = '0000';
                }elseif(mb_strlen($id) == 2){
                    $zero_string = '000';
                }elseif(mb_strlen($id) == 3){
                    $zero_string = '00';
                }
                $ananya_no = $zero_string.$id;
            } else{
                $ananya_no = "00001";
            }


            if(isset($last_record) && !empty($last_record)){
                $id = $last_record->account_no;
                $id++;
                if(mb_strlen($id) == 1){
                    $zero_string = '0000';
                }elseif(mb_strlen($id) == 2){
                    $zero_string = '000';
                }elseif(mb_strlen($id) == 3){
                    $zero_string = '00';
                }
                $account_no = $zero_string.$id;
            } else{
                $account_no = "00001";
            }


            /*Transaction Array*/
            $transationArray['ananya_no'] = $ananya_no;
            $transationArray['account_no'] = $account_no;
            $transationArray['member_id'] = $createCustomer->id;
            $transationArray['sub_scheme_id'] = $getSubScheme->id;
            $transationArray['intrest_rate'] = $getSubScheme->rate_of_int;
            $transationArray['start_date'] = date('Y-m-d',strtotime($createCustomer->joining_date));
            $transationArray['maturity_date'] = date('Y-m-d',strtotime($createCustomer->joining_date. ' + 30 years'));
            $transationArray['loan_fd_amount'] = 0;
            $transationArray['installment_amount'] = 0;
            $transationArray['current_due'] = 0;
            $transationArray['current_balance'] = 500;
            $transationArray['current_intrest_due'] = 0;
            $transationArray['current_pending_due'] = 0;
            $transationArray['current_oc_due'] = 0;
            $transationArray['opening_balance'] = 0;
            $transationArray['closed'] = 0;

            $data = $this->transactionDetailsModal->create($transationArray);
            $result = ['status'=>'success', 'message'=>'Customer Created Sucessfully'];
        }
        echo json_encode($result);exit;
    }

    public function totalVyajCalculation($data){

        $totalCustomerCount = TransactionDetails::where('sub_scheme_id', $data['sub_scheme_id'])->get();

        for ($i=0;$i<count($totalCustomerCount->toArray()); $i++) {

            $rate = $totalCustomerCount[$i]['intrest_rate'];
            $emi = $totalCustomerCount[$i]['installment_amount'];
            $remainingAmount = $totalCustomerCount[$i]['current_pending_due'];
            $transaction_id = $totalCustomerCount[$i]['id'];

            $interestAmount = ($rate/100/12) * $remainingAmount;
            $principal = $emi - $interestAmount;
            $remainingAmount = $remainingAmount - $principal;

            $data['interest_paid'] = $interestAmount;
            $data['principal_paid'] = $principal;
            $data['remaining_amount'] = $remainingAmount;
            $data['transaction_id'] = $transaction_id;
            $data['date'] =  date('Y-m-d', strtotime(date('Y-m-d')));
            $data['pay_through'] = 'Cash';
            $data['pay_receive'] = 'Pay';
            $data['amount'] = $totalCustomerCount[$i]['installment_amount'];
            $saveVyavhar = $this->vyavaharModal->create($data);

            if($saveVyavhar){
                $updateData['current_pending_due'] = $remainingAmount;
                // $updateData['current_balance'] = $amount;
                // $updateData['opening_balance'] = $amount;
                $updateBalance = $this->transactionDetailsModal->update($updateData, $transaction_id);
            }

        }
        $result = ['status'=>'success', 'message'=>'Customer Created Sucessfully'];
        echo json_encode($result);exit;

    }



}


        //old
        // $startDate = date('Y-m-d', strtotime($data['start_date']));
        // $endDate = date('Y-m-d', strtotime($data['end_date']));

        // $calculateTotalVyaj =  vyavahar::from('vyavahar as v')
        //                                 ->join('transaction_detail as td', 'td.id', '=' , 'v.transaction_id')
        //                                 ->where('td.sub_scheme_id', $data['sub_scheme_id'])
        //                                 ->whereBetween('v.date',  [$startDate, $endDate])
        //                                 ->sum('v.interest_paid');
                                        // ->get()->toArray();

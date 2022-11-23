<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Repository\Repository;
use Illuminate\Http\Request;
use App\Models\CustomerTransaction;
use App\Models\TransactionDetails;
use App\Models\LoanSecurity;
use App\Models\vyavahar;
use App\Traits\ResponseTrait;

class CustomerTransactionApiController extends Controller
{
    use ResponseTrait;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct(

        TransactionDetails    $customertransactionModal,
        LoanSecurity          $customerLoanSecurityModal,
        vyavahar              $vyavaharModal
        // CustomerTransaction   $customertransactionloanModal 

    ) {

        $this->customertransactionModal          = new Repository($customertransactionModal);
        $this->customerLoanSecurityModal         = new Repository($customerLoanSecurityModal);
        $this->vyavaharModal                     = new Repository($vyavaharModal);
        //  $this->customertransactionloanModal   = new Repository($customertransactionloanModal);

    }

    public function getTransactionData(Request $request)
    {
        $data['data'] = $this->customertransactionModal->gettransactionData($request);
        $data['total'] = $this->customertransactionModal->gettransactionData($request, true);
        return $this->successResponse('Data found successfully', 'data', $data);
    }

    public function getCustomertransactionloanData(Request $request)
    {
        $data['data'] = $this->customertransactionModal->getCustomertransactionloanData($request);
        $data['total'] = $this->customertransactionModal->getCustomertransactionloanData($request, true);
        return $this->successResponse('Data found successfully', 'data', $data);
    }

    public function getVyavaharData(Request $request)
    {
        $data['data'] = $this->vyavaharModal->getVyavaharData($request);
        $data['total'] = $this->vyavaharModal->getVyavaharData($request, true);
        return $this->successResponse('Data found successfully', 'data', $data);
    }

    public function ajaxAction(Request $request)
    {

        $action = $request->input('action');
        $data = $request->input('data');

        if (isset($data['member_id'])) {
            $getData = TransactionDetails::where('member_id', $data['member_id'])->where('sub_sceme_id', 6)->first();
            $last_record = TransactionDetails::select('ananya_no')->orderBy('id', 'desc')->first();

            if (isset($last_record) && !empty($last_record)) {
                $id = $last_record->ananya_no;
                $id++;
                if (mb_strlen($id) == 1) {
                    $zero_string = '0000';
                } elseif (mb_strlen($id) == 2) {
                    $zero_string = '000';
                } elseif (mb_strlen($id) == 3) {
                    $zero_string = '00';
                }
                $ananya_no = $zero_string . $id;
            } else {
                $ananya_no = "00001";
            }

            if (isset($getData) && !empty($getData)) {
                $id = $getData->account_no;
                $id++;
                if (mb_strlen($id) == 1) {
                    $zero_string = '0000';
                } elseif (mb_strlen($id) == 2) {
                    $zero_string = '000';
                } elseif (mb_strlen($id) == 3) {
                    $zero_string = '00';
                }
                $account_no = $zero_string . $id;
            } else {
                $account_no = "00001";
            }
        }

        switch ($action) {

            case 'save_customertransaction':
                $this->SaveCustomertransaction($data, $ananya_no, $account_no);
                break;
            case 'Save_customertransactionloan':
                $this->SaveCustomertransactionloan($data, $ananya_no, $account_no);
                break;
            case 'Save_vyavahar':
                $this->SaveVyavahar($data);
                break;
            case 'save_fd':
                $this->SaveFd($data, $ananya_no, $account_no);
                break;    

        }
    }

    public function SaveFd($data, $ananya_no, $account_no)
    {
        $data['ananya_no'] = $ananya_no;
        $data['account_no'] = $account_no;
        $data['start_date'] = date('Y-m-d', strtotime($data['start_date']));
        $data['maturity_date'] = date('Y-m-d', strtotime($data['maturity_date']));
        $data['loan_fd_amount'] = $data['loan_fd_amount'];
        $data['intrest_amount'] = 0;
        $data['installment_amount'] = 0;
        $data['current_due'] = 0;
        $data['current_intrest_due'] = 0;
        $data['current_pending_due'] = 0;
        $data['current_oc_due'] = 0;
        $data['opening_balance'] = 0;
        $data['closed'] = 0;
        $data['current_balance'] = 0;
        $data = $this->customertransactionModal->create($data);
    }

    public function SaveVyavahar($data)
    {
        //dd($data); exit();
        $getTrans = TransactionDetails::where('id',$data['transaction_id'])->first();
        $updateVyavhar = $this->updateVyavhar($getTrans,$data);
        if($updateVyavhar){
            $data['date'] = date('Y-m-d', strtotime($data['date']));
            if($data['pay_receive'] == 'Pay'){
                $rate = $getTrans->intrest_rate;
                $emi = $data['amount'];
                $remainingAmount = $getTrans->current_pending_due;


                $interestAmount = ($rate/100/12) * $remainingAmount;
                $principal = $emi - $interestAmount;
                $remainingAmount = $remainingAmount - $principal;

                $data['interest_paid'] = $interestAmount;
                $data['principal_paid'] = $principal;
                $data['remaining_amount'] = $remainingAmount;
            }
            $data = $this->vyavaharModal->create($data);
             $result = ['status' => 'success', 'message' => 'vyavaharModal Created Sucessfully'];
            echo json_encode($result); exit;
        }
        
    }

    public function updateVyavhar($getTrans,$data){
        
        if($data['pay_receive'] == 'Receive'){
            if($getTrans->current_pending_due != 0){
                $loanamount = $getTrans->current_pending_due + $data['amount'];
                $amount = $getTrans->current_balance;
            } else if($getTrans->current_balance != 0){
                $amount = $getTrans->current_balance + $data['amount'];
                $loanamount = 0;
            }
        } else {
            if($getTrans->current_pending_due != 0){

                    $rate = $getTrans->intrest_rate;
                    $emi = $data['amount'];
                    $remainingAmount = $getTrans->current_pending_due;


                    $interestAmount = ($rate/100/12) * $remainingAmount;
                    $principal = $emi - $interestAmount;
                    $remainingAmount = $remainingAmount - $principal;

                   $loanamount = $getTrans->current_pending_due - $principal;
                   $amount = $getTrans->current_balance;
            } else if($getTrans->current_balance != 0){
                if($getTrans->current_balance > $data['amount']) {
                    $amount = $getTrans->current_balance - $data['amount'];
                    $loanamount = 0;
                } else {
                    return false;
                }
            }
        }
        
        $updateData['current_pending_due'] = $loanamount;
        $updateData['current_balance'] = $amount;
        $updateData['opening_balance'] = $amount;

        $updateBalance = $this->customertransactionModal->update($updateData,$data['transaction_id']);

        return True;
    }

    public function SaveCustomertransaction($data, $ananya_no, $account_no)
    {

        $data['ananya_no'] = $ananya_no;
        $data['account_no'] = $account_no;
        $data['start_date'] = date('Y-m-d', strtotime($data['start_date']));
        $data['maturity_date'] = date('Y-m-d', strtotime($data['maturity_date']));
        $data['loan_fd_amount'] = 0;
        $data['intrest_amount'] = 0;
        $data['installment_amount'] = 0;
        $data['current_due'] = 0;
        $data['current_intrest_due'] = 0;
        $data['current_pending_due'] = 0;
        $data['current_oc_due'] = 0;
        $data['opening_balance'] = $data['current_balance'];
        $data['closed'] = 0;

        $createcustomertransaction = $this->customertransactionModal->create($data);
        $result = ['status' => 'success', 'message' => 'customertransactionModal Created Sucessfully'];

        echo json_encode($result);
        exit;
    }

    public function SaveCustomertransactionloan($data, $ananya_no, $account_no)
    {
       
        $transaction['ananya_no'] = $ananya_no;
        $transaction['account_no'] = $account_no;
        $transaction['member_id'] = $data['member_id'];
        $transaction['sub_sceme_id'] = $data['sub_sceme_id'];
        $transaction['intrest_rate'] = $data['intrest_rate'];
        $transaction['loan_fd_amount'] = $data['loan_fd_amount'];
        $transaction['installment_amount'] = round($data['installment_amount']);
        $transaction['current_due'] = 0;
        $transaction['current_balance'] = 0;
        $transaction['current_intrest_due'] = 0;
        $transaction['current_pending_due'] = $data['loan_fd_amount'];
        $transaction['current_oc_due'] = 0;
        $transaction['opening_balance'] = 0;
        $transaction['closed'] = 0;
        $transaction['start_date'] = date('Y-m-d', strtotime($data['start_date']));
        $transaction['maturity_date'] = date('Y-m-d', strtotime($data['maturity_date']));

        $createcustomertransaction = $this->customertransactionModal->create($transaction);
        

        //loan security

        $loanSecurity['member_id'] = $data['member_id'];
        $loanSecurity['transaction_id'] = $createcustomertransaction->id;
        $loanSecurity['security_one_id'] = $data['surity1_name'];
        $loanSecurity['security_two_id'] = $data['surity2_name'];
        $loanSecurity['loan_duration'] = $data['loan_duration'];
        $loanSecurity['loan_purpose'] = $data['loan_purpose'];
        $loanSecurity['oprated_by'] = $data['oprated_by'];

        $createcustomerloan = $this->customerLoanSecurityModal->create($loanSecurity);
        $result = ['status' => 'success', 'message' => 'customertransactionModal Created Sucessfully'];

        echo json_encode($result); exit;
    }

    public function getCustomertransactionDetails(Request $request)
    {

        $fields = ['account_no'];
        $data = $this->customertransactionModal->getWhere(['id' => $request->id], $fields)->first();
        return $this->successResponse('Data found successfully', 'data', $data);
    }
    public function getCustomertransactionloanDetails(Request $request)
    {

        $fields = ['account_no'];
        $data = $this->customertransactionModal->getWhere(['id' => $request->id], $fields)->first();
        return $this->successResponse('Data found successfully', 'data', $data);
    }
}

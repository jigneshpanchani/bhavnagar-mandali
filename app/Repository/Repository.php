<?php
namespace App\Repository;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Division;
use App\Models\Scheme;
use App\Models\subScheme;
use App\Traits\CommonTrait;
use App\Traits\ResponseTrait;
use App\Models\Customer;
use App\Models\CustomerTransaction ;
use App\Models\TransactionDetails;
use App\Models\vyavahar;

class Repository
{
    use CommonTrait;
    use ResponseTrait;

    protected $model;
    protected $dates = ['deleted_at'];

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function create($data)
    {
        return $this->model->create($data);
    }

    public function update(array $data, $id)
    {
        $record = $this->model->find($id);
        return $record->update($data);
    }

    public function delete($id)
    {
        return $this->model->destroy($id);
    }

    public function show($id)
    {
        return $this->model->findorfail($id);
    }

    public function getUserData($request, $countOnly=false){

        // echo "hellooo"; exit;
        //  $id = $request->user()->id;
        $post = ($request->input()) ? $request->input() : [];

        $columnArr = array(
            'id',
            'name',
            'email'
        );

        $columns = array(
            'id'                => 'id',
            'name'              => 'name',
            'email'             => 'email'
        );

        $query = User::from('users')
                ->select($columnArr);

        $this->gridDataFilter($query, $post, $columns);

        $this->gridDataSorting($query, $post);

        $result = $this->gridDataPagination($query, $post, $countOnly);

        return $result;

    }

    public function getDivisionData($request, $countOnly=false){
        $post = ($request->input()) ? $request->input() : [];

        $columnArr = array(
            'division.id',
            'division.name',
            'createdby.name as createdBy',
            'updatedBy.name as updatedBy'
        );

        $query = division::from('division')
        ->leftjoin('users as createdby', 'createdby.id', '=', 'division.created_by')
        ->leftjoin('users as updatedBy', 'updatedBy.id', '=', 'division.updated_by')
                ->select($columnArr);

        $this->gridDataFilter($query, $post,array());

        $this->gridDataSorting($query, $post);

        $result = $this->gridDataPagination($query, $post, $countOnly);

        return $result;
    }


    public function getSchemeData($request, $countOnly=false){
        $post = ($request->input()) ? $request->input() : [];

        $columnArr = array(
            'scheme.id',
            'scheme.name',
            'createdby.name as createdBy',
            'updatedBy.name as updatedBy'
        );

        $query = scheme::from('scheme')
        ->leftjoin('users as createdby', 'createdby.id', '=', 'scheme.created_by')
        ->leftjoin('users as updatedBy', 'updatedBy.id', '=', 'scheme.updated_by')
                ->select($columnArr);

        $this->gridDataFilter($query, $post, array());

        $this->gridDataSorting($query, $post);

        $result = $this->gridDataPagination($query, $post, $countOnly);

        return $result;
    }

    public function getSubSchemeData($request, $countOnly=false){

        $scheme_id = $request->scheme_id;
        $post = ($request->input()) ? $request->input() : [];

        $columnArr = array(
            'sub_scheme.id',
            'scheme.name as scheme_name',
            'sub_scheme.name as sub_scheme_name',
            'rate_of_int',
            'createdby.name as createdBy',
            'updatedBy.name as updatedBy'
        );
         $query = SubScheme::from('sub_scheme')
                ->leftjoin('scheme', 'scheme.id', '=', 'sub_scheme.scheme_id')
                ->leftjoin('users as createdby', 'createdby.id', '=', 'sub_scheme.created_by')
                ->leftjoin('users as updatedBy', 'updatedBy.id', '=', 'sub_scheme.updated_by')
                ->select($columnArr);

        $this->gridDataFilter($query, $post, array());

        $this->gridDataSorting($query, $post);

        $result = $this->gridDataPagination($query, $post, $countOnly);

        return $result;
    }



    public function getCustomerData($request, $countOnly=false){
        $post = ($request->input()) ? $request->input() : [];

        $columnArr = array(
            'member_details.id',
            'member_details.first_name',
            'member_details.current_post',
            'division.name as branch_name',
            'member_details.member_nominee_name',
            'member_details.bank_name',
            'member_details.status'
        );

        $columns = array(
            'id'                      => 'id',
            'first_name'              => 'first_name',
            'current_post'            => 'current_post',
            'branch_name'             => 'branch_name',
            'member_nominee_name'     => 'member_nominee_name',
            'bank_name'               => 'bank_name',
            'status'                  => 'status'
        );

        $query = customer::from('member_details')

        ->leftjoin('division', 'division.id', '=', 'member_details.branch_name')

                ->select($columnArr);

        $this->gridDataFilter($query, $post, $columns);

        $this->gridDataSorting($query, $post);

        $result = $this->gridDataPagination($query, $post, $countOnly);

        return $result;
    }

    public function gettransactionData($request, $countOnly=false){

        // $sub_scheme_id = $request->sub_scheme_id;
        $post = ($request->input()) ? $request->input() : [];

        $columnArr = array(
            'td.id',
            'td.ananya_no',
            'td.account_no',
            'sub_scheme.name as sub_scheme_name',
            'td.start_date',
            'td.maturity_date',
            'td.intrest_rate',
            'td.loan_fd_amount',
            'td.installment_amount',
            'td.current_due',
            'td.current_balance',
            'td.current_intrest_due',
            'td.current_pending_due',
            'td.current_oc_due',
            'td.opening_balance',
            'td.closed'
        );

        $columns = array(
            'id'                    =>'id',
            'ananya_no'             =>'ananya_no',
            'account_no'            =>'account_no',
            'sub_scheme_name'        =>'sub_scheme_name',
            'start_date'            =>'start_date',
            'maturity_date'         =>'maturity_date',
            'intrest_rate'          =>'intrest_rate',
            'loan_fd_amount'        =>'loan_fd_amount',
            'installment_amount'    =>'installment_amount',
            'current_due'           =>'current_due',
            'current_balance'       =>'current_balance',
            'current_intrest_due'   =>'current_intrest_due',
            'current_pending_due'   =>'current_pending_due',
            'current_oc_due'        =>'current_oc_due',
            'opening_balance'       =>'opening_balance',
            'closed'                =>'closed'
        );

        $query = TransactionDetails::from('transaction_detail as td')
                ->leftjoin('sub_scheme', 'sub_scheme.id', '=', 'td.sub_scheme_id')
                ->where('member_id',$post['id'])
                ->select($columnArr);

        $this->gridDataFilter($query, $post, $columns);

        $this->gridDataSorting($query, $post);

        $result = $this->gridDataPagination($query, $post, $countOnly);

        return $result;
    }

    public function getwhere($filed,$value)
    {
        return $this->model->where($filed,$value);
    }

    public function getwhereData($whereArr)
    {
        return $this->model->where($whereArr);
    }

    public function selectdata( $fields='*')
    {
        $selectdata = $this->model->select($fields);
        return $selectdata;
    }

    public function getData($whereArr , $selecArr){
        return $this->model->where($whereArr)->select($selecArr);
    }

    public function getVyavaharData($request, $countOnly=false){

        // print_r($request->id); exit;
        $post = ($request->input()) ? $request->input() : [];

        $columnArr = array(
             'vyavahar.id',
             'transaction_id',
            //  'transaction_detail.id as transaction_id',
             'vyavahar.date',
             'vyavahar.pay_through',
             'vyavahar.amount',
             'vyavahar.pay_receive',
             'vyavahar.check_no',
             'vyavahar.interest_paid',
             'vyavahar.principal_paid',
             'vyavahar.remaining_amount'
        );

        $columns = array(
            'id'                        =>'id',
             'transaction_id'           =>'transaction_id',
             'date'                     =>'date',
             'pay_through'              =>'pay_through',
             'amount'                   =>'amount',
             'pay_receive'              =>'pay_receive',
             'check_no'                 =>'check_no',
             'interest_paid'            =>'interest_paid',
             'principal_paid'           =>'principal_paid',
             'remaining_amount'         =>'remaining_amount'

        );

        $query = vyavahar::from('vyavahar')
                 ->where('transaction_id',$request->id)
                // ->leftjoin('transaction_detail', 'transaction_detail.id', '=', 'vyavahar.transaction_detail_id')
                ->select($columnArr);


        $this->gridDataFilter($query, $post, $columns);

        $this->gridDataSorting($query, $post);

        $result = $this->gridDataPagination($query, $post, $countOnly);

        return $result;
    }

    public function getreportsData($request, $countOnly=false){

        $post = ($request->input()) ? $request->input() : [];

        $columnArr = array(
            'td.id',
            'td.account_no',
            'sub_scheme.name as sub_scheme_name',
            DB::raw("CONCAT(member_details.first_name,'  ',member_details.middle_name, '  ',member_details.last_name) as customer_name"),
            'td.loan_fd_amount',
            'td.current_pending_due',
        );

        $columns = array(
            'id'                    =>'id',
            'account_no'            =>'account_no',
            'sub_scheme_name'        =>'sub_scheme_name',
            'customer_name'         =>DB::raw("CONCAT(member_details.first_name,'  ',member_details.middle_name, '  ',member_details.last_name) as customer_name"),
            'loan_fd_amount'        =>'loan_fd_amount',
            'current_pending_due'   =>'current_pending_due',
        );

        $query = TransactionDetails::from('transaction_detail as td')
                ->leftjoin('sub_scheme', 'sub_scheme.id', '=', 'td.sub_scheme_id')
                ->leftjoin('member_details', 'member_details.id', '=', 'td.member_id')
                ->where('td.loan_fd_amount', '!=' , '0')
                ->where('td.current_pending_due', '!=' , '0')
                ->select($columnArr);

        $this->gridDataFilter($query, $post, $columns);

        $this->gridDataSorting($query, $post);

        $result = $this->gridDataPagination($query, $post, $countOnly);

        return $result;
    }

}

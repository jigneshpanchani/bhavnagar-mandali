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

        $post = ($request->input()) ? $request->input() : [];

        $columnArr = array(
            'users.id',
            'users.name',
            'users.email'
        );

        $columns = array(
            'id'        => 'users.id',
            'name'      => 'users.id',
            'email'     => 'users.id'
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
            'division.id as id',
            'division.name as division_name',
            'createdby.name as createdBy',
            'updatedBy.name as updatedBy'
        );

        $columns = array(
            'id'         => 'division.id as id',
            'division_name' => 'division.name as division_name',
            'createdBy'  => 'createdby.name as createdBy',
            'updatedBy'  => 'updatedBy.name as updatedBy'
        );

        $query = division::from('division')
            ->leftjoin('users as createdby', 'createdby.id', '=', 'division.created_by')
            ->leftjoin('users as updatedBy', 'updatedBy.id', '=', 'division.updated_by')
            ->select($columnArr);

        $this->gridDataFilter($query, $post, $columns);

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

        $columns = array(
            'id'         => 'scheme.id as id',
            'name'       => 'scheme.name as name',
            'createdBy'  => 'createdby.name as createdBy',
            'updatedBy'  => 'updatedBy.name as updatedBy'
        );

        $query = scheme::from('scheme')
            ->leftjoin('users as createdby', 'createdby.id', '=', 'scheme.created_by')
            ->leftjoin('users as updatedBy', 'updatedBy.id', '=', 'scheme.updated_by')
            ->select($columnArr);

        $this->gridDataFilter($query, $post, $columns);

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

        $columns = array(
            'id'                => 'sub_scheme.id as id',
            'scheme_name'       => 'scheme.name as scheme_name',
            'sub_scheme_name'   => 'sub_scheme.name as sub_scheme_name',
            'rate_of_int'       => 'rate_of_int',
            'createdBy'         => 'createdby.name as createdBy',
            'updatedBy'         => 'updatedBy.name as updatedBy'
        );

        $query = SubScheme::from('sub_scheme')
            ->leftjoin('scheme', 'scheme.id', '=', 'sub_scheme.scheme_id')
            ->leftjoin('users as createdby', 'createdby.id', '=', 'sub_scheme.created_by')
            ->leftjoin('users as updatedBy', 'updatedBy.id', '=', 'sub_scheme.updated_by')
            ->select($columnArr);

        $this->gridDataFilter($query, $post, $columns);

        $this->gridDataSorting($query, $post);

        $result = $this->gridDataPagination($query, $post, $countOnly);

        return $result;
    }



    public function getCustomerData($request, $countOnly=false){
        $post = ($request->input()) ? $request->input() : [];

        $columnArr = array(
            'member_details.id',
             DB::raw("CONCAT(member_details.first_name,'  ',member_details.middle_name, '  ',member_details.last_name) as name"),
            'member_details.current_post',
            'division.name as branch_name',
            'member_details.member_nominee_name',
            'member_details.bank_name',
            'member_details.status'
        );

        $columns = array(
            'id'                      => 'member_details.id as id',
            'name'                    =>  DB::raw("CONCAT(member_details.first_name,'  ',member_details.middle_name, '  ',member_details.last_name) as name"),
            'current_post'            => 'member_details.current_post as current_post',
            'branch_name'             => 'division.name as branch_name',
            'member_nominee_name'     => 'member_details.member_nominee_name as member_nominee_name',
            'bank_name'               => 'member_details.bank_name as bank_name',
            'status'                  => 'member_details.status as status'
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
            'id'                    =>'td.id',
            'ananya_no'             =>'td.ananya_no',
            'account_no'            =>'td.account_no',
            'sub_scheme_name'       =>'sub_scheme.name as sub_scheme_name',
            'start_date'            =>'td.start_date',
            'maturity_date'         =>'td.maturity_date',
            'intrest_rate'          =>'td.intrest_rate',
            'loan_fd_amount'        =>'td.loan_fd_amount',
            'installment_amount'    =>'td.installment_amount',
            'current_due'           =>'td.current_due',
            'current_balance'       =>'td.current_balance',
            'current_intrest_due'   =>'td.current_intrest_due',
            'current_pending_due'   => 'td.current_pending_due',
            'current_oc_due'        =>'td.current_oc_due',
            'opening_balance'       =>'td.opening_balance',
            'closed'                =>'td.opening_balance',
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
        $customFilterParts = (isset($post['filter']) && isset($post['filter']['filters'])) ? $post['filter']['filters'] : [];

        $columnArr = array(
            'td.id',
            'td.account_no',
            'sub_scheme.name as sub_scheme_name',
            DB::raw("CONCAT(member_details.first_name,'  ',member_details.middle_name, '  ',member_details.last_name) as customer_name"),
            'td.loan_fd_amount',
            'td.current_pending_due',
            'td.current_balance',
            'division.name as branch_name'
        );

        $columns = array(
            'id'                    =>'td.id',
            'account_no'            =>'td.account_no',
            'sub_scheme_name'       =>'sub_scheme.name as sub_scheme_name',
            'customer_name'         => DB::raw("CONCAT(member_details.first_name,'  ',member_details.middle_name, '  ',member_details.last_name) as customer_name"),
            'loan_fd_amount'        =>'td.loan_fd_amount',
            'current_pending_due'   =>'td.current_pending_due',
            'current_balance'       =>'td.current_balance',
            'branch_name'           =>'division.name as branch_name'
        );

        $query = TransactionDetails::from('transaction_detail as td')
                ->leftjoin('sub_scheme', 'sub_scheme.id', '=', 'td.sub_scheme_id')
                ->leftjoin('member_details', 'member_details.id', '=', 'td.member_id')
                ->leftjoin('scheme', 'scheme.id', '=', 'sub_scheme.scheme_id')
                ->leftjoin('division', 'division.id', '=', 'member_details.branch_name')
                ->select($columnArr);

        $this->gridDataFilter($query, $post, $columns);
        foreach ($customFilterParts as $filter) {
            if($filter['field'] == 'extra' && isset($filter['value'])){
                 /* grid wise custom filter apply here */
                $query->where(function ($childQuery) use ($filter, $columns) {
                    foreach ($filter['value'] as $fieldName => $fieldvalue) {
                        if ($fieldName == 'branch_name' && $fieldvalue != '') {
                            $childQuery->where('member_details.branch_name', $fieldvalue);
                        } elseif ($fieldName == 'scheme' && $fieldvalue != '') {
                            $childQuery->where('sub_scheme.scheme_id', $fieldvalue);
                        } elseif ($fieldName == 'sub_scheme_id' && $fieldvalue != '') {
                            $childQuery->where('td.sub_scheme_id', $fieldvalue);
                        }
                    }
                });
            }
        }

        $this->gridDataSorting($query, $post);

        $result = $this->gridDataPagination($query, $post, $countOnly);

        return $result;
    }

    public function getLoanTransactionData($request, $countOnly=false){

        $post = ($request->input()) ? $request->input() : [];
        $customFilterParts = (isset($post['filter']) && isset($post['filter']['filters'])) ? $post['filter']['filters'] : [];

        $columnArr = array(
            'td.id',
            'td.account_no',
            'sub_scheme.name as sub_scheme_name',
            DB::raw("CONCAT(member_details.first_name,'  ',member_details.middle_name, '  ',member_details.last_name) as customer_name"),
            'td.loan_fd_amount',
            'td.current_pending_due',
            'td.current_balance',
            'division.name as branch_name',
            'td.installment_amount',
            'td.installment_amount as total_paid_amount',
            'td.intrest_rate',
        );

        $columns = array(
            'id'                    =>'td.id',
            'account_no'            =>'td.account_no',
            'sub_scheme_name'       =>'sub_scheme.name as sub_scheme_name',
            'customer_name'         => DB::raw("CONCAT(member_details.first_name,'  ',member_details.middle_name, '  ',member_details.last_name) as customer_name"),
            'loan_fd_amount'        =>'td.loan_fd_amount',
            'current_pending_due'   =>'td.current_pending_due',
            'current_balance'       =>'td.current_balance',
            'branch_name'           =>'division.name as branch_name',
            'installment_amount'    =>'td.installment_amount',
            'total_paid_amount'     =>'td.total_paid_amount',
            'intrest_rate'          => 'td.intrest_rate'
        );

        $query = TransactionDetails::from('transaction_detail as td')
                ->leftjoin('sub_scheme', 'sub_scheme.id', '=', 'td.sub_scheme_id')
                ->leftjoin('member_details', 'member_details.id', '=', 'td.member_id')
                ->leftjoin('scheme', 'scheme.id', '=', 'sub_scheme.scheme_id')
                ->leftjoin('division', 'division.id', '=', 'member_details.branch_name')
                ->whereIn('sub_scheme_id', [ '2', '3', '4','5'])
                ->where('current_pending_due', '>=' , 10)
                ->select($columnArr);

        $this->gridDataFilter($query, $post, $columns);

        $this->gridDataSorting($query, $post);

        foreach ($customFilterParts as $filter) {
            if($filter['field'] == 'extra' && isset($filter['value'])){
                 /* grid wise custom filter apply here */
                $query->where(function ($childQuery) use ($filter, $columns) {
                    foreach ($filter['value'] as $fieldName => $fieldvalue) {
                        if ($fieldName == 'branch_name' && $fieldvalue != '') {
                            $childQuery->where('member_details.branch_name', $fieldvalue);
                        } elseif ($fieldName == 'scheme' && $fieldvalue != '') {
                            $childQuery->where('sub_scheme.scheme_id', $fieldvalue);
                        } elseif ($fieldName == 'sub_scheme_id' && $fieldvalue != '') {
                            $childQuery->where('td.sub_scheme_id', $fieldvalue);
                        }
                    }
                });
            }
        }

        $result = $this->gridDataPagination($query, $post, $countOnly);

        return $result;
    }

    public function getVyajShowData($request, $countOnly=false){
        $post = ($request->input()) ? $request->input() : [];

        $columnArr = array(
            'td.id',
            'td.account_no',
            'sub_scheme.name as sub_scheme_name',
             DB::raw("CONCAT(member_details.first_name,'  ',member_details.middle_name, '  ',member_details.last_name) as customer_name"),
            'td.loan_fd_amount',
            'td.current_pending_due',
            'td.current_balance',
            'division.name as branch_name',
             DB::raw("SUM(vyavahar.interest_paid) as interest_paid"),
            'td.intrest_rate',
        );

        $columns = array(
            'id'                    =>'td.id',
            'account_no'            =>'td.account_no',
            'sub_scheme_name'       =>'sub_scheme.name as sub_scheme_name',
            'customer_name'         => DB::raw("CONCAT(member_details.first_name,'  ',member_details.middle_name, '  ',member_details.last_name) as customer_name"),
            'loan_fd_amount'        =>'td.loan_fd_amount',
            'current_pending_due'   =>'td.current_pending_due',
            'current_balance'       =>'td.current_balance',
            'branch_name'           =>'division.name as branch_name',
            'total_interest'        => DB::raw("SUM(vyavahar.interest_paid) as interest_paid"),
            'intrest_rate'          => 'td.intrest_rate'
        );

        $query = TransactionDetails::from('transaction_detail as td')
                ->leftjoin('sub_scheme', 'sub_scheme.id', '=', 'td.sub_scheme_id')
                ->leftjoin('member_details', 'member_details.id', '=', 'td.member_id')
                ->leftjoin('scheme', 'scheme.id', '=', 'sub_scheme.scheme_id')
                ->leftjoin('division', 'division.id', '=', 'member_details.branch_name')
                ->leftjoin('vyavahar', 'td.id', '=','vyavahar.transaction_id')
                ->whereIn('sub_scheme_id', [ '2', '3', '4','5'])
                ->groupBy('vyavahar.transaction_id')
                ->select($columnArr);

        $this->gridDataFilter($query, $post, $columns);

        $this->gridDataSorting($query, $post);

        $result = $this->gridDataPagination($query, $post, $countOnly);

        return $result;
    }

}

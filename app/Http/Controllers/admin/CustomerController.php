<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\SubSceme;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['plugincss'] = array();
        $data['css'] = array();
        $data['pluginjs'] = array();
        $data['pagetitle'] = "View Customer";
        $data['js'] = array('viewcustomer.js');
        return view('pages.viewcustomer', $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // $getSubSceme = SubSceme::where('name','Sabhasad')->first();
        // // dd($getSubSceme->id);
        // dd($getSubSceme->rate_of_int);
        
        $data['plugincss'] = array();
        $data['css'] = array();
        $data['pluginjs'] = array();
        $data['pagetitle'] = "Add Customer";
        $data['js'] = array('addcustomer.js');
        return view('pages.addcustomer', $data);

       
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($id)
    {
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $customer = DB::table('member_details')->where('id',$id)->first();
        $rateofint = DB::table('sub_sceme')->where('id',$id)->first();
        // $rateofint = DB::table('sub_sceme')->where('id',$customer->sub_sceme_id)->first();
      //  print_r($rateofint); exit;
        $age = Carbon::parse($customer->DOB)->diff(Carbon::now())->format('%y years');
        $data['customerId'] = $id;
        $data['plugincss'] = array();
        $data['css'] = array();
        $data['pluginjs'] = array();
        $data['pagetitle'] = " Id: $customer->id |  Name: $customer->first_name $customer->middle_name $customer->last_name |  Bank Account: $customer->bank_account | Age: $age";
        $data['js'] = array('addscemeyojna.js','customertransactionfb.js','customertransactionloan.js','fd.js');
        $data['customer']="$customer->bank_account";
        $data['rateofint']="$rateofint->rate_of_int";
        return view('pages.yojna', $data);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //echo 'hi'; exit;
        $customer = DB::table('member_details')->where('id', $id )->get()->toJson();

        $member = DB::table('transaction_detail')->where('member_id',$id)->get()->toJson();

        $data['id'] = $id;
        $data['plugincss'] = array();
        $data['css'] = array();
        $data['pluginjs'] = array();
        $data['pagetitle'] = "Edit Customer";
        $data['js'] = array('editcustomer.js');
        $data['customer'] = $customer;
        $data['member'] =$member;
        // print_r($data);exit;
       // $data['id'] = $id;


        return view('pages.editcustomer', $data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


    
}

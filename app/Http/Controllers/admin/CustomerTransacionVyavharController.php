<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class CustomerTransacionVyavharController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $td = DB::table('transaction_detail')->where('id',$id)->first();
        $md = DB::table('member_details')->where('id',$td->member_id)->first();
        $scheme_sub = DB::table('sub_scheme')->where('id',$td->sub_scheme_id)->first();
        $scheme = DB::table('scheme')->where('id',$scheme_sub->scheme_id)->first();
        $data['id'] = $id;
        $data['plugincss'] = array();
        $data['css'] = array();
        $data['pluginjs'] = array();
        $data['pagetitle'] = "Transaction Detail";
        $data['td'] = $td;
        $data['md'] = $md;
        // print_r( $data['md']); exit;
        $data['scheme'] = $scheme;
        // print_r($data['scheme']); exit;
        $data['scheme_sub'] = $scheme_sub;
        $data['js'] = array('yojna.js');
        return view('pages.vyavahar', $data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('member_details', function (Blueprint $table) {
            $table->increments('id');
            $table->string('first_name');
            $table->string('middle_name');
            $table->string('last_name');
            $table->date('DOB');
            $table->string('blood_group');
            $table->date('joining_date');
            $table->date('retirement_date');
            $table->string('current_post');
            $table->string('branch_name');
            $table->string('branch_address');
            $table->string('branch_phonenumber');
            $table->string('gpf_no_cpf_no');
            $table->string('home_address');                     
            $table->string('mobile_number');
            $table->string('member_nominee_name');            
            $table->string('nominee_relation');            
            $table->date('nominee_DOB');            
            $table->string('nominee_mobile');            
            $table->string('bank_name');            
            $table->string('bank_branch');            
            $table->string('bank_account');            
            $table->string('ifsc_code');
            $table->enum('status',['Approve', 'Decline']);
            $table->string('payment_type');
            $table->string('check_number')->nullable();
            $table->string('payment_receiver_name');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('member_details');
    }
}

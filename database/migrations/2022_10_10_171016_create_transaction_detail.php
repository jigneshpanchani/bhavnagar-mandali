<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionDetail extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaction_detail', function (Blueprint $table) {
            $table->id();
            $table->integer('ananya_no');
            $table->integer('account_no');
            $table->integer('member_id');
            $table->integer('sub_scheme_id')->nullable();
            $table->date('start_date');
            $table->date('maturity_date')->nullable();
            $table->string('intrest_rate');
            $table->string('loan_fd_amount');
            $table->string('installment_amount');
            $table->string('current_due');
            $table->string('current_balance');
            $table->string('current_intrest_due');
            $table->string('current_pending_due');
            $table->string('current_oc_due');
            $table->string('opening_balance');
            $table->string('closed');
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
        Schema::dropIfExists('transaction_detail');
    }
}

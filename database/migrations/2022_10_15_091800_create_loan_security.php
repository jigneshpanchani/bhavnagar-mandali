<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoanSecurity extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('loan_security', function (Blueprint $table) {
            $table->id();
            $table->integer('member_id');
            $table->integer('transaction_id');
            $table->integer('security_one_id');
            $table->integer('security_two_id');
            $table->string('loan_duration');
            $table->string('loan_purpose');
            $table->string('oprated_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('loan_security');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVyavaharTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vyavahar', function (Blueprint $table) {
            $table->id();
            $table->integer('transaction_id');
            $table->date('date');
            $table->string('pay_through');
            $table->integer('amount');
            $table->string('pay_receive');
            $table->integer('check_no');
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
        Schema::dropIfExists('vyavahar');
    }
}

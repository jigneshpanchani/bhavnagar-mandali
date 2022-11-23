<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerTransaction extends Model
{
    use HasFactory;

    protected $table = 'customer_transaction';

    protected $fillable = [

                'id',
                'a_number',
                'subscheme_id',
                'account_no',
                'start_date',
                'end_date',
                'loan_fd_amount',
                'inst_amount',
                'rate_of_int',
                'cu_due',
                'cu_balance',
                'cu_int_due',
                'cu_pen_due',
                'cu_oc_due',
                'op_balance',
                'maturity_date',
                'surity1_name',
                'surity2_name',
                'close',
                'branch_account_name',
                'tranjection_detail',
                'receipt_no',
                'total_rec',
                'transaction_amt',
                'net'
    ];
}

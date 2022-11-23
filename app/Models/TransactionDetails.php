<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionDetails extends Model
{
    use HasFactory;
    
    protected $table = 'transaction_detail';

    protected $fillable = [

        'ananya_no',
        'account_no',
        'member_id',
        'sub_sceme_id',
        'loan_duration',
        'start_date',
        'maturity_date',
        'intrest_rate',
        'loan_fd_amount',
        'installment_amount',
        'current_due',
        'current_balance',
        'current_intrest_due',
        'current_pending_due',
        'current_oc_due',
        'opening_balance',
        'closed'
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class vyavahar extends Model
{
    use HasFactory;

    protected $table = 'vyavahar';

    protected $fillable = [
        'id',
        'transaction_id',
        'date',
        'pay_through',
        'amount',
        'pay_receive',
        'check_no',
        'interest_paid',
        'principal_paid',
        'remaining_amount'
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoanSecurity extends Model
{
    use HasFactory;
    
    protected $table = 'loan_security';

    protected $fillable = ['member_id',
                           'transaction_id',
                           'security_one_id',
                           'security_two_id',
                           'loan_duration',
                           'loan_purpose',
                           'oprated_by'];
}

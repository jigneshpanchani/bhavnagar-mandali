<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    
    protected $table = 'member_details';

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'DOB',
        'blood_group',
        'joining_date',
        'retirement_date',
        'current_post',
        'branch_name',
        'branch_address',
        'branch_phonenumber',
        'gpf_no_cpf_no',
        'home_address',
        'mobile_number',
        'member_nominee_name',
        'nominee_relation',
        'nominee_DOB',
        'nominee_mobile',
        'bank_name',
        'bank_branch',
        'bank_account',
        'status',
        'payment_type',
        'ifsc_code',
        'check_number',
        'payment_receiver_name',
        'created_at',
        'updated_at',
       
    ];
}

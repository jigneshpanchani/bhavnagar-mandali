<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;


class SubScheme extends Model
{
    use HasFactory;

    use SoftDeletes;


    protected $table = 'sub_scheme';

    protected $fillable = [
        'id',
        'scheme_id',
        'name',
        'rate_of_int',
        'created_by',
        'updated_by',

    ];
}

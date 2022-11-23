<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;


class SubSceme extends Model
{
    use HasFactory;

    use SoftDeletes;


    protected $table = 'sub_sceme';

    protected $fillable = [
        'id',
        'sceme_id',
        'name',
        'rate_of_int',
        'created_by',
        'updated_by',
        
    ];
}

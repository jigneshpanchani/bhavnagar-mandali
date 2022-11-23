<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Scheme extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'scheme';

    protected $fillable = [
        'id',
        'name',
        'created_by',
        'updated_by'
    ];
}

<?php

namespace App\Exports;

use App\Models\TransactionDetails;
use Maatwebsite\Excel\Concerns\FromCollection;

class TransactionDetailsExports implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return TransactionDetails::all();
    }
}

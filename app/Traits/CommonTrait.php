<?php

namespace App\Traits;


use Illuminate\Http\Request;
use Config;
use App\Repository;

trait CommonTrait {

    public function getOperators(){
        return [
            'eq' => '=',
            'gt' => '>',
            'gte' => '>=',
            'lt' => '<',
            'lte' => '<=',
            'neq' => '!=',
            'startswith' => 'like',
            'contains' => 'like',
            'doesnotcontain' => 'not like',
            'endswith' => 'like',
            'isnull' => '=',
            'isnotnull' => '!=',
            'isempty' => '=',
            'isnotempty' => '!='
        ];
    }

    public function gridDataFilter($query, $post, $columns){

        $operations = $this->getOperators();
        $filterParts = (isset($post['filter']) && isset($post['filter']['filters'])) ? $post['filter'] : [];

        if(isset($filterParts['logic'])){

            $filterArr = $filterParts['filters'];
            $defaultLogic = $filterParts['logic'];
            $query->where(function ($childQuery) use ($filterArr, $operations, $columns, $defaultLogic) {

                foreach ($filterArr as $filter) {
                    if (isset($filter['logic'])){
                        $childQuery->where(function ($subQuery) use ($filter, $operations, $columns) {
                            foreach ($filter['filters'] as $subFilter) {
                                $subOperator = $operations[$subFilter['operator']];
                                $subSearchValue = $this->convertFilterValue($subFilter['operator'], $subFilter['value']);
                                if(strpos($columns[$subFilter['field']], " as ") !== false){
                                    $fullField = explode(' as ', $columns[$subFilter['field']])[0];
                                    $whereRawCondition = ($filter['logic'] == 'or') ? 'orWhereRaw' : 'whereRaw';
                                    $subQuery->$whereRawCondition("$fullField $subOperator ?", $subSearchValue);
                                } else{
                                    $whereCondition = ($filter['logic'] == 'or') ? 'orWhere' : 'where';
                                    $subQuery->$whereCondition($subFilter['field'], $subOperator, $subSearchValue);
                                }
                            }
                        });
                    }elseif($filter['field'] == 'extra'){
                        // apply filter on controller
                    }elseif($filter['field'] == 'searchKey'){
                        $searchText = $filter['value'];
                        if(!empty($searchText)){
                            $childQuery->where(function ($subQuery) use ($columns, $searchText) {
                                foreach ($columns as $column) {
                                    $columnFullName = (strpos($column, " as ") !== false) ? (explode(' as ', $column)[0]) : $column;
                                    $subQuery->orWhereRaw("$columnFullName like ?", "%$searchText%");
                                }
                            });
                        }
                    }else{
                        $operator = $operations[$filter['operator']];
                        $searchValue = $this->convertFilterValue($filter['operator'], $filter['value']);
                        if(strpos($columns[$filter['field']], " as ") !== false){
                            $fullField = explode(' as ', $columns[$filter['field']])[0];
                            $whereRawCondition = ($defaultLogic == 'or') ? 'orWhereRaw' : 'whereRaw';
                            $childQuery->$whereRawCondition("$fullField $operator ?", $searchValue);
                        } else{
                            $whereCondition = ($defaultLogic == 'or') ? 'orWhere' : 'where';
                            $childQuery->$whereCondition($filter['field'], $operator, $searchValue);
                        }
                    }
                }
            });
        }
    }

    public function gridDataSorting($query, $post){
        //handle the sorting request
        $sorts = (isset($post['sort'])) ? $post['sort'] : [];
        foreach ($sorts as $sort) {
            $query->orderBy($sort['field'], $sort['dir']);
        }
    }

    public function gridDataPagination($query, $post, $countOnly){
        if($countOnly){
            $result = $query->get()->count();
        }else{
            if(isset($post['take'])){
                $query->skip($post['skip'])->take($post['take']);
            }
            $result = $query->get()->toArray();
        }
        return $result;
    }

}
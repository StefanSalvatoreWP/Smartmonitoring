<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'course', 'year', 'students'];

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }
}

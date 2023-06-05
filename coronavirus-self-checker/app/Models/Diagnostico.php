<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diagnostico extends Model
{
    use HasFactory;
    protected $table = 'diagnosticos';
    protected $fillable = ['pacient_id', 'febre', 'coriza', 'nariz_ent', 'cansaco', 'tosse', 'dor_cab', 'dor_corpo', 'mal_estar', 'dor_garganta', 'dif_respirar', 'falta_paladar', 'falta_olfato', 'dif_loc', 'diarreia'];
}

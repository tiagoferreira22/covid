<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('diagnosticos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pacient_id');
            $table->foreign('pacient_id')->references('id')->on('paciente')->onDelete('cascade');
            $table->boolean('febre')->default(0);
            $table->boolean('coriza')->default(0);
            $table->boolean('nariz_ent')->default(0);
            $table->boolean('cansaco')->default(0);
            $table->boolean('tosse')->default(0);
            $table->boolean('dor_cab')->default(0);
            $table->boolean('dor_corpo')->default(0);
            $table->boolean('mal_estar')->default(0);
            $table->boolean('dor_garganta')->default(0);
            $table->boolean('dif_respirar')->default(0);
            $table->boolean('falta_paladar')->default(0);
            $table->boolean('falta_olfato')->default(0);
            $table->boolean('dif_loc')->default(0);
            $table->boolean('diarreia')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diagnosticos');
    }
};

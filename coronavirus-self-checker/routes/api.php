<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    DiagnosticoController,
    PacienteController
};

Route::get('/', [PacienteController::class, 'index']);
Route::post('/paciente', [PacienteController::class, 'store']);
Route::get('/fotoImg/{filename}', function ($filename) {
    $path = storage_path('app/fotoImg/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }
    
    return response()->file($path);
});
Route::get('/paciente/{id}', [PacienteController::class, 'show']);
Route::delete('/paciente/{id}', [PacienteController::class, 'destroy']);
Route::post('/diagnostico', [DiagnosticoController::class, 'store']);
Route::patch('/pacientes/{id}', [PacienteController::class, 'updateStatus']);
Route::get('/sintomas/{id}', [DiagnosticoController::class, 'show']);
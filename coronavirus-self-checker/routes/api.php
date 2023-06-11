<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\{
    DiagnosticoController,
    PacienteController
};

// Rota para recuperar todos os registros
Route::get('/', [PacienteController::class, 'index']);

// Rota para criar um novo registro
Route::post('/paciente', [PacienteController::class, 'store']);


//rota para pegar a imagem
Route::get('/fotoImg/{filename}', function ($filename) {
    $path = storage_path('app/fotoImg/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }
    
    return response()->file($path);
});


// Rota para recuperar um registro específico
Route::get('/paciente/{id}', [PacienteController::class, 'show']);

// Rota para atualizar um registro existente

// Rota para excluir um registro
Route::delete('/paciente/{id}', [PacienteController::class, 'destroy']);

//Rota para criar um novo disgnostico
Route::post('/diagnostico', [DiagnosticoController::class, 'store']);

// Rota para atualizar um registro existente
Route::patch('/pacientes/{id}', [PacienteController::class, 'updateStatus']);

// Rota para recuperar um registro específico
Route::get('/sintomas/{id}', [DiagnosticoController::class, 'show']);
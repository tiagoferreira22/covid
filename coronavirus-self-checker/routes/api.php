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
Route::put('/paciente/{id}', [PacienteController::class, 'update']);

// Rota para excluir um registro
Route::delete('/paciente/{id}', [PacienteController::class, 'destroy']);
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

// Rota para recuperar um registro específico
Route::get('/paciente/{id}', [PacienteController::class, 'show']);

// Rota para atualizar um registro existente
Route::put('/paciente/{id}', [PacienteController::class, 'update']);

// Rota para excluir um registro
Route::delete('/paciente/{id}', [PacienteController::class, 'destroy']);


Route::post('/diagnostico/{id}', [DiagnosticoController::class, 'store']);
Route::get('/diagnostico/{id}', [PacienteController::class, 'createDiagnostic']);

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Paciente;


class PacienteController extends Controller
{
    public function index()
    {
        $paciente = Paciente::all();
        return response()->json($paciente);
    }
    
    public function store(Request $request)
    {
        $paciente = new paciente;
        $paciente->nome = $request->nome;
        $paciente->cpf = $request->cpf;
        $paciente->telefone = $request->telefone;
        $paciente->dataNascimento = $request->dataNascimento;
        $paciente->status = $request->status;
        $paciente->foto = $request->foto;
        $paciente->save();
        return response()->json($paciente, 201);
    }

    public function show($id)
    {
        $paciente = paciente::find($id);
        if (!$paciente) {
            return response()->json(['message' => 'Registro não encontrado'], 404);
        }
        return response()->json($paciente);
    }

    public function update(Request $request, $id)
    {
        $paciente = paciente::find($id);
        if (!$paciente) {
            return response()->json(['message' => 'Registro não encontrado'], 404);
        }
        $paciente->nome = $request->nome;
        $paciente->cpf = $request->cpf;
        $paciente->telefone = $request->telefone;
        $paciente->dataNascimento = $request->dataNascimento;
        $paciente->status = $request->status;
        $paciente->foto = $request->foto;
        $paciente->save();
        return response()->json($paciente);
    }

    public function destroy($id)
    {
        $paciente = paciente::find($id);
        if (!$paciente) {
            return response()->json(['message' => 'Registro não encontrado'], 404);
        }
        $paciente->delete();
        return response()->json(['message' => 'Registro excluído com sucesso']);
    }

}

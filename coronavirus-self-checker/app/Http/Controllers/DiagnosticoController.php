<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DiagnosticoController extends Controller
{
    public function store(Request $request,$id){
        $paciente = paciente::where('id', $id)->get()->first();

        $pacienteStatus = ((count($request->all()) - 1) * 100) / 14;
        $diag = Diagnostic::calcDiag($pacienteStatus);
        $request['paciente_id'] = $id;
        paciente::where('id', $paciente->id)->update(['diagnostic' => $diag]);
        Diagnostic::create($request->all());
    }

    // public function store(Request $request)
    // {
    //     $paciente = new paciente;
    //     $paciente->nome = $request->nome;
    //     $paciente->cpf = $request->cpf;
    //     $paciente->telefone = $request->telefone;
    //     $paciente->dataNascimento = $request->dataNascimento;
    //     $paciente->status = $request->status;
    //     $paciente->foto = $request->foto;
    //     $paciente->save();
    //     return response()->json($paciente, 201);
    // }
}

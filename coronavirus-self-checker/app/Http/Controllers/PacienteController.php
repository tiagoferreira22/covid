<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Paciente;


class PacienteController extends Controller
{
    public function index()
    {
        $pacientes = Paciente::all();
        return response()->json($pacientes);
    }

    public function show($id)
    {
        $paciente = Paciente::find($id);

        if (!$paciente) {
            return response()->json(['message' => 'Paciente não encontrado'], 404);
        }

        return response()->json($paciente);
    }

    

    public function destroy($id)
    {
        $paciente = Paciente::find($id);

        if ($paciente) {
            if ($paciente->foto) {
                $filename = basename($paciente->foto);
                Storage::delete('fotoImg/' . $filename);

            }
            $paciente->delete();
            return response()->json(['message' => 'Registro do paciente deletado']);

        }
        
        return response()->json(['message' => 'Paciente não encontrado'], 404);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'nome' => 'required',
            'dataNascimento' => 'required|date',
            'cpf' => 'required|cpf',
            'telefone' => 'required',
            'foto' => 'required',
        ]);

        $pacientes = new Paciente;
        $pacientes->nome = $request->input('nome');
        $pacientes->dataNascimento = $request->input('dataNascimento');
        $pacientes->cpf = $request->input('cpf');
        $pacientes->telefone = $request->input('telefone');

        if ($request->hasFile('foto')) {
            $foto = $request->file('foto');
            $path = $foto->store('fotoImg');
            $pacientes->foto = $path;
        } else {
            $pacientes->foto = null;
        }

        $pacientes->save();

        return response()->json($pacientes, 201);
    }

     public function update(Request $request, $id)
     {
         $paciente = Paciente::find($id);

         if (!$paciente) {
             return response()->json(['message' => 'Paciente não encontrado'], 404);
         }

         $this->validate($request, [
             'nome' => 'required',
             'dataNascimento' => 'required|date',
             'cpf' => 'required|cpf',
             'telefone' => 'required',
             'foto' => 'required',
         ]);

         $paciente->nome = $request->input('nome');
         $paciente->dataNascimento = $request->input('dataNascimento');
         $paciente->cpf = $request->input('cpf');
         $paciente->telefone = $request->input('telefone');

         if ($request->hasFile('foto')) {
             $foto = $request->file('foto');
             $path = $foto->store('fotoImg');
             $paciente->foto = $path;
         }

         $paciente->save();

         return response()->json($paciente);
     }

    public function updateStatus(Request $request, $id)
    {
        $paciente = Paciente::findOrFail($id);
        $paciente->status = $request->input('status');
        $paciente->save();

        return response()->json(['message' => 'Status do paciente atualizado com sucesso']);
    }
}
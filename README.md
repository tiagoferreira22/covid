# C.O.V.I.D
* C: Consulta
* O: Online
* V: Virtual
* I: Inteligente
* D: Diagnóstico

Sistema desafio de gerenciamento médico para consultas de pacientes suspeitos de COVID-19. Desenvolvido utilizando uma abordagem FullStack, combina as poderosas tecnologias Laravel, React, React Bootstrap, Axios e TypeScript.

# 📖 Índice
* Badges
* Descrição do Projeto
* Status do Projeto
* Funcionalidades
* Demonstrações

# 🏷️ Badges 
<img alt="linguagens usadas no projeto" src="https://img.shields.io/github/languages/count/tiagoferreira22/covid" /> <img alt="tamanho do arquivo" src="https://img.shields.io/github/repo-size/tiagoferreira22/covid" /> <img alt="Licença" src="https://img.shields.io/github/license/tiagoferreira22/covid" />

# 📋 Descrição do Projeto
A proposta deste projeto é proporcionar suporte essencial aos profissionais de saúde, concentrando-se no atendimento de pacientes que, frequentemente, ainda seguem métodos antiquados. Torna-se fundamental modernizar esse processo, visando assegurar uma qualidade de atendimento aprimorada e, ao mesmo tempo, promover uma melhor organização para os prestadores de serviços.

# 🌱 Status do Projeto
:construction: Projeto ainda em desenvolvimento :construction: 

No entanto, estamos abertos a receber opiniões e sugestões construtivas a fim de aprimorar constantemente o sistema. Valorizamos a colaboração e o engajamento da comunidade, buscando incorporar melhorias e atualizações que contribuam para a eficácia e usabilidade do sistema. Acreditamos que ao trabalharmos juntos, poderemos criar uma solução ainda mais robusta e adaptada às necessidades dos usuários.

# 🛠️ Funcionalidades 
- `Funcionalidade 1`: Cadastro de pacientes
- `Funcionalidade 2`: Apresentação em forma de tabela dos dados registrados para cada paciente
- `Funcionalidade 3`: Diagnosticar o paciente
- `Funcionalidade 4`: Ver as informações do paciente
- `Funcionalidade 5`: Deletar paciente

# 🎥 Demontrações


# 💻 Tecnologias
- <a href="https://axios-http.com/docs/intro">Axios</a>
- <a href="https://legacy.reactjs.org/docs/getting-started.html">React</a>
- <a href="https://react-bootstrap-v4.netlify.app/getting-started/introduction/">React Bootstrap</a>
- <a href="https://www.typescriptlang.org/docs/">TypeScript</a>
- <a href="https://laravel.com/docs/10.x/readme">Laravel 10</a>

# 🧩 Dependências
Antes de tudo, devemos apresentar as dependências que o projeto exije
* Front-End
    * @types/node: (20.2.5)
    * @types/react: (18.0.37)
    * @types/react-dom: (18.0.11)
    * @typescript-eslint/eslint-plugin: (5.59.0)
    * @typescript-eslint/parser: (5.59.0)
    * @vitejs/plugin-react: (4.0.0)
    * eslint: (8.38.0)
    * eslint-plugin-react-refresh: (0.3.4)
    * typescript: (5.0.2)
    * vite: (4.3.9)
    * axios: (1.4.0)
    * bootstrap: (5.3.0)
    * date-fns: (2.30.0)
    * react: (18.2.0)
    * react-bootstrap: (2.7.4)
    * react-dom: (18.2.0)
    * react-icons: (4.9.0)
    * react-imask: (7.0.0-alpha.2)
    * react-router-dom: (6.11.2)

* Back-End
    * php (v8.1)
    * geekcom/validator-docs (v3.9)

# 🔧 Instalação
Vamos seguir um processo passo a passo. Começaremos pela instalação do projeto. 
É importante ter o Composer, o Node.js e o Git instalados em sua máquina para realizar essa tarefa. Certifique-se de tê-los configurados corretamente antes de prosseguir.

1. Faça um fork desse repositório para o seu perfil
```bash 
git clone https://github.com/tiagoferreira22/covid.git
```
2. Acesse o repositório do projeto
```bash
cd coronavirus-self-checker
```
3. Instale as dependências do back-end
```bash 
composer install
```
4. Aguarde até que as dependências sejam instaladas completamente.
5. Copie e cole o arquivo `.env.example` com um novo nome: `.env`
copie o comando:
```bash
cp .env.example .env
```
6. Atualize as variáveis do arquivo de configuração, localizado em .env, com as informações adequadas. Se você ainda não criou um banco de dados, certifique-se de criá-lo antes de editar o arquivo .env.
7. Gere uma chave para que o Laravel consiga se comunicar com o banco
```bash
php artisan key:generate
```
8. Abra outro terminal e acesse o diretório client, onde está a parte do front-end com React
```bash
cd client/
```
9. Instale as dependências do front-end
```bash
npm install
```
10. Se der algum erro, adicione --force ao final do comando
```bash 
npm install --force
```
11. Pronto para ser usado

# ✨ Como usar
1. Inicie o laravel
```bash
php artisan serve
```
2. inicie o frontend com:
```bash
npm run dev
```
3. Após concluir essas etapas, abra no navergador com o link que é dado no terminal e pronto seu computador já pode começar a trabalhar com o projeto.

# 🎯 Conclusão
O código pode ser aprimorado com implementações adicionais, como o suporte para o registro de múltiplos usuários em um único sistema, aumentando a segurança e permitindo uma experiência mais personalizadas para cada usuário.

🌟 Obrigado por utilizar este repositório e contribuir para o sucesso do projeto! Seu envolvimento é fundamental para o seu crescimento e aprimoramento contínuos.

Feito com ❤️ by <a href="https://github.com/tiagoferreira22">Tiago Ferriera</a>

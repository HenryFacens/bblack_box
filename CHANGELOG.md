📦 CHANGELOG - Backend do Projeto BBLACK_BOX

🗓️ Atualização: Integração Completa do Módulo de Reporte (10/05/2025)

📁 Arquivos Alterados

src/modules/reporte/reporte.controller.js

src/modules/reporte/reporte.routes.js

src/middleware/upload.js

.gitignore

🔧 MUDANÇAS PRINCIPAIS

 1. POST /api/reporte/create

ANTES: Criava o reporte sem garantir integridade das categorias ou status.

DEPOIS:

Verifica se categoriasReporte e statusReporte existem na base.

IA de moderação comentada temporariamente (por estabilidade).

Logs de debug com énfase em imagem recebida e dados do body.

Nome correto do campo categoria adaptado para categoriaReporte: categoriasReporte.

 2. GET /api/reporte/me

NOVO ENDPOINT para listar todos os reportes do usuário logado.

Adiciona correção de caminhos de imagem para fotosPerfil/ e uploads/.

Mapeamento manual para retornar apenas os campos relevantes para o frontend.

✅ 3. reporte.routes.js

Substitui multer inline por middleware upload.js reutilizável.

Rota /create passa a usar upload.single('imagemReporte') corretamente.

Adicionadas tags Swagger detalhadas para cada rota:

/create

/get

/me

/update

/:reporteId/interagir

/:reporteId/comentario

✅ 4. upload.js

ANTES: Extensão do arquivo vinha direto do original (podia ser indefinida).

DEPOIS:

Garante que tenha .jpg como extensão padrão se estiver ausente.

Continua usando Date.now() + Math.random() como parte do nome.

Filtro de imagem reforçado (mime-type).

✅ 5. .gitignore

Pasta uploads/ adicionada ao .gitignore para não versionar arquivos de imagem locais.

📌 VALORES VÁLIDOS PARA TESTES NO SWAGGER /create

Categorias permitidas:

Infraestrutura Urbana

Limpeza e Meio Ambiente

Segurança Pública

Transporte e Mobilidade

Outros

Status permitidos:

Pendente

Em andamento

Resolvido

Fechado sem solução

📌 Observações para Desenvolvedores

Caso esteja usando Swagger para testes manuais, digite os nomes das categorias e status exatamente como estão no banco.

Qualquer valor diferente irá retornar:

Categoria não encontrada.

Status não encontrado.

📥 Exemplo de JSON esperado (Swagger)

POST /api/reporte/create (multipart/form-data)

- descricaoReporte: "Buraco perigoso na rua"
- localizacaoReporte: "Rua Tal, 123"
- imagemReporte: (arquivos de imagem)
- categoriasReporte: "Infraestrutura Urbana"
- statusReporte: "Pendente"


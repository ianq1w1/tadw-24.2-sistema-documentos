const mysql = require('mysql2');
const fs = require('fs');

// 1. Carregar o arquivo JSON
const jsonData = JSON.parse(fs.readFileSync('documentos.json', 'utf8'));

// 2. Configurar a conexão com o banco de dados MySQL
const pool = mysql.createPool({
  host: 'localhost',  // substitua pelo host do seu MySQL
  user: 'root',       // substitua pelo seu usuário do MySQL
  password: '12345678',  // substitua pela sua senha do MySQL
  database: 'documentos', // nome do banco de dados
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 3. Função para inserir dados nas tabelas

const insertDocs = (data) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO documentos.docs (id, tipo, titulo, conteudo) VALUES (?, ?, ?, ?)`;
    pool.execute(query, [data.id, data.tipo, data.titulo, data.conteudo], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const insertArtigoAcademico = (data) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO documentos.arti_acad (autor, areaEstudo, doi, docs_id) VALUES (?, ?, ?, ?)`;
    pool.execute(query, [data.autor, data.areaEstudo, data.doi, data.id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const insertRelatorioFinanceiro = (data) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO documentos.rel_finan (data, valor, departamento, docs_id) VALUES (?, ?, ?, ?)`;
    pool.execute(query, [ data.data, data.valor, data.departamento, data.id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// 4. Função principal de ETL
const migrateData = async (data) => {
    for (const item of data) {
    try {
        // pool.execute('START TRANSACTION')
            // Inserir na tabela docs
            await insertDocs(item);
            
            // Se for Artigo Acadêmico, inserir na tabela arti_acad
            if (item.tipo === 'Artigo Acadêmico') {
                await insertArtigoAcademico(item);
            }
            
            // Se for Relatório Financeiro, inserir na tabela rel_finan
            if (item.tipo === 'Relatório Financeiro') {
                await insertRelatorioFinanceiro(item);
            }
            // pool.execute('COMMIT');
        
      
      

    } catch (err) {
      console.error(`Erro ao migrar dados do item ${item.id}:`, err);
    //   pool.execute('ROLLBACK');
    //   salva os ids dos documentos que não foram migrados
    }
  }
};

// 5. Executar a migração
migrateData(jsonData)
  .then(() => {
    console.log('Migração concluída!');
    pool.end();
  })
  .catch((err) => {
    console.error('Erro na migração:', err);
    pool.end();
  });

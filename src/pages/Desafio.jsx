import React, { useState, useEffect } from 'react';
import './TabelaEditavel.css';

function TabelaEditavel() {
  const [dados, setDados] = useState([
    { id: 1, desafio: 'Desafio 1', professor: 'Professor 1', curso: 'Curso 1', periodo: 'Período 1', editavel: false, desafioOriginal: '', professorOriginal: '', cursoOriginal: '', periodoOriginal: '' },
    { id: 2, desafio: 'Desafio 2', professor: 'Professor 2', curso: 'Curso 2', periodo: 'Período 2', editavel: false, desafioOriginal: '', professorOriginal: '', cursoOriginal: '', periodoOriginal: '' },
    { id: 3, desafio: 'Desafio 3', professor: 'Professor 3', curso: 'Curso 3', periodo: 'Período 3', editavel: false, desafioOriginal: '', professorOriginal: '', cursoOriginal: '', periodoOriginal: '' },
  ]);

  useEffect(() => {
    const dadosArmazenados = localStorage.getItem('Storage_desafios');
    if (dadosArmazenados) {
      setDados(JSON.parse(dadosArmazenados));
    }
  }, []);

  const handleChange = (id, campo, valor) => {
    const novosDados = dados.map(item => {
      if (item.id === id) {
        return { ...item, [campo]: valor };
      }
      return item;
    });
    setDados(novosDados);
  };

  const handleEdit = (id) => {
    const novosDados = dados.map(item => {
      if (item.id === id) {
        return { ...item, editavel: true, desafioOriginal: item.desafio, professorOriginal: item.professor, cursoOriginal: item.curso, periodoOriginal: item.periodo };
      }
      return item;
    });
    setDados(novosDados);
  };

  const handleSave = (id) => {
    const novosDados = dados.map(item => {
      if (item.id === id) {
        return { ...item, editavel: false };
      }
      return item;
    });
    setDados(novosDados);
    salvarDadosNoStorage(novosDados);
  };

  const handleCancel = (id) => {
    const novosDados = dados.map(item => {
      if (item.id === id) {
        return { ...item, editavel: false, desafio: item.desafioOriginal, professor: item.professorOriginal, curso: item.cursoOriginal, periodo: item.periodoOriginal };
      }
      return item;
    });
    setDados(novosDados);
  };

  const handleDelete = (id) => {
    const novosDados = dados.filter(item => item.id !== id);
    setDados(novosDados);
    excluirDoStorage(id);
  };

  const handleAdd = () => {
    const novoId = dados.length + 1;
    const novaLinha = {
      id: novoId,
      desafio: '',
      professor: '',
      curso: '',
      periodo: '',
      editavel: true,
      desafioOriginal: '',
      professorOriginal: '',
      cursoOriginal: '',
      periodoOriginal: ''
    };
    const novosDados = [...dados, novaLinha];
    setDados(novosDados);
  };

  const salvarDadosNoStorage = (dados) => {
    localStorage.setItem('Storage_desafios', JSON.stringify(dados));
  };

  const excluirDoStorage = (id) => {
    const dadosArmazenados = localStorage.getItem('Storage_desafios');
    if (dadosArmazenados) {
      const dadosAtualizados = JSON.parse(dadosArmazenados).filter(item => item.id !== id);
      localStorage.setItem('Storage_desafios', JSON.stringify(dadosAtualizados));
    }
  };

  return (
    <div>
        <h1>Desafio</h1>
      <button onClick={handleAdd} className="adicionar-linha">Adicionar Linha</button>
      <table className="tabela-editavel">
        <thead>
          <tr>
            <th>ID</th>
            <th>Desafio</th>
            <th>Professor</th>
            <th>Curso</th>
            <th>Período</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {dados.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {item.editavel ? (
                  <input
                    type="text"
                    value={item.desafio}
                    onChange={e => handleChange(item.id, 'desafio', e.target.value)}
                  />
                ) : (
                  item.desafio
                )}
              </td>
              <td>
                {item.editavel ? (
                  <input
                    type="text"
                    value={item.professor}
                    onChange={e => handleChange(item.id, 'professor', e.target.value)}
                  />
                ) : (
                  item.professor
                )}
              </td>
              <td>
                {item.editavel ? (
                  <input
                    type="text"
                    value={item.curso}
                    onChange={e => handleChange(item.id, 'curso', e.target.value)}
                  />
                ) : (
                  item.curso
                )}
              </td>
              <td>
                {item.editavel ? (
                  <input
                    type="text"
                    value={item.periodo}
                    onChange={e => handleChange(item.id, 'periodo', e.target.value)}
                  />
                ) : (
                  item.periodo
                )}
              </td>
              <td>
                {item.editavel ? (
                  <div className="acoes">
                    <button onClick={() => handleSave(item.id)}>Salvar</button>
                    <button onClick={() => handleCancel(item.id)}>Cancelar Edição</button>
                  </div>
                ) : (
                  <div className="acoes">
                    <button onClick={() => handleEdit(item.id)}>Editar</button>
                    <button onClick={() => handleDelete(item.id)}>Excluir</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaEditavel;

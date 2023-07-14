import React, { useState, useEffect } from 'react';
import './TabelaEditavel.css';

function TabelaEditavel() {
  const [dados, setDados] = useState([
    { id: 1, periodo: '1º Semestre', materias: 'Matérias do 1º Semestre', editavel: false, periodoOriginal: '', materiasOriginal: '' },
    { id: 2, periodo: '2º Semestre', materias: 'Matérias do 2º Semestre', editavel: false, periodoOriginal: '', materiasOriginal: '' },
    { id: 3, periodo: '3º Semestre', materias: 'Matérias do 3º Semestre', editavel: false, periodoOriginal: '', materiasOriginal: '' },
  ]);

  useEffect(() => {
    const dadosArmazenados = localStorage.getItem('Storage_periodo');
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
        return { ...item, editavel: true, periodoOriginal: item.periodo, materiasOriginal: item.materias };
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
        return { ...item, editavel: false, periodo: item.periodoOriginal, materias: item.materiasOriginal };
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
      periodo: '',
      materias: '',
      editavel: true,
      periodoOriginal: '',
      materiasOriginal: ''
    };
    const novosDados = [...dados, novaLinha];
    setDados(novosDados);
  };

  const salvarDadosNoStorage = (dados) => {
    localStorage.setItem('Storage_periodo', JSON.stringify(dados));
  };

  const excluirDoStorage = (id) => {
    const dadosArmazenados = localStorage.getItem('Storage_periodo');
    if (dadosArmazenados) {
      const dadosAtualizados = JSON.parse(dadosArmazenados).filter(item => item.id !== id);
      localStorage.setItem('Storage_periodo', JSON.stringify(dadosAtualizados));
    }
  };

  return (
    <div>
        <h1>Períodos</h1>
      <button onClick={handleAdd} className="adicionar-linha">Adicionar Linha</button>
      <table className="tabela-editavel">
        <thead>
          <tr>
            <th>ID</th>
            <th>Período</th>
            <th>Matérias</th>
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
                    value={item.periodo}
                    onChange={e => handleChange(item.id, 'periodo', e.target.value)}
                  />
                ) : (
                  item.periodo
                )}
              </td>
              <td>
                {item.editavel ? (
                  <input
                    type="text"
                    value={item.materias}
                    onChange={e => handleChange(item.id, 'materias', e.target.value)}
                  />
                ) : (
                  item.materias
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

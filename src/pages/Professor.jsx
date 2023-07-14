import React, { useState, useEffect } from 'react';
import './TabelaEditavel.css';

function TabelaEditavel() {
  const [dados, setDados] = useState([
    { id: 1, professor: 'Professor 1', cpf: '1234567890', editavel: false, professorOriginal: '', cpfOriginal: '' },
    { id: 2, professor: 'Professor 2', cpf: '0987654321', editavel: false, professorOriginal: '', cpfOriginal: '' },
    { id: 3, professor: 'Professor 3', cpf: '9876543210', editavel: false, professorOriginal: '', cpfOriginal: '' },
  ]);

  useEffect(() => {
    const dadosArmazenados = localStorage.getItem('Storage_prof');
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
        return { ...item, editavel: true, professorOriginal: item.professor, cpfOriginal: item.cpf };
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
        return { ...item, editavel: false, professor: item.professorOriginal, cpf: item.cpfOriginal };
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
      professor: '',
      cpf: '',
      editavel: true,
      professorOriginal: '',
      cpfOriginal: ''
    };
    const novosDados = [...dados, novaLinha];
    setDados(novosDados);
  };

  const salvarDadosNoStorage = (dados) => {
    localStorage.setItem('Storage_prof', JSON.stringify(dados));
  };

  const excluirDoStorage = (id) => {
    const dadosArmazenados = localStorage.getItem('Storage_prof');
    if (dadosArmazenados) {
      const dadosAtualizados = JSON.parse(dadosArmazenados).filter(item => item.id !== id);
      localStorage.setItem('Storage_prof', JSON.stringify(dadosAtualizados));
    }
  };

  return (
    <div>
        <h1>Professores</h1>
      <button onClick={handleAdd} className="adicionar-linha">Adicionar Linha</button>
      <table className="tabela-editavel">
        <thead>
          <tr>
            <th>ID</th>
            <th>Professor</th>
            <th>CPF</th>
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
                    value={item.cpf}
                    onChange={e => handleChange(item.id, 'cpf', e.target.value)}
                  />
                ) : (
                  item.cpf
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

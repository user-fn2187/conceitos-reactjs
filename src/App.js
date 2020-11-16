import React, { useState } from "react";
import { useEffect } from "react";
import "./styles.css";
import api from 'services/api';

function App() {
  const [repositories, setRepositorie] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositorie(response.data);
    })
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Desafio ReactJS ${Date.now()}`,
      url: "https://github.com/FelipeRodrigues1337/conceitos-reactjs",
      techs: ["ReactJS","Axios"]
    });

    setRepositorie([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    
    const newRepositories = repositories.filter(repo => repo.id != id);
    
    setRepositorie(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

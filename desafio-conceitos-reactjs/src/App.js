import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('/repositories');
  
      setRepositories(response.data);
    }
    loadRepositories();
  }, [])

  async function handleAddRepository() {
    const newRepository = {
      title: `New repository ${Date.now()}`,
      url: "https://github.com/newrepositorie",
      techs: ["ReactJS"]
    }

    const response = await api.post('/repositories', newRepository);

    if (response.status === 200) {
      return setRepositories([...repositories, response.data])
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      const currentRepositories = repositories
      .filter(repository => repository.id !== id);

      return setRepositories(currentRepositories);
    } 
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
        
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))} 
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

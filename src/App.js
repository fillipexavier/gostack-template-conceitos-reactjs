import React, { useEffect, useState } from 'react';
import api from './services/api';
import './styles.css';

function App() {
  const [repositories, setResponsitories] = useState([]);
  useEffect(() => {
    api.get('repositories').then((response) => {
      setResponsitories(response.data);
    });
  }, []);
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'React',
      url: 'https://github.com.br/fillipexavier/React',
      techs: ['Node.js', 'ReactJS'],
    });
    setResponsitories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setResponsitories(repositories.filter((repository) => repository.id != id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
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

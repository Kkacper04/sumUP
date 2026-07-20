import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchProjects();
  }, [])

  const fetchProjects = async () => {
    try {
     
      const response = await fetch('http://localhost:8000/projects/');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = { name, description };

    try {
      const response = await fetch('http://localhost:8000/projects/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject)
      });

      if (response.ok) {
        await fetchProjects();
        setName('');
        setDescription('');
      } else {
        console.error('Błąd zapisu po stronie serwera');
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania:', error);
    }
  }

  return (
    <div className="app-container">
      <h1>suMUP</h1>
      
      <div className="form-section">
        <h3>Dodaj projekt</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Nazwa projektu" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input 
            type="text" 
            placeholder="Opis projektu" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Zapisz</button>
        </form>
      </div>

      <div className="list-section">
        <h2>Twoje projekty</h2>
        {projects.length === 0 ? (
          <p>Dodaj 1 projekt, aby rozpocząć</p>
        ) : (
          <ul>
            {projects.map((proj) => (
              <li key={proj.id}>
                <strong>{proj.name}</strong> - {proj.status}
                <br/>
                <small>{proj.description}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
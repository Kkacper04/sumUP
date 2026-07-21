import { useState, useEffect } from 'react'

function App() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchProjects();
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:8001/projects/');
      
      if (!response.ok) {
        console.error('Serwer zwrócił błąd:', response.status);
        return; 
      }
      
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
      const response = await fetch('http://localhost:8001/projects/', {
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

  return(
    <div className="min-h-screen p-6 md:p-12 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto">
        
       
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-blue-600 tracking-tight">SUMUP <span className="text-2xl"></span></h1>
          <p className="text-gray-500 mt-2">Twój system zarządzania projektami</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Dodaj nowy projekt</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Nazwa</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="np. Aplikacja ML"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Opis</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    placeholder="Krótkie streszczenie..."
                  />
                </div>
                <button 
                  type="submit" 
                  className="mt-2 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Zapisz projekt
                </button>
              </form>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-full">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Twoje projekty</h2>
              
              {projects.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-400">Brak projektów. Dodaj pierwszy z panelu obok</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {projects.map((proj) => (
                    <li key={proj.id} className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-bold text-gray-800">{proj.name}</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          {proj.status}
                        </span>
                      </div>
                      {proj.description && (
                        <p className="text-gray-600 text-sm mt-1">{proj.description}</p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
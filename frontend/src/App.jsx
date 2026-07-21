import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderPlus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  PauseCircle,
  Plus,
  LayoutGrid
} from 'lucide-react';

function App() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8001/projects/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await fetchProjects();
      } else {
        console.error('Błąd podczas usuwania projektu');
      }
    } catch (error) {
      console.error('Błąd usuwania:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8001/projects/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        await fetchProjects();
      } else {
        console.error('Błąd podczas zmiany statusu');
      }
    } catch (error) {
      console.error('Błąd zmiany statusu:', error);
    }
  };

  const getStatusConfig = (status) => {
    switch(status) {
      case 'completed':
        return { icon: <CheckCircle2 className="w-4 h-4" />, color: 'text-emerald-600 bg-emerald-50 border-emerald-200', label: 'Zakończony' };
      case 'on hold':
        return { icon: <PauseCircle className="w-4 h-4" />, color: 'text-amber-600 bg-amber-50 border-amber-200', label: 'Wstrzymany' };
      default:
        return { icon: <Clock className="w-4 h-4" />, color: 'text-blue-600 bg-blue-50 border-blue-200', label: 'W trakcie' };
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-hidden">
      
      {/* Dekoracyjne tło */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-400/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto p-6 md:p-12 relative z-10">
        
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 flex items-center gap-3">
              <LayoutGrid className="w-10 h-10 text-blue-600" />
              SUMUP
            </h1>
            <p className="text-gray-500 mt-2 font-medium text-lg">Twój inteligentny system zarządzania projektami</p>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    
          {/* Panel dodawania */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 sticky top-6"
          >
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
              <div className="flex items-center gap-2 mb-6">
                <FolderPlus className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-800">Nowy projekt</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nazwa projektu</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm placeholder:text-gray-400"
                    placeholder="np. Analiza Danych 2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Opis</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all shadow-sm resize-none placeholder:text-gray-400"
                    placeholder="Krótkie streszczenie celów projektu..."
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="mt-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Zapisz projekt
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Lista projektów */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-8"
          >
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 min-h-[500px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Twoje projekty</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
                  {projects.length}
                </span>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-48">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : projects.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center py-20 px-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50"
                >
                  <FolderPlus className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg font-medium">Nie masz jeszcze żadnych projektów</p>
                  <p className="text-gray-400 mt-1">Rozpocznij dodając swój pierwszy projekt w panelu obok</p>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  <AnimatePresence>
                    {projects.map((proj) => {
                      const statusConfig = getStatusConfig(proj.status);
                      
                      return (
                        <motion.div 
                          key={proj.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          whileHover={{ y: -2 }}
                          className="group p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{proj.name}</h4>
                            {proj.description && (
                              <p className="text-gray-500 mt-2 leading-relaxed">{proj.description}</p>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${statusConfig.color}`}>
                              {statusConfig.icon}
                              <select 
                                value={proj.status}
                                onChange={(e) => handleStatusChange(proj.id, e.target.value)}
                                className="bg-transparent border-none outline-none cursor-pointer appearance-none pr-4"
                                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                              >
                                <option value="in progress">W trakcie</option>
                                <option value="completed">Zakończony</option>
                                <option value="on hold">Wstrzymany</option>
                              </select>
                            </div>
                            
                            <motion.button 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(proj.id)}
                              className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors flex-shrink-0"
                              title="Usuń projekt"
                            >
                              <Trash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default App;
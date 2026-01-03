import React, { useEffect, useState } from 'react';
import API from '../api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask) return;
    await API.post('/tasks', { title: newTask });
    setNewTask('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-black text-gray-900">Your <span className="text-primary">Workspace</span></h1>
        <input 
          type="text" placeholder="Search tasks..." 
          className="p-3 border rounded-xl w-full md:w-64 bg-surface shadow-sm focus:ring-2 focus:ring-accent outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <form onSubmit={addTask} className="flex gap-3 mb-10">
        <input 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 p-4 border rounded-xl bg-surface shadow-inner focus:border-primary outline-none" 
          placeholder="Plan your next move..." 
        />
        <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-blue-100">
          Add
        </button>
      </form>

      <div className="space-y-4">
        {filteredTasks.length > 0 ? filteredTasks.map(task => (
          <div key={task._id} className="bg-surface p-5 rounded-2xl shadow-sm border border-gray-50 flex justify-between items-center group hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-2 h-10 bg-accent rounded-full"></div>
              <span className="text-gray-700 text-lg font-medium">{task.title}</span>
            </div>
            <button 
              onClick={() => deleteTask(task._id)}
              className="text-danger hover:scale-110 transition-transform font-semibold p-2"
            >
              Remove
            </button>
          </div>
        )) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400">No active tasks found in this view.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
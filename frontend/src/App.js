import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // адрес
    fetch('http://localhost:8000/api/test-user/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка сети');
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="App">
      <h1>Сувенирный магазин</h1>
      <h2>Тестовый пользователь с бека:</h2>
      <p>ID: {user.id}</p>
      <p>Имя: {user.first_name} {user.last_name}</p>
      <p>Логин: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default App;

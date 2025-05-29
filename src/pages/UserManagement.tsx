import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/baseService';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<{id: string, userName: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://evrenblackbird.com/AllUsers');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Kullanıcılar alınamadı.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlock = async (id: string) => {
    setDeleting(id);
    try {
      await axiosInstance.delete(`${id}`);
      await fetchUsers(); // Silme sonrası tekrar çek
    } catch (err) {
      alert('Kullanıcı silinemedi!');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="user-management-page">
      <h1>User Management</h1>
      <div className="content-container">
        {loading && <p>Loading...</p>}
        {error && <p style={{color: 'red'}}>{error}</p>}
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
          {users.map(user => (
            <div key={user.id} className="card" style={{padding: '1rem', border: '1px solid #ccc', borderRadius: 8, minWidth: 220}}>
              <div><strong>User Name:</strong> {user.userName}</div>
              <button
                className="btn btn-danger"
                style={{marginTop: 12, width: '100%', opacity: deleting === user.id ? 0.6 : 1}}
                onClick={() => handleBlock(user.id)}
                disabled={deleting === user.id}
              >
                {deleting === user.id ? 'Blocking...' : 'Block'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

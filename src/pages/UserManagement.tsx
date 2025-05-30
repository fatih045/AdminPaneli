import React, { useEffect, useState } from 'react';
import axiosInstance from '../services/baseService';

interface User {
  id: string;
  userName: string;
  isLocked: boolean;
  lockoutEnd: string | null;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('AllUsers');
      setUsers(response.data);
    } catch (err) {
      setError('Kullanıcılar alınamadı.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlockUnblock = async (id: string, isLocked: boolean) => {
    setProcessing(id);
    try {
      const endpoint = isLocked ? `Unlock/${id}` : `Lockout/${id}`;
      await axiosInstance.post(endpoint);
      await fetchUsers(); 
    } catch (err) {
      alert(isLocked ? 'Kullanıcı kilidi açılamadı!' : 'Kullanıcı kilitlenemedi!');
    } finally {
      setProcessing(null);
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
              <div><strong>Status:</strong> {user.isLocked ? 'Blocked' : 'Active'}</div>
              <button
                className={user.isLocked ? "btn btn-success" : "btn btn-danger"}
                style={{
                  marginTop: 12, 
                  width: '100%', 
                  opacity: processing === user.id ? 0.6 : 1,
                  backgroundColor: user.isLocked ? '#28a745' : '#dc3545'
                }}
                onClick={() => handleBlockUnblock(user.id, user.isLocked)}
                disabled={processing === user.id}
              >
                {processing === user.id 
                  ? (user.isLocked ? 'Unblocking...' : 'Blocking...') 
                  : (user.isLocked ? 'Unblock' : 'Block')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

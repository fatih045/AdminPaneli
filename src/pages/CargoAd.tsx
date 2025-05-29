import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { getAllCargoAds, acceptCargoAd, rejectCargoAd } from '../slice/cargoAdSlice';

const getAdminId = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    const user = JSON.parse(userStr);
    return user.adminId || user.id || null;
  } catch {
    return null;
  }
};

const CargoAd: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cargoAds, isLoading, isError, message } = useSelector((state: RootState) => state.cargoAd);
  const adminId = getAdminId();
  const [actionedIds, setActionedIds] = useState<{[cargoId: number]: boolean}>({});

  useEffect(() => {
    dispatch(getAllCargoAds());
  }, [dispatch]);

  useEffect(() => {
    if (cargoAds.length > 0) {
      setActionedIds((prev) => {
        const updated: {[cargoId: number]: boolean} = {};
        cargoAds.forEach(ad => {
          updated[ad.id] = prev[ad.id] || false;
        });
        return updated;
      });
    }
  }, [cargoAds]);

  const handleAccept = (id: number) => {
    if (!adminId) return;
    setActionedIds(prev => ({ ...prev, [id]: true }));
    dispatch(acceptCargoAd({ cargoId: id, adminId })).then(() => {
      dispatch(getAllCargoAds());
    });
  };

  const handleReject = (id: number) => {
    if (!adminId) return;
    setActionedIds(prev => ({ ...prev, [id]: true }));
    dispatch(rejectCargoAd({ cargoId: id, adminId })).then(() => {
      dispatch(getAllCargoAds());
    });
  };

  return (
    <div className="cargo-ad-page">
      <h1>Cargo Advertisement</h1>
      <div className="content-container">
        {isLoading && <p>Loading...</p>}
        {isError && <p style={{color: 'red'}}>{message}</p>}
        {!isLoading && !isError && cargoAds.length === 0 && <p>No cargo ads found.</p>}
        {cargoAds
          .filter(ad => !(adminId && (ad.admin1Id === adminId || ad.admin2Id === adminId)))
          .map((ad) => {
            const disabled = !adminId || actionedIds[ad.id];
            return (
              <div className="card" key={ad.id} style={{marginBottom: '1.5rem'}}>
                <h2>{ad.title}</h2>
                <p><strong>Müşteri:</strong> {ad.customerName}</p>
                <p><strong>Açıklama:</strong> {ad.description}</p>
                <p><strong>Yük Tipi:</strong> {ad.cargoType} | <strong>Ağırlık:</strong> {ad.weight} kg</p>
                <p><strong>Çıkış:</strong> {ad.pickCity}, {ad.pickCountry} &rarr; <strong>Varış:</strong> {ad.dropCity}, {ad.dropCountry}</p>
                <p><strong>Fiyat:</strong> {ad.price} {ad.currency}</p>
                <p><strong>Durum:</strong> {ad.status}</p>
                <p><strong>İlan Tarihi:</strong> {ad.adDate}</p>
                <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAccept(ad.id)}
                    disabled={disabled}
                    style={disabled ? { backgroundColor: '#ccc', color: '#888', borderColor: '#ccc', cursor: 'not-allowed' } : {}}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleReject(ad.id)}
                    disabled={disabled}
                    style={disabled ? { backgroundColor: '#ccc', color: '#888', borderColor: '#ccc', cursor: 'not-allowed' } : {}}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CargoAd;

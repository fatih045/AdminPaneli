import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { getAllVehicleAds, acceptVehicleAd, rejectVehicleAd } from '../slice/vehicleAdSlice';

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

const VehicleAd: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { vehicleAds, isLoading, isError, message } = useSelector((state: RootState) => state.vehicleAd);
  const adminId = getAdminId();
  const [actionedIds, setActionedIds] = useState<{[vehicleAdId: number]: boolean}>({});

  useEffect(() => {
    dispatch(getAllVehicleAds());
  }, [dispatch]);

  useEffect(() => {
    if (vehicleAds.length > 0) {
      setActionedIds((prev) => {
        const updated: {[vehicleAdId: number]: boolean} = {};
        vehicleAds.forEach(ad => {
          updated[ad.id] = prev[ad.id] || false;
        });
        return updated;
      });
    }
  }, [vehicleAds]);

  const handleAccept = (id: number) => {
    if (!adminId) return;
    setActionedIds(prev => ({ ...prev, [id]: true }));
    dispatch(acceptVehicleAd({ vehicleAdId: id, adminId })).then(() => {
      dispatch(getAllVehicleAds());
    });
  };

  const handleReject = (id: number) => {
    if (!adminId) return;
    setActionedIds(prev => ({ ...prev, [id]: true }));
    dispatch(rejectVehicleAd({ vehicleAdId: id, adminId })).then(() => {
      dispatch(getAllVehicleAds());
    });
  };

  return (
    <div className="vehicle-ad-page">
      <h1>Vehicle Advertisement</h1>
      <div className="content-container">
        {isLoading && <p>Loading...</p>}
        {isError && <p style={{color: 'red'}}>{message}</p>}
        {!isLoading && !isError && vehicleAds.length === 0 && <p>No vehicle ads found.</p>}
        {vehicleAds
          .filter(ad => !(adminId && (ad.admin1Id === adminId || ad.admin2Id === adminId)))
          .map((ad) => {
            const disabled = !adminId || actionedIds[ad.id];
            return (
              <div className="card" key={ad.id} style={{marginBottom: '1.5rem'}}>
                <h2>{ad.title}</h2>
                <p><strong>İlan Sahibi:</strong> {ad.carrierName}</p>
                <p><strong>Açıklama:</strong> {ad.description}</p>
                <p><strong>Araç Tipi:</strong> {ad.vehicleType}</p>
                <p><strong>Lokasyon:</strong> {ad.city}, {ad.country}</p>
                <p><strong>Kapasite:</strong> {ad.capacity} kg</p>
                <p><strong>Durum:</strong> {ad.status}</p>
                <p><strong>İlan Tarihi:</strong> {ad.adDate.slice(0, 10)}</p>
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

export default VehicleAd;

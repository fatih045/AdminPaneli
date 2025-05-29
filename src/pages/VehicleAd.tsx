import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { getAllVehicleAds, acceptVehicleAd, rejectVehicleAd } from '../slice/vehicleAdSlice';

const VehicleAd: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { vehicleAds, isLoading, isError, message } = useSelector((state: RootState) => state.vehicleAd);

  useEffect(() => {
    dispatch(getAllVehicleAds());
  }, [dispatch]);

  const handleAccept = (id: number) => {
    // Burada adminId'yi gerçek kullanıcıdan almalısınız, örnek olarak 'admin1' yazıldı
    dispatch(acceptVehicleAd({ vehicleAdId: id, adminId: 'admin1' }));
  };

  const handleReject = (id: number) => {
    dispatch(rejectVehicleAd({ vehicleAdId: id, adminId: 'admin1' }));
  };

  return (
    <div className="vehicle-ad-page">
      <h1>Vehicle Advertisement</h1>
      <div className="content-container">
        {isLoading && <p>Loading...</p>}
        {isError && <p style={{color: 'red'}}>{message}</p>}
        {!isLoading && !isError && vehicleAds.length === 0 && <p>No vehicle ads found.</p>}
        {vehicleAds.map((ad) => (
          <div className="card" key={ad.id} style={{marginBottom: '1.5rem'}}>
            <h2>{ad.title}</h2>
            <p><strong>Sürücü:</strong> {ad.carrierName}</p>
            <p><strong>Açıklama:</strong> {ad.description}</p>
            <p><strong>Araç Tipi:</strong> {ad.vehicleType}</p>
            <p><strong>Lokasyon:</strong> {ad.city}, {ad.country}</p>
            <p><strong>Kapasite:</strong> {ad.capacity} kg</p>
            <p><strong>Durum:</strong> {ad.status}</p>
            <p><strong>İlan Tarihi:</strong> {ad.adDate}</p>
            <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
              <button className="btn btn-primary" onClick={() => handleAccept(ad.id)}>Accept</button>
              <button className="btn btn-danger" onClick={() => handleReject(ad.id)}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleAd;

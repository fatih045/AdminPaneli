import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { getAllVehicleOffers, acceptVehicleOffer, rejectVehicleOffer } from '../slice/vehicleAdOfferSlice';
import type { VehicleOffer } from '../services/vehicleAdOfferService';
import userManagementService from '../services/userManagementService';

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

const VehicleAdOffer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { vehicleOffers, isLoading, isError, message } = useSelector((state: RootState & { vehicleAdOffer: any }) => state.vehicleAdOffer);
  const adminId = getAdminId();
  const [actionedIds, setActionedIds] = useState<{[offerId: number]: boolean}>({});
  const [userNames, setUserNames] = useState<{[id: string]: string}>({});

  useEffect(() => {
    dispatch(getAllVehicleOffers());
  }, [dispatch]);

  useEffect(() => {
    if (vehicleOffers.length > 0) {
      setActionedIds((prev) => {
        const updated: {[offerId: number]: boolean} = {};
        vehicleOffers.forEach((offer: VehicleOffer) => {
          updated[offer.id] = prev[offer.id] || false;
        });
        return updated;
      });
    }
  }, [vehicleOffers]);

  useEffect(() => {
    const ids = new Set<string>();
    vehicleOffers.forEach((offer: VehicleOffer) => {
      if (offer.senderId) ids.add(offer.senderId.toString());
      if (offer.receiverId) ids.add(offer.receiverId.toString());
    });
    Array.from(ids).forEach(async (id) => {
      if (!userNames[id]) {
        try {
          const data = await userManagementService.fetchUserInfoById(id);
          setUserNames(prev => ({ ...prev, [id]: `${data.name} ${data.surname}` }));
        } catch {
          setUserNames(prev => ({ ...prev, [id]: id }));
        }
      }
    });
  }, [vehicleOffers]);

  const handleAccept = (id: number) => {
    if (!adminId) return;
    setActionedIds(prev => ({ ...prev, [id]: true }));
    dispatch(acceptVehicleOffer({ id, adminId })).then(() => {
      dispatch(getAllVehicleOffers());
    });
  };

  const handleReject = (id: number) => {
    if (!adminId) return;
    setActionedIds(prev => ({ ...prev, [id]: true }));
    dispatch(rejectVehicleOffer({ id, adminId })).then(() => {
      dispatch(getAllVehicleOffers());
    });
  };

  return (
    <div className="vehicle-ad-offer-page">
      <h1>Vehicle Advertisement Offers</h1>
      <div className="content-container">
        {isLoading && <p>Loading...</p>}
        {isError && <p style={{color: 'red'}}>{message}</p>}
        {!isLoading && !isError && vehicleOffers.length === 0 && <p>No vehicle offers found.</p>}
        {vehicleOffers
          .filter((offer: VehicleOffer) => !(adminId && (offer.admin1Id === adminId || offer.admin2Id === adminId)))
          .filter((offer: VehicleOffer) => offer.adminStatus === 'Pending')
          .map((offer: VehicleOffer) => {
            const disabled = !adminId || actionedIds[offer.id];
            return (
              <div className="card" key={offer.id} style={{marginBottom: '1.5rem'}}>
                <h2>{offer.vehicleAdTitle}</h2>
                <p><strong>Teklif Veren:</strong> {userNames[offer.senderId] || offer.senderId}</p>
                <p><strong>Alıcı:</strong> {userNames[offer.receiverId] || offer.receiverId}</p>
                <p><strong>Mesaj:</strong> {offer.message}</p>
                <p><strong>Durum:</strong> {offer.adminStatus}</p>
                <p><strong>Bitiş Tarihi:</strong> {offer.expiryDate ? offer.expiryDate.slice(0, 10) : ''}</p>
                <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAccept(offer.id)}
                    disabled={disabled}
                    style={disabled ? { backgroundColor: '#ccc', color: '#888', borderColor: '#ccc', cursor: 'not-allowed' } : {}}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleReject(offer.id)}
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

export default VehicleAdOffer;

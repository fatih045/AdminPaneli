import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { getAllCargoOffers, acceptCargoOffer, rejectCargoOffer } from '../slice/cargoAdOfferSlice';
import type { CargoOffer } from '../services/cargoAdOfferService';

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

const CargoAdOffer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cargoOffers, isLoading, isError, message } = useSelector((state: RootState & { cargoAdOffer: any }) => state.cargoAdOffer);
  const adminId = getAdminId();
  const [actionedIds, setActionedIds] = useState<{[offerId: number]: boolean}>({});

  useEffect(() => {
    dispatch(getAllCargoOffers());
  }, [dispatch]);

  useEffect(() => {
    if (cargoOffers.length > 0) {
      setActionedIds((prev) => {
        const updated: {[offerId: number]: boolean} = {};
        cargoOffers.forEach((offer: CargoOffer) => {
          updated[offer.id] = prev[offer.id] || false;
        });
        return updated;
      });
    }
  }, [cargoOffers]);

  const handleAccept = (id: number) => {
    if (!adminId) return;
    setActionedIds(prev => ({ ...prev, [id]: true }));
    dispatch(acceptCargoOffer({ id, adminId })).then(() => {
      dispatch(getAllCargoOffers());
    });
  };

  const handleReject = (id: number) => {
    if (!adminId) return;
    setActionedIds(prev => ({ ...prev, [id]: true }));
    dispatch(rejectCargoOffer({ id, adminId })).then(() => {
      dispatch(getAllCargoOffers());
    });
  };

  return (
    <div className="cargo-ad-offer-page">
      <h1>Cargo Advertisement Offers</h1>
      <div className="content-container">
        {isLoading && <p>Loading...</p>}
        {isError && <p style={{color: 'red'}}>{message}</p>}
        {!isLoading && !isError && cargoOffers.length === 0 && <p>No cargo offers found.</p>}
        {cargoOffers
          .filter((offer: CargoOffer) => !(adminId && (offer.admin1Id === adminId || offer.admin2Id === adminId)))
          .map((offer: CargoOffer) => {
            const disabled = !adminId || actionedIds[offer.id];
            return (
              <div className="card" key={offer.id} style={{marginBottom: '1.5rem'}}>
                <h2>{offer.cargoAdTitle}</h2>
                <p><strong>Teklif Veren:</strong> {offer.senderId}</p>
                <p><strong>Alıcı:</strong> {offer.receiverId}</p>
                <p><strong>Fiyat:</strong> {offer.price}</p>
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

export default CargoAdOffer;

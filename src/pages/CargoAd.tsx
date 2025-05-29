import React from 'react';

// Mock data
const mockCargoAds = [
  {
    id: 1,
    customerName: 'Ali Veli',
    title: 'İstanbul -> Berlin',
    description: 'Mobilya taşınacak',
    pickCountry: 'Türkiye',
    pickCity: 'İstanbul',
    dropCountry: 'Almanya',
    dropCity: 'Berlin',
    weight: 1200,
    cargoType: 'Mobilya',
    price: 2500,
    currency: 'EUR',
    status: 'Beklemede',
    adDate: '2024-06-01',
  },
  {
    id: 2,
    customerName: 'Ayşe Demir',
    title: 'Ankara -> Paris',
    description: 'Elektronik ürünler',
    pickCountry: 'Türkiye',
    pickCity: 'Ankara',
    dropCountry: 'Fransa',
    dropCity: 'Paris',
    weight: 800,
    cargoType: 'Elektronik',
    price: 1800,
    currency: 'EUR',
    status: 'Onaylandı',
    adDate: '2024-06-02',
  },
];

const CargoAd: React.FC = () => {
  return (
    <div className="cargo-ad-page">
      <h1>Cargo Advertisement</h1>
      <div className="content-container">
        {mockCargoAds.map((ad) => (
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
              <button className="btn btn-primary" onClick={() => alert(`Accepted: ${ad.id}`)}>Accept</button>
              <button className="btn btn-danger" onClick={() => alert(`Rejected: ${ad.id}`)}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CargoAd;

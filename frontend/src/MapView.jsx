import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ shops, selectedShop, selectedArea }) => {
  const mapRef = useRef(null);
  const markersRef = useRef({});

  const areaCenters = {
    morioka: [39.7036, 141.1527],
    kitakami: [39.2836, 141.1137],
    hanamaki: [39.3892, 141.1167],
  };

  useEffect(() => {
    const defaultCenter = areaCenters[selectedArea] || [39.7036, 141.1527];
    const map = L.map('map').setView(defaultCenter, 13);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    shops.forEach(shop => {
      if (shop.lat && shop.lng) {
        const marker = L.marker([shop.lat, shop.lng])
          .addTo(map)
          .bindPopup(`<strong>${shop.name}</strong><br>${shop.comment || ''}`);
        markersRef.current[shop.id] = marker;
      }
    });

    return () => map.remove();
  }, [shops]);

  useEffect(() => {
    // 地域が切り替わったときに中心移動
    const center = areaCenters[selectedArea];
    if (center && mapRef.current) {
      mapRef.current.setView(center, 13);
    }
  }, [selectedArea]);

  useEffect(() => {
    if (selectedShop && mapRef.current) {
      const { lat, lng, id } = selectedShop;
      mapRef.current.setView([lat, lng], 16);
      const marker = markersRef.current[id];
      if (marker) marker.openPopup();
    }
  }, [selectedShop]);

  return <div id="map" style={{ height: '500px' }}></div>;
};

export default MapView;

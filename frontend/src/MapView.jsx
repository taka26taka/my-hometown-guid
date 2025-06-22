import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ shops, selectedShop, selectedArea }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const markersRef = useRef({});
  
  const areaCenters = {
    morioka: [39.7036, 141.1527],
    kitakami: [39.2836, 141.1137],
    hanamaki: [39.3892, 141.1167],
  };

  // 初回のみマップ作成
  useEffect(() => {
    if (!mapRef.current) {
      const defaultCenter = areaCenters[selectedArea] || [39.7036, 141.1527];
      mapRef.current = L.map(mapContainerRef.current).setView(defaultCenter, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // マーカーの更新
  useEffect(() => {
    if (!mapRef.current) return;

    // 既存のマーカーを削除
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    shops.forEach(shop => {
      if (shop.lat && shop.lng) {
        const marker = L.marker([shop.lat, shop.lng])
          .addTo(mapRef.current)
          .bindPopup(`<strong>${shop.name}</strong><br>${shop.comment || ''}`);
        markersRef.current[shop.id] = marker;
      }
    });
  }, [shops]);

  // 地域変更で中心位置移動
  useEffect(() => {
    const center = areaCenters[selectedArea];
    if (center && mapRef.current) {
      mapRef.current.setView(center, 13);
    }
  }, [selectedArea]);

  // 店舗選択でポップアップ表示＆ズーム
  useEffect(() => {
    if (selectedShop && mapRef.current) {
      const { lat, lng, id } = selectedShop;
      mapRef.current.setView([lat, lng], 16);
      const marker = markersRef.current[id];
      if (marker) marker.openPopup();
    }
  }, [selectedShop]);

  return <div ref={mapContainerRef} id="map" style={{ height: '500px' }} />;
};

export default MapView;
'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
import React from 'react';

interface Device {
  id: string;
  name: string;
  isOnline: boolean;
  location: { lat: number; lng: number };
}

interface LocationPoint {
  lat: number;
  lng: number;
}

interface Props {
  devices: Device[];
  path?: LocationPoint[];
}

const greenIcon = new Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function MapComponent({ devices, path }: Props) {
  const defaultPosition = devices[0]?.location || path?.[0] || { lat: 20.5937, lng: 78.9629 };

  return (
    <MapContainer
      center={defaultPosition}
      zoom={6}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {devices.map((device) => (
        <Marker
          key={device.id}
          position={device.location}
          icon={device.isOnline ? greenIcon : redIcon}
        >
          <Popup>
            <strong>{device.name}</strong>
            <br />
            Status: {device.isOnline ? 'Online' : 'Offline'}
          </Popup>
        </Marker>
      ))}
      {path && path.length > 0 && (
        <Polyline
          positions={path.map(({ lat, lng }) => [lat, lng])}
          color="blue"
          weight={4}
        />
      )}
    </MapContainer>
  );
}

// 👇 Needed for dynamic import to work
export default MapComponent;

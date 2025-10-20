import React from "react";
import { useState, useEffect } from "react";

import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"
import axios from "axios";
import {server_url} from './config/url'

// Create custom Diya icon
const diyaIcon = L.divIcon({
  className: 'custom-diya-marker',
  html: `<div style="font-size: 32px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">🪔</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

export default function WishesMap() {
    const[wishes, setWishes] = useState([]);
    
    useEffect(()=>{
        dofetch();
    },[]);
    
    async function dofetch () {
        try{
            let url = server_url + "/wish/doFetch";
            
            let resp = await axios.post(url);
            setWishes(
                resp.data
            )
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="w-full h-[500px] md:h-[700px] rounded-xl shadow-lg overflow-hidden">
            <MapContainer center={[20.5937, 78.9629]} zoom={5} className="w-full h-full">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
                {wishes.map((wish, idx) => (
                    <Marker
                        key={idx}
                        position={[wish.latitude || 20.5937, wish.longitude || 78.9629]}
                        icon={diyaIcon}
                    >
                        <Popup maxWidth={300} className="custom-popup">
                        <div 
                            className="flex flex-col items-center p-4 rounded-lg"
                            style={{
                                background: 'linear-gradient(135deg, rgba(254, 240, 138, 0.95) 0%, rgba(251, 191, 36, 0.95) 50%, rgba(251, 146, 60, 0.95) 100%)',
                                backgroundImage: `
                                    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
                                    radial-gradient(circle at 80% 70%, rgba(251, 146, 60, 0.4) 0%, transparent 50%),
                                    linear-gradient(135deg, rgba(254, 240, 138, 0.95) 0%, rgba(251, 191, 36, 0.95) 50%, rgba(251, 146, 60, 0.95) 100%)
                                `,
                                boxShadow: '0 10px 25px rgba(251, 146, 60, 0.3)',
                                border: '2px solid rgba(251, 191, 36, 0.6)'
                            }}
                        >
                            <div className="w-24 h-24 mb-3">
                                {wish.picpath && wish.picpath !== "nopic.jpg" ? (
                                    <img
                                        src={wish.picpath}
                                        alt="User pic"
                                        className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                                    />
                                    ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white rounded-full border-4 border-orange-300 shadow-lg">
                                        <span className="text-4xl">👤</span>
                                    </div>
                                    )
                                }
                            </div>
                            <h3 className="font-bold text-xl text-orange-900 mb-1">{wish.name}</h3>
                            <p className="text-orange-800 font-semibold mb-2 flex items-center gap-1">
                                📍 {wish.city}
                            </p>
                            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 mb-2 w-full">
                                <p className="text-gray-800 text-center italic">{wish.message}</p>
                            </div>
                            <p className="text-4xl mt-2">{wish.emoji}</p>
                        </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            
            <style jsx>{`
                .custom-diya-marker {
                    background: transparent !important;
                    border: none !important;
                }
                
                .leaflet-popup-content-wrapper {
                    background: transparent !important;
                    box-shadow: none !important;
                    padding: 0 !important;
                }
                
                .leaflet-popup-content {
                    margin: 0 !important;
                    width: auto !important;
                }
                
                .leaflet-popup-tip {
                    background: rgba(251, 191, 36, 0.95) !important;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
                }
            `}</style>
        </div>
  );
}
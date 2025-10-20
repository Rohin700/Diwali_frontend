import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import HomePage from './home.jsx'
import WishesMap from './mapDisplay.jsx';

import './tailwind.css';
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById('root')).render(
  <HomePage></HomePage>
  // <WishesMap></WishesMap>
)

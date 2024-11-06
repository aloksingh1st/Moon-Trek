import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Stars from './components/Stars.jsx';
import Moon from './components/Moon.jsx';
import MoonTerrain from './components/MoonTerrain.jsx';
import './App.css';
import { cameraPosition } from 'three/webgpu';
import MarkerOnMoon from './components/MoonMarker.jsx';
import lunarData from './data/craterAndMountains.jsx';
import lognonne2003MoonquakeData from './data/lognonneMoonquake';
import nakamura1979MoonquakeData from './data/nakamuraMoonquake';
import seaAndOceanData from './data/seasAndOceans';
import ColoredSwitch from './components/ColoredSwitch';
import isroLandingSites from './data/isroLandingSites';
import WelcomePrompt from './components/WelcomePrompt';

const markerColors = {
  "Mare": "#8B4513",  // brown
  "Oceanus": "#4682B4",  // steel blue
  "Artificial Impact": "#FFA500",  // orange
  "Meteorite Impact": "#800080",  // purple
  "Shallow Moonquake": "#FF0000",  // red
  "Deep Moonquake": "#8B0000"  // dark red
};

const markerSizes = {
  "Mare": 0.02,
  "Oceanus": 0.025,
  "Artificial Impact": 0.01,
  "Meteorite Impact": 0.01,
  "Shallow Moonquake": 0.015,
  "Deep Moonquake": 0.015
};

function App() {
  const [cameraPosition, setCameraPosition] = useState({ zoom: 1 });
  const [showMountains, setShowMountains] = useState(true);
  const [showCraters, setShowCraters] = useState(true);
  const [showPeaks, setShowPeaks] = useState(true);
  const [showArtificialImpacts, setShowArtificialImpacts] = useState(false);
  const [showMeteoriteImpacts, setShowMeteoriteImpacts] = useState(false);
  const [showShallowMoonquakes, setShowShallowMoonquakes] = useState(false);
  const [showDeepMoonquakes, setShowDeepMoonquakes] = useState(false);
  const [showSeasAndOceans, setShowSeasAndOceans] = useState(true);
  const [showLandingSites, setShowLandingSites] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleCameraChange = (camera) => {
    // Calculate zoom based on camera position
    const newZoom = Math.max(0.5, 1 / camera.position.z); // Adjust zoom based on z position
    setCameraPosition({ zoom: newZoom });
  };

  const markLandingSites = (e) => {
    setShowLandingSites(e.target.checked);
  };

  return (
    <>
      {showWelcome && <WelcomePrompt onComplete={() => setShowWelcome(false)} />}
      <div className="App">
        <Stars cameraPosition={cameraPosition} />
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Moon />
          <OrbitControls
            enableZoom={true}
            onChange={(event) => handleCameraChange(event.target.object)}
          />
          {showMountains && lunarData.mountains.map((mountain, index) => (
            <MarkerOnMoon
              key={`mountain-${index}`}
              latitude={mountain.lat}
              longitude={mountain.lon}
              name={mountain.name}
              color="#ff4444"  // red
              size={0.015}
              type="Mountain"
            />
          ))}
          {showCraters && lunarData.craters.map((crater, index) => (
            <MarkerOnMoon
              key={`crater-${index}`}
              latitude={crater.lat}
              longitude={crater.lon}
              name={crater.name}
              color="#4444ff"  // blue
              size={0.015}
              type="Crater"
            />
          ))}
          {showPeaks && lunarData.peaks.map((peak, index) => (
            <MarkerOnMoon
              key={`peak-${index}`}
              latitude={peak.lat}
              longitude={peak.lon}
              name={peak.name}
              color="#44ff44"  // green
              size={0.015}
              type="Peak"
              additionalInfo={`Elevation: ${peak.elevation}m`}
            />
          ))}
          {showSeasAndOceans && seaAndOceanData.map((sea, index) => (
            <MarkerOnMoon
              key={`sea-${index}`}
              latitude={sea[1]}
              longitude={sea[2]}
              name={sea[0]}
              type={sea[0].startsWith('Mare') ? 'Mare' : 'Oceanus'}
              color={sea[0].startsWith('Mare') ? markerColors.Mare : markerColors.Oceanus}
              size={sea[0].startsWith('Mare') ? markerSizes.Mare : markerSizes.Oceanus}
            />
          ))}
          {lognonne2003MoonquakeData.map((quake, index) => {
            const showThis = 
              (quake.type[1] === "Artificial Impact" && showArtificialImpacts) ||
              (quake.type[1] === "Meteorite Impact" && showMeteoriteImpacts) ||
              (quake.type[1] === "Shallow Moonquake" && showShallowMoonquakes) ||
              (quake.type[1] === "Deep Moonquake" && showDeepMoonquakes);

            if (!showThis) return null;

            return (
              <MarkerOnMoon
                key={`lognonne-${index}`}
                latitude={quake.latitude}
                longitude={quake.longitude}
                name={quake.type[0]}
                type={quake.type[1]}
                color={markerColors[quake.type[1]]}
                size={markerSizes[quake.type[1]]}
                additionalInfo={quake.depth ? `Depth: ${quake.depth}km` : ''}
                pulseEffect={quake.type[1].includes('Moonquake')}
              />
            );
          })}
          {showShallowMoonquakes && nakamura1979MoonquakeData.map((quake, index) => (
            <MarkerOnMoon
              key={`nakamura-${index}`}
              latitude={quake.latitude}
              longitude={quake.longitude}
              name={`Shallow Moonquake ${quake.year}`}
              type="Shallow Moonquake"
              color={markerColors["Shallow Moonquake"]}
              size={markerSizes["Shallow Moonquake"]}
              additionalInfo={`Magnitude: ${quake.magnitude}`}
              pulseEffect={true}
            />
          ))}
          {showLandingSites && isroLandingSites.map((site, index) => (
            <MarkerOnMoon
              key={`landing-${index}`}
              latitude={site.latitude}
              longitude={site.longitude}
              name={site.name}
              type={site.type}
              color="#FFD700"  // gold color for landing sites
              size={0.02}
            />
          ))}
        </Canvas>

        <div className="switches-grid">
          <ColoredSwitch
            isOn={showMountains}
            handleToggle={() => setShowMountains(!showMountains)}
            color="#ff4444"
            label="Mountains"
          />
          <ColoredSwitch
            isOn={showCraters}
            handleToggle={() => setShowCraters(!showCraters)}
            color="#4444ff"
            label="Craters"
          />
          <ColoredSwitch
            isOn={showPeaks}
            handleToggle={() => setShowPeaks(!showPeaks)}
            color="#44ff44"
            label="Peaks"
          />
          <ColoredSwitch
            isOn={showShallowMoonquakes && showDeepMoonquakes}
            handleToggle={(e) => {
              const isChecked = e.target.checked;
              setShowShallowMoonquakes(isChecked);
              setShowDeepMoonquakes(isChecked);
              setShowArtificialImpacts(isChecked);
              setShowMeteoriteImpacts(isChecked);
            }}
            color="#FF0000"
            label="Moonquakes"
          />
          <ColoredSwitch
            isOn={showSeasAndOceans}
            handleToggle={() => setShowSeasAndOceans(!showSeasAndOceans)}
            color="#8B4513"
            label="Seas and Oceans"
          />
          <ColoredSwitch
            isOn={showLandingSites}
            handleToggle={() => setShowLandingSites(!showLandingSites)}
            color="#FFD700"
            label="ISRO Landing Sites"
          />
        </div>
      </div>
    </>
  );
}

export default App;

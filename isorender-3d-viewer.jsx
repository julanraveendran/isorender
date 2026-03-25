/**
 * IsoRender Frontend - 3D Viewer Component
 * Uses React Three Fiber for interactive 3D visualization
 * 
 * Install dependencies:
 * npm install three @react-three/fiber @react-three/drei
 */

import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows,
  Html,
  useProgress,
  PresentationControls
} from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useSpring, animated } from '@react-spring/three';

// Loading indicator
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ 
        color: 'white', 
        background: 'rgba(0,0,0,0.7)',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
          {progress.toFixed(0)}%
        </div>
        <div>Generating 3D Model...</div>
      </div>
    </Html>
  );
}

// The 3D Model component
function Model({ url, onLoad }) {
  const { scene } = useLoader(GLTFLoader, url);
  const modelRef = useRef();

  React.useEffect(() => {
    if (scene && onLoad) onLoad();
  }, [scene, onLoad]);

  return <primitive ref={modelRef} object={scene} scale={1} />;
}

// Lighting controls
function Lighting({ mode }) {
  const isDay = mode === 'day';
  
  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={isDay ? 0.5 : 0.2} />
      
      {/* Main directional light (sun/moon) */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={isDay ? 1.5 : 0.3}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      
      {/* Fill light */}
      <directionalLight 
        position={[-5, 5, -5]} 
        intensity={isDay ? 0.5 : 0.1}
      />
      
      {/* Environment map for realistic reflections */}
      <Environment preset={isDay ? 'sunset' : 'night'} />
    </>
  );
}

// Main 3D Viewer Component
export default function ThreeDViewer({ 
  modelUrl, 
  loading = false,
  lightingMode = 'day',
  onReady 
}) {
  const [modelLoaded, setModelLoaded] = useState(false);

  const handleModelLoad = () => {
    setModelLoaded(true);
    if (onReady) onReady();
  };

  return (
    <div style={{ width: '100%', height: '500px', position: 'relative' }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          color: 'white'
        }}>
          <Loader />
        </div>
      )}
      
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 50 }}
        style={{ background: lightingMode === 'day' ? '#f0f0f0' : '#1a1a2e' }}
      >
        <Suspense fallback={<Loader />}>
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            {modelUrl && (
              <Model url={modelUrl} onLoad={handleModelLoad} />
            )}
          </PresentationControls>
          
          <Lighting mode={lightingMode} />
          
          <ContactShadows 
            position={[0, -0.01, 0]} 
            opacity={0.5} 
            scale={10} 
            blur={2} 
            far={4} 
          />
          
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={20}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>

      {/* Controls UI */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px'
      }}>
        <button
          onClick={() => {}}
          style={{
            padding: '10px 20px',
            background: lightingMode === 'day' ? '#333' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ☀️ Day
        </button>
        <button
          onClick={() => {}}
          style={{
            padding: '10px 20px',
            background: lightingMode === 'night' ? '#333' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🌙 Night
        </button>
      </div>
    </div>
  );
}

// Usage example:
/*
import ThreeDViewer from './ThreeDViewer';

function App() {
  const [modelUrl, setModelUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    
    // Call your backend API
    const response = await fetch('/api/generate-3d', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        imageUrl: 'https://example.com/room.jpg',
        prompt: 'A modern living room'
      })
    });
    
    const { taskId } = await response.json();
    
    // Poll for completion
    const checkStatus = setInterval(async () => {
      const statusRes = await fetch(`/api/generate-3d/${taskId}`);
      const { status, modelUrl } = await statusRes.json();
      
      if (status === 'SUCCEEDED') {
        setModelUrl(modelUrl);
        setLoading(false);
        clearInterval(checkStatus);
      } else if (status === 'FAILED') {
        setLoading(false);
        clearInterval(checkStatus);
      }
    }, 3000);
  };

  return (
    <div>
      <ThreeDViewer 
        modelUrl={modelUrl}
        loading={loading}
        lightingMode="day"
        onReady={() => console.log('Model loaded!')}
      />
      <button onClick={handleGenerate}>Generate 3D</button>
    </div>
  );
}
*/
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';

interface FlowerProps {
  position: [number, number, number];
  color: string;
  size: number;
}

const Flower = ({ position, color, size }: FlowerProps) => {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[size * 0.8, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * Math.PI * 2) / 5;
        const x = Math.cos(angle) * size;
        const z = Math.sin(angle) * size;
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[size * 0.6, 12, 12]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.05} />
          </mesh>
        );
      })}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[size * 0.3, 8, 8]} />
        <meshStandardMaterial color="#FFD700" roughness={0.5} />
      </mesh>
      <mesh position={[0, -size * 2, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[size * 0.15, size * 0.15, size * 3, 8]} />
        <meshStandardMaterial color="#228B22" roughness={0.6} />
      </mesh>
    </group>
  );
};

interface BouquetViewer3DProps {
  flowers?: Array<{ color: string; count: number }>;
}

const BouquetViewer3D = ({ flowers = [
  { color: '#FF69B4', count: 5 },
  { color: '#FFB6C1', count: 4 },
  { color: '#FFC0CB', count: 3 }
] }: BouquetViewer3DProps) => {
  const generateFlowerPositions = () => {
    const positions: Array<{ position: [number, number, number]; color: string; size: number }> = [];
    let index = 0;
    
    flowers.forEach(({ color, count }) => {
      for (let i = 0; i < count; i++) {
        const radius = 1.5 + Math.random() * 0.8;
        const angle = (index * Math.PI * 2) / flowers.reduce((sum, f) => sum + f.count, 0) + Math.random() * 0.3;
        const height = Math.random() * 2 - 1;
        
        positions.push({
          position: [
            Math.cos(angle) * radius,
            height,
            Math.sin(angle) * radius
          ],
          color,
          size: 0.4 + Math.random() * 0.3
        });
        index++;
      }
    });
    
    return positions;
  };

  const flowerPositions = generateFlowerPositions();

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden bg-gradient-to-b from-sky-200 to-green-100">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} />
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={1}
        />
        
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <pointLight position={[-5, 5, -5]} intensity={0.5} />
          
          {flowerPositions.map((flower, i) => (
            <Flower key={i} {...flower} />
          ))}
          
          <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[1.5, 2, 1, 32]} />
            <meshStandardMaterial color="#8B4513" roughness={0.8} />
          </mesh>
          
          <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[2, 2.2, 0.3, 32]} />
            <meshStandardMaterial color="#654321" roughness={0.9} />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BouquetViewer3D;

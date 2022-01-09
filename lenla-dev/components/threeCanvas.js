import { Canvas } from '@react-three/fiber'


export default function Tp(props) {
    const {width, height} = props;
    return (
        <div style={{width: width, height: height}}>
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
            </Canvas>
        </div>
      
    )
  }
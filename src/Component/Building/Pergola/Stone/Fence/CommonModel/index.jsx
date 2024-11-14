export const RectModel = ({ modelSize, position=[0, 0, 0], rotation_1=[0, 0, 0], rotation_2=[0, 0, 0], color='#EEEEEE', map=null, bumpScale=0.5, roughness=0.7, metalness=0.3 }) => {
    return (
        <group position={position} rotation={rotation_1}>
            <mesh rotation={rotation_2}>
                <boxGeometry args={modelSize}/>
                <meshStandardMaterial color={color} map={map} bumpMap={map} bumpScale={bumpScale} roughness={roughness} metalness={metalness} />
            </mesh>
        </group>
    )
}
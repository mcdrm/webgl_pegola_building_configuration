import Pergola from "./Pergola"
import Surface from "./Surface"

const Building = () => {
    return (
        <group position={[0, -10, 0]}>
            <Pergola />
            <Surface />
        </group>
    )
}

export default Building
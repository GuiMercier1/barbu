import { ProvideModal } from './helpers/useModal'
import FullGame from './views/FullGame'

function App() {
    return (
        <ProvideModal>
            <FullGame />
        </ProvideModal>
    )
}

export default App

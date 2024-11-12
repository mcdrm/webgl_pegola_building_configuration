import './App.css';
import Component from './Component';
import { InitiallyAssetsLoad } from './Utils/Function';

function App() {
    InitiallyAssetsLoad();
    
    return (
        <div className="App">
            <Component />
        </div>
    );
}

export default App;

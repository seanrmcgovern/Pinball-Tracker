import React, {useState} from 'react';
import SearchBar from './SearchBar';
import PinballMap from './PinballMap';
import Drawer from './Drawer';
import Footer from '../layout/Footer';

const Dashboard = () => {

    const [isVisible, setIsVisible] = useState(false);

    const toggleDrawer = () => {
        setIsVisible(!isVisible);
    }

    const [arcadeSearchActive, setArcadeSearchActive] = useState(false);

    const [locationSearchActive, setLocationSearchActive] = useState(false);

    const toggleArcadeSearch = (value) => {
        setArcadeSearchActive(value);
    }

    const toggleLocationSearch = (value) => {
        setLocationSearchActive(value);
    }

    return (
        <div>
            <SearchBar toggleArcadeSearch={toggleArcadeSearch} toggleLocationSearch={toggleLocationSearch}/>
            <div style={{display: "flex"}}>
                <Drawer isVisible={isVisible} toggleDrawer={toggleDrawer} arcadeSearchActive={arcadeSearchActive} locationSearchActive={locationSearchActive}/>
                <PinballMap isVisible={isVisible} toggleDrawer={toggleDrawer}/>
            </div>
            <Footer/>
        </div>
    )
};

export default Dashboard;
import React, {useState} from 'react';
import SearchBar from './SearchBar';
import PinballMap from './PinballMap';
import Drawer from './Drawer';
import Footer from '../layout/Footer';

const Dashboard = () => {

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const [isVisible, setIsVisible] = useState(false);

    const toggleDrawer = () => {
        setIsVisible(!isVisible);
    }

    const [arcadeSearchActive, setArcadeSearchActive] = useState(false);

    const [locationSearchActive, setLocationSearchActive] = useState(false);

    const toggleArcadeSearch = (value) => {
        if (!value) setTabValue(0);
        setArcadeSearchActive(value);
    }

    const toggleLocationSearch = (value) => {
        setLocationSearchActive(value);
    }

    return (
        <div>
            <SearchBar toggleArcadeSearch={toggleArcadeSearch} toggleLocationSearch={toggleLocationSearch}/>
            <div style={{display: "flex"}}>
                <Drawer 
                    isVisible={isVisible} 
                    arcadeSearchActive={arcadeSearchActive} 
                    locationSearchActive={locationSearchActive} 
                    tabValue={tabValue}
                    handleTabChange={handleTabChange}/>
                <PinballMap isVisible={isVisible} toggleDrawer={toggleDrawer} tabValue={tabValue}/>
            </div>
            <Footer/>
        </div>
    )
};

export default Dashboard;
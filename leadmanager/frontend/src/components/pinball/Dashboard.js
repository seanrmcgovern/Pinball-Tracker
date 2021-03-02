import React, {useState} from 'react';
import Form from './Form';
import Leads from './Leads';
import SearchBar from './SearchBar';
import PinballMap from './PinballMap';
import Drawer from './Drawer';

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
            <footer>
                <div className="navbar navbar-inverse navbar-static-bottom" role="navigation">
                    <div className="navbar-text pull-left">
                        <a href="https://github.com/seanrmcgovern/django-redux" target="_blank">
                            Github
                        </a>
                    </div>
                    <div className="navbar-text pull-left">
                        <a href="https://icons8.com/icon/42828/marker" target="_blank">Marker icon by Icons8</a>
                    </div>
                </div>
            </footer>
        </div>
    )
};

export default Dashboard;
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

    const [searchActive, setSearchActive] = useState(false);

    const toggleSearch = (value) => {
        setSearchActive(value);
    }

    return (
        <div>
            <SearchBar toggleSearch={toggleSearch}/>
            <div style={{display: "flex"}}>
                <Drawer isVisible={isVisible} toggleDrawer={toggleDrawer} toggleSearch={toggleSearch} searchActive={searchActive}/>
                <PinballMap isVisible={isVisible} toggleDrawer={toggleDrawer}/>
            </div>
            {/* <Form />
            <Leads /> */}
            <footer>
                <div className="navbar navbar-inverse navbar-static-bottom" role="navigation">
                    <div className="navbar-text pull-left">
                        <a href="https://github.com/seanrmcgovern">
                            Github
                        </a>
                    </div>
                    <div className="navbar-text pull-left">
                        <a href="https://icons8.com/icon/42828/marker">Marker icon by Icons8</a>
                    </div>
                </div>
            </footer>
        </div>
    )
};

export default Dashboard;
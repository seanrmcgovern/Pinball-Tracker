import React, {useState} from 'react';
import Form from './Form';
import Leads from './Leads';
import PinballMap from './PinballMap';
import Drawer from './Drawer';

const Dashboard = () => {

    const [isVisible, setIsVisible] = useState(false);

    const toggleDrawer = () => {
        setIsVisible(!isVisible);
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" onClick={() => setIsVisible(!isVisible)}>
                Toggle
            </button>
            <div style={{display: "flex"}}>
                <Drawer isVisible={isVisible} toggleDrawer={toggleDrawer}/>
                <PinballMap isVisible={isVisible} toggleDrawer={toggleDrawer}/>
            </div>
            <Form />
            <Leads />
            <footer>
                <div class= "navbar navbar-inverse navbar-static-bottom" role="navigation">
                    <div class="navbar-text pull-left">
                        <a href="https://github.com/seanrmcgovern">
                            Github
                        </a>
                    </div>
                    <div class="navbar-text pull-left">
                        <a href="https://icons8.com/icon/42828/marker">Marker icon by Icons8</a>
                    </div>
                </div>
            </footer>
        </div>
    )
};

export default Dashboard;
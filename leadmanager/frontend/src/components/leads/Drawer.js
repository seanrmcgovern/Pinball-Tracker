import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group'; 
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabContent from './TabContent';

const Drawer = (props) => {

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const GREY = "#9E9E9E";

    const defaultStyle = {
        transition: `width .3s linear`,
        height: '100vh',
        backgroundColor: "#F5F9F9",
        boxShadow: `1px 1px 5px ${GREY}`
    };

    const transitionStyles = {
        entering: { width: '28vw', zIndex: 1 },
        entered: { width: '28vw', zIndex: 1 },
        exiting: { width: 0, zIndex: 0 },
        exited: { width: 0, zIndex: 0 }
    };

    return (
        <Transition in={props.isVisible} timeout={300}>
            {state => (
                <div style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        style={{color: "#00B875"}}
                        TabIndicatorProps={{style: {background: "#00B875"}}}
                    >
                        <Tab label="Curated Machines"/>
                        <Tab label="Community Content" />
                    </Tabs>
                    <TabContent value={tabValue} index={0}>
                        {props.machines?.locations?.map((mach) => (
                            <div>{mach.name}</div>
                        ))}
                    </TabContent>
                    <TabContent value={tabValue} index={1}>
                        User submitted Pinball Machines
                    </TabContent>
                </div>
            )}
        </Transition>
    )
};

const mapStateToProps = state => ({
    machines: state.machines.machines
});

export default connect(mapStateToProps)(Drawer);
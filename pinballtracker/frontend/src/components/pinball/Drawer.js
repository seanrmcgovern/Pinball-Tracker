import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { closeArcadeDetails } from '../../actions/arcades';
import { Transition } from 'react-transition-group'; 
import { AppBar, Tab, Tabs, LinearProgress } from '@material-ui/core';
import ArcadeDetails from './ArcadeDetails';
import TabContent from './TabContent';
import Cards from './Cards';
import { withStyles } from '@material-ui/core/styles';

const ActivityIndicator = withStyles((theme) => ({
    colorPrimary: {
      backgroundColor: "#7BD9B6",
      opacity: 0.7
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#00B875",
      opacity: 1
    },
  }))(LinearProgress);

const Drawer = (props) => {

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const GREY = "#9E9E9E";

    const defaultStyle = {
        transition: `width .3s linear`,
        height: '85vh',
        // overflow: 'auto',
        backgroundColor: "#F5F9F9",
        boxShadow: `1px 1px 5px ${GREY}`,
    };

    const transitionStyles = {
        entering: { width: '28vw', zIndex: 1 },
        entered: { width: '28vw', zIndex: 1 },
        exiting: { width: 0, zIndex: 0 },
        exited: { width: 0, zIndex: 0 }
    };

    const [detailsOpen, setDetailsOpen] = useState(props.arcadeDetails != null);

    const closeDetails = () => {
        setDetailsOpen(false);
        props.closeArcadeDetails();
    }

    useEffect(() => {
        setDetailsOpen(props.arcadeDetails != null);
    }, [props.arcadeDetails]);

    return (
        <Transition in={props.isVisible} timeout={300}>
            {state => (
                <div 
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}
                >
                    {(props.arcadeSearchActive || props.locationSearchActive) && <ActivityIndicator/>}
                    <ArcadeDetails arcadeDetails={props.arcadeDetails} open={detailsOpen} close={closeDetails}/>
                    {!detailsOpen && (
                        <Fragment>
                            <AppBar position="sticky" color="default">
                                <Tabs
                                    value={tabValue}
                                    onChange={handleTabChange}
                                    variant="fullWidth"
                                    style={{color: "#00B875", boxShadow: `1px 1px 5px ${GREY}`}}
                                    TabIndicatorProps={{style: {background: "#00B875"}}}
                                >
                                    <Tab label="Curated Locations" style={{textTransform: "capitalize", fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`}}/>
                                    <Tab label="Community Content" style={{textTransform: "capitalize", fontFamily: `-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"`}}/>
                                </Tabs>
                            </AppBar>
                            <TabContent value={tabValue} index={0}>
                                <Cards data={props.arcades.locations}/>
                            </TabContent>
                            <TabContent value={tabValue} index={1}>
                                <Cards data={props.locations}/>
                            </TabContent>
                        </Fragment>
                    )}
                </div>
            )}
        </Transition>
    )
};

const mapStateToProps = state => ({
    arcades: state.arcades.arcades,
    arcadeDetails: state.arcades.arcadeDetails,
    locations: state.locations.locations
});

export default connect(mapStateToProps, { closeArcadeDetails })(Drawer);
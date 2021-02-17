import React from 'react';
import { connect } from 'react-redux';
import { closeArcadeDetails } from '../../actions/arcades';
import { Transition } from 'react-transition-group'; 

const ArcadeDetails = (props) => {

    const defaultStyle = {
        transition: `width .3s linear`,
        height: 0,
        backgroundColor: "#00B875",
        overflow: "hidden",
    };

    const transitionStyles = {
        entering: { width: '28vw', height: "100%" },
        entered: { width: '28vw', height: "100%" },
        exiting: { width: 0 },
        exited: { width: 0 }
    };

    const handleClose = () => {
        props.closeArcadeDetails();
    };

    return (
        <Transition in={props.open} timeout={200}>
            {state => (
                <div
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>
                        Arcade Details
                        <button onClick={handleClose}>Close</button>
                 </div>
            )}
        </Transition>
    );
};

const mapStateToProps = state => ({
    arcadeDetails: state.arcades.arcadeDetails
});

export default connect(mapStateToProps, { closeArcadeDetails })(ArcadeDetails);
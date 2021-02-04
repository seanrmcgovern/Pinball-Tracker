import React from 'react';
import { connect } from 'react-redux';
import { Transition, ReactCSSTransitionGroup } from 'react-transition-group'; 

const Drawer = (props) => {

    const defaultStyle = {
        transition: `width .3s linear`,
        height: '100vh',
        backgroundColor: "#F5F9F9"
    };

    const transitionStyles = {
        entering: { width: '28vw' },
        entered: { width: '28vw' },
        exiting: { width: 0 },
        exited: { width: 0 }
    };

    return (
        <Transition in={props.isVisible} timeout={300}>
            {state => (
                <div style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}>
                    {props.machines?.locations?.map((mach) => (
                        <div>{mach.name}</div>
                    ))}
                </div>
            )}
        </Transition>
    )
};

const mapStateToProps = state => ({
    machines: state.machines.machines
});

export default connect(mapStateToProps)(Drawer);
import React from 'react';
import { Transition } from 'react-transition-group'; 
import { BsX } from "react-icons/bs";

const ArcadeDetails = (props) => {

    const details = props.arcadeDetails;

    const defaultStyle = {
        transition: `width .3s linear`,
        // height: 0,
        overflow: "hidden",
    };

    const transitionStyles = {
        entering: { width: '28vw', height: "100%" },
        entered: { width: '28vw', height: "100%" },
        exiting: { width: 0 },
        exited: { width: 0 }
    };

    return (
        <Transition in={props.open} timeout={100}>
            {state => (
                <div
                    style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>
                        {state == "entered" && details && (
                            <div className="card overflow-auto h-100">
                                <div className="card-header d-flex sticky-top" style={{opacity: 1, backgroundColor: "#F7F7F7"}}>
                                    <div>
                                        <h5 className="card-title text-primary align-self-center m-0 p-0">{details.name}</h5>
                                        <p className="card-text m-0 p-0"><small className="text-muted">{details.street}, {details.city}, {details.state}</small></p>
                                    </div>
                                    <div className="ml-auto p-1">
                                        <button onClick={props.close} type="button" className="btn btn-outline-secondary btn-circle ml-auto p-1">
                                            <BsX style={{fontSize: 20}}/>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    {details.location_machine_xrefs.map(m => 
                                        <div className="card m-3 p-3" id={m.machine.id}>
                                            <h5 className="card-title">{m.machine.name}</h5>
                                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                            <a href="#" className="btn btn-primary">Go somewhere</a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                 </div>
            )}
        </Transition>
    );
};

export default ArcadeDetails;
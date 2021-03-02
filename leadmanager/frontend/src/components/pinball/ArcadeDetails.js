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
                            <div className="card">
                                <div className="card-header d-flex sticky-top" style={{opacity: 1, backgroundColor: "#F7F7F7"}}>
                                    <div>
                                        <h5 className="card-title text-primary align-self-center m-0 p-0 pt-2">{details.name}</h5>
                                        <p className="card-text m-0 p-0"><small className="text-muted">{details.street}, {details.city}, {details.state}</small></p>
                                    </div>
                                    <div className="ml-auto p-1">
                                        <button onClick={props.close} type="button" className="btn btn-outline-secondary btn-circle ml-auto p-1">
                                            <BsX style={{fontSize: 20}}/>
                                        </button>
                                    </div>
                                </div>
                                <div style={{overflow: "auto", height: "75vh"}}>
                                    {details.location_machine_xrefs?.map(m => 
                                        <div className="card border-success m-3 p-3" key={m.machine.id}>
                                            <h5 className="card-title text-success">{m.machine.name}</h5>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <h6 className="text-dark font-weight-bold d-inline">Manufacturer:  </h6> 
                                                    <h6 className="d-inline font-weight-normal text-muted">{m.machine.manufacturer}</h6>
                                                </li>
                                                {m.condition && <li className="list-group-item">
                                                    <h6 className="text-dark font-weight-bold d-inline">Condition:  </h6> 
                                                    <h6 className="d-inline font-weight-normal text-muted">{m.condition}</h6>
                                                </li>}
                                                <li className="list-group-item">
                                                    <h6 className="text-dark font-weight-bold d-inline">Date submitted:  </h6> 
                                                    <h6 className="d-inline font-weight-normal text-muted">{m.created_at}</h6>
                                                </li>
                                                <li className="list-group-item">
                                                    <h6 className="text-dark font-weight-bold d-inline">IPDB Link:  </h6> 
                                                    <h6 className="d-inline font-weight-normal"><a href={m.machine.ipdb_link} target="_blank">{m.machine.ipdb_link}</a></h6>
                                                </li>
                                            </ul>
                                            {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
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
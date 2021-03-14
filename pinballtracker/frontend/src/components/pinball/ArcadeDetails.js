import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group'; 
import { BsX, BsPencil, BsStopFill } from "react-icons/bs";
import { FaSave } from "react-icons/fa";
import { usStates } from '../common/UnitedStates';

const ArcadeDetails = (props) => {

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const details = props.arcadeDetails;

    const isCustomLocation = props.arcadeDetails?.coordinates != null;

    const defaultStyle = {
        transition: `width .3s linear`,
        overflow: "hidden",
    };
    const transitionStyles = {
        entering: { width: '100%', height: "100%" },
        entered: { width: '100%', height: "100%" },
        exiting: { width: 0 },
        exited: { width: 0 }
    };

    const [modifiedLocation, setModifiedLocation] = useState();

    const handleLocationChange = (e) => {
        setModifiedLocation({ ...modifiedLocation, [e.target.name]: e.target.value });
    };

    const [editActive, setEditActive] = useState(false);
    const toggleInputs = () => { 
        if (editActive) {
            setModifiedLocation({ 
                ...modifiedLocation, 
                id: details?.id, 
                name: details?.name,
                street: details?.street,
                city: details?.city,
                state: details?.state,
                description: details?.description || "", 
                website: details?.website || "",
                lat: details?.coordinates?.lat,
                lon: details?.coordinates?.lon
            });
        }
        $('#collapseInputs').collapse('toggle');
        setEditActive(!editActive); 
    };

    const saveChanges = () => {
        const coors = {lat: modifiedLocation.lat, lon: modifiedLocation.lon};
        const updatedLocation = { ...details, ...modifiedLocation, coordinates: coors };
        props.saveLocationChanges(updatedLocation).then((res) => {
            if (res.status == 200) {
                props.updateDetails(updatedLocation);
            }
        });
        toggleInputs();
    };

    const closeDetails = () => {
        setEditActive(false);
        props.close();
    };

    useEffect(() => {
        if (isCustomLocation) {
            setModifiedLocation({ 
                ...modifiedLocation, 
                id: details?.id, 
                name: details?.name,
                street: details?.street,
                city: details?.city,
                state: details?.state,
                description: details?.description || "", 
                website: details?.website || "",
                lat: details?.coordinates.lat,
                lon: details?.coordinates.lon
            });
        }
    }, [details]);

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
                                    <div className="mr-auto p-2">
                                        <h5 className="card-title text-primary align-self-center m-0 p-0 pt-2">{details.name}</h5>
                                        <p className="card-text m-0 p-0"><small className="text-muted">{details.street}, {details.city}, {details.state}</small></p>
                                        {details.website && <a target='__blank__' href={details.website} className="card-text m-0 p-0"><small>{details.website}</small></a>}
                                    </div>
                                    <div className="d-flex align-items-end flex-column ml-auto p-2">
                                        {editActive && (
                                            <button onClick={saveChanges} type="button" className="btn btn-outline-primary btn-circle ml-auto p-1 mb-1">
                                                <FaSave style={{fontSize: 20}}/>
                                            </button>
                                        )}
                                        {isCustomLocation && props.isAuthenticated && (
                                            <button onClick={toggleInputs} type="button" className="btn btn-outline-primary btn-circle ml-auto p-1 mb-1">
                                                {editActive ? <BsStopFill style={{fontSize: 20}}/> : <BsPencil style={{fontSize: 20}}/>}
                                            </button>
                                        )}
                                        <button onClick={closeDetails} type="button" className="btn btn-outline-secondary btn-circle ml-auto p-1">
                                            <BsX style={{fontSize: 20}}/>
                                        </button>
                                    </div>
                                </div>
                                <div style={{overflow: "auto", height: "75vh"}}>
                                    <div className="collapse" id="collapseInputs">
                                        <div className="card card-body">
                                            <form>
                                                <div className="form-group required">
                                                    <label className="control-label m-0">Name</label>
                                                    <input
                                                        className="form-control form-control-sm"
                                                        type="text"
                                                        name="name"
                                                        onChange={handleLocationChange}
                                                        value={modifiedLocation?.name}/>
                                                </div>
                                                <div className="form-group required">
                                                    <label className="control-label m-0">Street</label>
                                                    <input
                                                        className="form-control form-control-sm"
                                                        type="text"
                                                        name="street"
                                                        onChange={handleLocationChange}
                                                        value={modifiedLocation?.street}/>
                                                </div>
                                                <div className="form-group required">
                                                    <label className="control-label m-0">City</label>
                                                    <input
                                                        className="form-control form-control-sm"
                                                        type="text"
                                                        name="city"
                                                        onChange={handleLocationChange}
                                                        value={modifiedLocation?.city}/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="m-0">State</label>
                                                    <select value={modifiedLocation?.state} className="form-control form-control-sm" name="state" onChange={handleLocationChange}>
                                                        {usStates.map(state => (
                                                            <option value={state.abbreviation} key={state.abbreviation}>{capitalize(state.name.toLowerCase())}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-group required">
                                                    <label className="control-label m-0">Latitude</label>
                                                    <input
                                                        className="form-control form-control-sm"
                                                        type="text"
                                                        name="lat"
                                                        onChange={handleLocationChange}
                                                        value={modifiedLocation?.lat}/>
                                                </div>
                                                <div className="form-group required">
                                                    <label className="control-label m-0">Longitude</label>
                                                    <input
                                                        className="form-control form-control-sm"
                                                        type="text"
                                                        name="lon"
                                                        onChange={handleLocationChange}
                                                        value={modifiedLocation?.lon}/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label m-0">Description</label>
                                                    <input
                                                        className="form-control form-control-sm"
                                                        type="text"
                                                        name="description"
                                                        onChange={handleLocationChange}
                                                        value={modifiedLocation?.description}/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label m-0">Website</label>
                                                    <input
                                                        className="form-control form-control-sm"
                                                        type="text"
                                                        name="website"
                                                        onChange={handleLocationChange}
                                                        value={modifiedLocation?.website}/>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
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
                                        </div>
                                    )}
                                    {details.machines?.map(m => 
                                        <div className="card border-success m-3 p-3" key={m.id}>
                                            <h5 className="card-title text-success">{m.name}</h5>
                                            <ul className="list-group">
                                                <li className="list-group-item">
                                                    <h6 className="text-dark font-weight-bold d-inline">Manufacturer:  </h6> 
                                                    <h6 className="d-inline font-weight-normal text-muted">{m.manufacturer}</h6>
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
                                                    <h6 className="d-inline font-weight-normal"><a href={m.ipdb_link} target="_blank">{m.ipdb_link}</a></h6>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                    <div style={{height: "100px"}}/>
                                </div>
                            </div>
                        )}
                 </div>
            )}
        </Transition>
    );
};

export default ArcadeDetails;
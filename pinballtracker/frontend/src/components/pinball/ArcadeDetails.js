import React, { useEffect, useState, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import MachineList from './MachineList';
import { Transition } from 'react-transition-group'; 
import { BsX, BsPencil, BsStopFill } from "react-icons/bs";
import { FaSave } from 'react-icons/fa';
import { HiPlus } from 'react-icons/hi';
import { usStates } from '../common/UnitedStates';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    inputRoot: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#00B875"
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#00B875"
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#00B875"
      }
    }
}));

const labelStyles = makeStyles((theme) => ({
    label: {
        '&.Mui-focused': {
          color: "#00B875"
        }
    }
}));

const ArcadeDetails = (props) => {
    const classes = useStyles();
    const inputLabelClasses = labelStyles();

    const detailsRef = useRef(null);

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const details = props.arcadeDetails;

    const isCustomLocation = props.arcadeDetails?.machine_names == null;

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
        if (!editActive) {
            detailsRef.current.scroll({
                top: 0,
                behavior: "smooth"
            });
        }
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
        props.updateLocationDetails(updatedLocation).then((res) => {
            if (res.status == 200) {
                props.updateDetails(updatedLocation);
            }
        });
        toggleInputs();
    };

    const closeDetails = () => {
        setEditActive(false);
        setAddingMachine(false);
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
                lon: details?.coordinates.lon,
                machines: details?.machines
            });
        }
    }, [details]);

    const [addingMachine, setAddingMachine] = useState(false);
    const [selectedMachine, setSelectedMachine] = useState(null);

    const toggleMachineInputs = () => {
        if (!addingMachine) {
            detailsRef.current.scroll({
                top: 0,
                behavior: "smooth"
            });
        }
        setAddingMachine(!addingMachine);
        setSelectedMachine(null);
        $('#machineInputs').collapse('toggle');
    };

    const saveMachine = (e) => {
        e.preventDefault();
        const coors = {lat: modifiedLocation.lat, lon: modifiedLocation.lon};
        // update the locations "machines" field to append the new machine
        const updatedMachine = {id: selectedMachine.id, name: selectedMachine.name, year: selectedMachine.year, manufacturer: selectedMachine.manufacturer, ipdb_link: selectedMachine.ipdb_link, created_at: new Date() };
        const updatedLocation = { ...modifiedLocation, machines: [...modifiedLocation.machines, updatedMachine], coordinates: coors};
        props.updateLocationDetails(updatedLocation).then((res) => {
            if (res.status == 200) {
                props.updateDetails(updatedLocation);
            }
        });
        toggleMachineInputs();
    };

    const deleteMachine = (id) => {
        const coors = {lat: modifiedLocation.lat, lon: modifiedLocation.lon};
        const machines = modifiedLocation.machines.filter(mach => mach.id != id);
        const updatedLocation = {...modifiedLocation, machines: machines, coordinates: coors};
        props.updateLocationDetails(updatedLocation).then((res) => {
            if (res.status == 200) {
                props.updateDetails(updatedLocation);
            }
        });
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
                                    <div className="mr-auto p-2">
                                        <h5 className="card-title text-primary align-self-center m-0 p-0 pt-2">{details.name}</h5>
                                        <p className="card-text m-0 p-0"><small className="text-muted">{details.street}, {details.city}, {details.state}</small></p>
                                        {details.website && <a target='__blank__' href={details.website} className="card-text m-0 p-0"><small>{details.website}</small></a>}
                                    </div>
                                    {isCustomLocation && (
                                        <div className="pt-2 mr-1"> 
                                            {props.isAuthenticated ? (
                                                <button onClick={toggleMachineInputs} disabled={editActive} type="button" className="btn btn-outline-primary btn-circle ml-auto p-1 mb-1">
                                                    {addingMachine ? <BsStopFill style={{fontsize: 20, margin: 2}}/> : <HiPlus style={{fontSize: 20}}/>}
                                                </button>
                                            ) : (
                                                <Link to="/login">
                                                    <button type="button" className="btn btn-outline-primary btn-circle ml-auto p-1 mb-1">
                                                        <HiPlus style={{fontSize: 20}}/>
                                                    </button>
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                    <div className="d-flex align-items-end flex-column ml-0 pt-2">
                                        {isCustomLocation && (
                                            <Fragment>
                                                {props.isAuthenticated ? (
                                                    <Fragment>
                                                        {editActive && (
                                                            <button onClick={saveChanges} type="button" className="btn btn-outline-primary btn-circle ml-auto p-1 mb-1">
                                                                <FaSave style={{fontSize: 20}}/>
                                                            </button>
                                                        )}
                                                        <button onClick={toggleInputs} disabled={addingMachine} type="button" className="btn btn-outline-primary btn-circle ml-auto p-1 mb-1">
                                                            {editActive ? <BsStopFill style={{fontSize: 20}}/> : <BsPencil style={{fontSize: 20}}/>}
                                                        </button>
                                                    </Fragment>
                                                ) : (
                                                    <Link to="/login">
                                                        <button type="button" className="btn btn-outline-primary btn-circle ml-auto p-1 mb-1">
                                                            <BsPencil style={{fontSize: 20}}/>
                                                        </button>
                                                    </Link>
                                                )}
                                            </Fragment>
                                        )}
                                        <button onClick={closeDetails} type="button" className="btn btn-outline-secondary btn-circle ml-auto p-1">
                                            <BsX style={{fontSize: 20}}/>
                                        </button>
                                    </div>
                                </div>
                                <div style={{overflow: "auto", height: "75vh"}} ref={detailsRef}>
                                    {props.isAuthenticated && (
                                        <Fragment>
                                            <div className="collapse" id="collapseInputs">
                                                <div className="card card-body">
                                                    <h5 className="card-title text-center text-muted m-1">Modify location details</h5>
                                                    <Divider style={{marginBottom: 10}}/>
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
                                            <div className="collapse" id="machineInputs">
                                                <div className="card card-body">
                                                    <form onSubmit={saveMachine}>
                                                        <div className="form-group">
                                                            <h6 className="font-weight-normal m-0 mb-2" style={{fontSize: 15}}>Select a machine, or start typing for suggestions</h6>
                                                            <Autocomplete
                                                                value={selectedMachine}
                                                                onChange={(event, newValue) => {
                                                                    setSelectedMachine(newValue);
                                                                }}
                                                                classes={classes}
                                                                freeSolo
                                                                options={props.machines}
                                                                getOptionLabel={(option) => option.name}
                                                                style={{ width: 300 }}
                                                                renderInput={(params) => <TextField {...params} label="New Machine" variant="outlined" InputLabelProps={{className: inputLabelClasses.label}} />}
                                                            />
                                                            <button disabled={selectedMachine == null} type="submit" className="btn btn-primary m-1">Submit</button>
                                                            <button onClick={toggleMachineInputs} type="reset" className="btn btn-secondary m-1">Cancel</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </Fragment>
                                    )}
                                    {isCustomLocation ? (
                                        <MachineList machines={details.machines} isAuthenticated={props.isAuthenticated} isCustomLocation={true} deleteMachine={deleteMachine}/>
                                    ) : (
                                        <MachineList machines={details.location_machine_xrefs.map(m => ({...m.machine, condition: m.condition, created_at: m.created_at}))} isAuthenticated={props.isAuthenticated} isCustomLocation={false}/>
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
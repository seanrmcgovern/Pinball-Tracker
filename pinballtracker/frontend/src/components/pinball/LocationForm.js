import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addLocation } from '../../actions/locations';
import { usePrevious } from '../../hooks/hooks';
import { usStates } from '../common/UnitedStates';

const LocationForm = (props) => {

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const defaultLocation = {
        name: '',
        lat: '',
        lon: '',
        street: '',
        city: '',
        state: 'AL',
        website: '',
        description: '',
    };
    
    const [location, setLocation] = useState(defaultLocation);

    const onChange = (e) => {
        setLocation({...location, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const coors = {lat: location.lat, lon: location.lon};
        const formattedLocation = {
            name: location.name,
            coordinates: coors,
            street: location.street,
            city: location.city,
            state: location.state,
            website: location.website,
            description: location.description,
        };
        props.addLocation(formattedLocation);
    };

    const prevMessage = usePrevious(props.message);
    useEffect(() => {
        if(props.message !== prevMessage) {
            if (props.message.addLocation) {
                setLocation(defaultLocation);  
            }
        }
    }), [props.message];

    return (
        <div className="col-md-6 m-auto">
             <div className="card card-body mt-5">
                <h5>Submit Location</h5>
                <form onSubmit={onSubmit}>
                    <div className="form-group required">
                        <label className="control-label m-0">Name</label>
                        <input
                            className="form-control form-control-sm"
                            type="text"
                            name="name"
                            onChange={onChange}
                            value={location.name}/>
                    </div>
                    <div className="form-group required">
                        <label className="control-label m-0">Street</label>
                        <input
                            className="form-control form-control-sm"
                            type="text"
                            name="street"
                            onChange={onChange}
                            value={location.street}/>
                    </div>
                    <div className="form-row">
                        <div className="form-group required col-md-6">
                            <label className="control-label m-0">City</label>
                            <input
                                className="form-control form-control-sm"
                                type="text"
                                name="city"
                                onChange={onChange}
                                value={location.city}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="m-0">State</label>
                            <select className="form-control form-control-sm" name="state" onChange={onChange}>
                                {usStates.map(state => (
                                    <option value={state.abbreviation} key={state.abbreviation}>{capitalize(state.name.toLowerCase())}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group required col-md-6">
                            <label className="control-label m-0">Latitude</label>
                            <input
                                className="form-control form-control-sm"
                                type="number"
                                name="lat"
                                onChange={onChange}
                                value={location.lat}/>
                        </div>
                        <div className="form-group required col-md-6">
                            <label className="control-label m-0">Longitude</label>
                            <input
                                className="form-control form-control-sm"
                                type="number"
                                name="lon"
                                onChange={onChange}
                                value={location.lon}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="m-0">Description</label>
                        <textarea 
                            className="form-control form-control-sm" 
                            rows="3" 
                            name="description" 
                            onChange={onChange} 
                            value={location.description}>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label className="m-0">Website</label>
                        <input
                            className="form-control form-control-sm"
                            type="text"
                            name="website"
                            onChange={onChange}
                            value={location.website}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    message: state.messages
});

export default connect(mapStateToProps, { addLocation })(LocationForm);
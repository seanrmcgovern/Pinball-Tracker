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
                <h2>Submit Location</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            onChange={onChange}
                            value={location.name}/>
                    </div>
                    <div className="form-group">
                        <label>Street</label>
                        <input
                            className="form-control"
                            type="text"
                            name="street"
                            onChange={onChange}
                            value={location.street}/>
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input
                            className="form-control"
                            type="text"
                            name="city"
                            onChange={onChange}
                            value={location.city}/>
                    </div>
                    <div className="form-group">
                        <label>State</label>
                        <select className="form-control" name="state">
                            {usStates.map(state => (
                                <option value={state.abbreviation} key={state.abbreviation}>{capitalize(state.name.toLowerCase())}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Latitude</label>
                        <input
                            className="form-control"
                            type="number"
                            name="lat"
                            onChange={onChange}
                            value={location.lat}/>
                    </div>
                    <div className="form-group">
                        <label>Longitude</label>
                        <input
                            className="form-control"
                            type="number"
                            name="lon"
                            onChange={onChange}
                            value={location.lon}/>
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
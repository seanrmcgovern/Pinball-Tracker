import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { getArcadesByAddress } from '../../actions/arcades';
import { getLocationsByAddress } from '../../actions/locations';

const SearchBar = (props) => {

    const SearchIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>

    const [filters, setFilters] = useState({
        address: "",
        radius: "25"
    })

    const onSubmit = (e) => {
        e.preventDefault();
        const searchRadius = filters.radius == "" ? "25" : filters.radius;
        props.toggleArcadeSearch(true);
        props.toggleLocationSearch(true);
        props.getArcadesByAddress(filters.address, searchRadius).then(() => props.toggleArcadeSearch(false));
        props.getLocationsByAddress(filters.address).then(() => props.toggleLocationSearch(false));
    };

    const onChange = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        props.getLocationsByAddress(filters.address);
    }, []);

    return(
        <div className="d-inline-flex p-2" style={{height: '7.5vh', minHeight: '60px'}}>
            <form onSubmit={onSubmit} className="d-inline-flex">
                <div className="input-group mr-2" style={{width: window.innerWidth > 700 ? '28vw' : '100%'}}>
                    <input label="Address" type="text" value={filters.address} onChange={onChange} name="address" className="form-control" placeholder="Los Angeles, CA"/>
                    <div className="input-group-append">
                        <button onClick={onSubmit} className="btn btn-outline-primary" type="button">
                            {SearchIcon}
                        </button>
                    </div>
                </div>
            </form>
            <div className="input-group d-inline-flex" style={{maxWidth: '300px'}}>
                <div className="input-group-prepend">
                    <span className="input-group-text">Radius</span>
                </div>
                <input className="form-control radius-form-control" type="number" name="radius" onChange={onChange} value={filters.radius}/>
                <div className="input-group-append">
                    <span className="input-group-text">miles</span>
                </div>
            </div>
        </div>

    );
};

export default connect(null, { getArcadesByAddress, getLocationsByAddress })(SearchBar);
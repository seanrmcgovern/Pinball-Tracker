import React, { useState } from "react";
import { connect } from 'react-redux';
import { getArcadesByAddress } from '../../actions/arcades';

const SearchBar = (props) => {

    const SearchIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>

    const [address, setAddress] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        props.toggleSearch(true);
        props.getArcadesByAddress(address, 25).then(() => props.toggleSearch(false));
    };

    const onChange = (e) => {
        setAddress(e.target.value);
    };

    return(
        <div className="d-inline-flex p-2">
            <form onSubmit={onSubmit}>
                <div className="input-group" style={{width: '25vw'}}>
                    <input type="text" value={address} onChange={onChange} name="address" className="form-control" placeholder="Los Angeles, CA"/>
                    <div className="input-group-append">
                        <button onClick={onSubmit} className="btn btn-outline-primary" type="button">
                            {SearchIcon}
                        </button>
                    </div>
                </div>
            </form>
        </div>

    );
};

export default connect(null, { getArcadesByAddress })(SearchBar);
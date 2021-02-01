import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getMachinesByAddress } from '../../actions/machines';

const Drawer = (props) => {

    const [address, setAddress] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        props.getMachinesByAddress(address, 25);
    };

    const onChange = (e) => {
        setAddress(e.target.value);
    };

    return (
        <div style={{height: '100vh', backgroundColor: "#FFFFFF", flex: 0.4, display: props.isVisible ? 'flex' : 'none'}}>
            {/* <button type="button" className="btn btn-primary" onClick={() => props.toggleDrawer()}>
                Toggle
            </button> */}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    {/* <label>Near</label> */}
                    <input 
                        className="form-control"
                        type="text"
                        name="address"
                        onChange={onChange}
                        value={address}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
            {props.machines?.locations?.map((mach) => (
                <div>{mach.name}</div>
            ))}
        </div>
    )
};

const mapStateToProps = state => ({
    machines: state.machines.machines
});

export default connect(mapStateToProps, { getMachinesByAddress })(Drawer);
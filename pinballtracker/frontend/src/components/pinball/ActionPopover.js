import React, { useState, Fragment } from 'react';
import { HiMinusSm } from 'react-icons/hi';
import Popover from '@material-ui/core/Popover';

const ActionPopover = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const openPopover = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const closePopover = () => {
        setAnchorEl(null);
    };
    const confirmDeletion = () => {
        props.delete(props.machineId);
    }

    return (
        <Fragment>
            <button onClick={openPopover} type="button" className="btn btn-outline-secondary btn-circle ml-auto p-1 btn-circle ml-auto p-1 mb-2">
                <HiMinusSm style={{fontSize: 20}}/>
            </button>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={closePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className="card"> 
                    <div className="card-header pb-0">
                        <h6 className="card-title">Delete</h6>
                    </div>
                    <div className="card-body pb-2">
                        <h6 className="font-weight-normal" style={{width: 300}}>Are you sure you want to delete this machine?</h6>
                        <h6 className="font-weight-normal text-muted" style={{width: 300, fontSize: 12}}>Please only do so if you are sure that the machine no longer exists at this location</h6>
                        <div className="d-flex justify-content-end">
                            <button onClick={closePopover} className="btn btn-secondary mr-1">Cancel</button>
                            <button onClick={confirmDeletion} className="btn btn-outline-danger">Confirm Deletion</button>
                        </div>
                    </div>
                </div>
            </Popover>
        </Fragment>
    )
};

export default ActionPopover;
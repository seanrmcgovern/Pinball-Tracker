import React, { Fragment } from 'react';
import moment from 'moment';
import ActionPopover from './ActionPopover';

const MachineList = (props) => {

    const machines = props.machines ? props.machines.sort((a, b) => a.name.toLowerCase() <= b.name.toLowerCase() ? -1 : 0) : [];

    return(
        <div>
            {machines.map(m => 
                <div className="card border-success m-3 p-3 bg-light" key={m.id}>
                    <div className="d-flex">
                        <h5 className="card-title mr-auto">{m.name}</h5>
                        {props.isAuthenticated && props.isCustomLocation && (<ActionPopover machineId={m.id} delete={props.deleteMachine}/>)}
                    </div>
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
                            <h6 className="d-inline font-weight-normal text-muted">{moment(m.created_at).format('LL')}</h6>
                        </li>
                        {m.ipdb_link != "" && (
                            <li className="list-group-item">
                                <h6 className="text-dark font-weight-bold d-inline">IPDB Link:  </h6> 
                                <h6 className="d-inline font-weight-normal"><a href={m.ipdb_link} target="_blank">{m.ipdb_link}</a></h6>
                            </li>
                        )}
                    </ul>
                </div>
            )}
            {machines.length == 0 && props.isCustomLocation != null && (
                <div className="card border-success m-3 p-3 bg-light">
                    <div className="d-flex">
                        <h5 className="card-title mr-auto">No machines listed at this location</h5>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MachineList;
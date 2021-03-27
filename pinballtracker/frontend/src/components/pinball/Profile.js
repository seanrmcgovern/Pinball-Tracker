import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getBookmarks } from '../../actions/bookmarks';
import MachineList from './MachineList';

const Profile = (props) => {

    const [selectedBookmark, setSelectedBookmark] = useState(null);

    const handleListItem = (location) => {
        if (location.machines.length > 0 && location.machines[0].machine != null) {
            setSelectedBookmark({...location, machines: location.machines.map(m => ({...m, name: m.machine.name, manufacturer: m.machine.manufacturer, ipdb_link: m.machine.ipdb_link}))})
        } else {
            setSelectedBookmark({ ...location, machines: location.machines});
        }
    };

    useEffect(() => {
        props.getBookmarks();
    }, []);

    return (
        <Fragment>
            <div className="row m-4">
                <div className="col-sm">
                    <h4>Bookmarks</h4>
                </div>
                <div className="col-sm">
                    <h4>{selectedBookmark ? `Machines for: ${selectedBookmark.name}`: `Select a bookmark to view machines`}</h4>
                </div>
            </div>
            <div className="row m-4 pb-0" style={{height: '84vh'}}>
                <ul className="mx-auto list-group list-group-flush col-sm rounded border border-success p-0" style={{ height: "100%", overflowY: 'scroll'}}>
                        {props.bookmarks?.map(bookmark => (
                            <li onClick={() => handleListItem(bookmark)} className={`list-group-item list-group-item-action ${selectedBookmark?.id == bookmark.id && "list-group-item-success"}`} style={{cursor: "pointer"}} key={bookmark.id}>
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{bookmark.name}</h5>
                                    <small>{bookmark.machines.length} machines</small>
                                </div>
                                <p className="card-text m-0 p-0"><small className="text-muted">{bookmark.street}, {bookmark.city}, {bookmark.state}</small></p>
                                {bookmark.website && <a target='__blank__' href={bookmark.website} className="card-text m-0 p-0"><small>{bookmark.website}</small></a>}
                                <h6 className="mb-1 card-text font-weight-normal">{bookmark.description}</h6>
                            </li>
                        ))}
                        {props.bookmarks?.length > 0 ? (
                            <li style={{height: "200px"}}></li>
                        ) : (
                            <li className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">Save locations for quick access on the explore page</h5>
                                </div>
                            </li>
                        )}
                </ul>
                <div className="col-sm"  style={{ height: "100%", overflowY: 'scroll'}}>
                    <MachineList machines={selectedBookmark?.machines} isAuthenticated={false}/>
                </div>
            </div>
        </Fragment>
    )
};

const mapStateToProps = state => ({
    bookmarks: state.bookmarks.bookmarks
});

export default connect(mapStateToProps, { getBookmarks })(Profile);
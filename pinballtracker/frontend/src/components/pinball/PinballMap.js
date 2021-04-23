import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'; 
import { getArcadesByAddress, openArcadeDetails } from  '../../actions/arcades';
import { addBookmark, deleteBookmark } from '../../actions/bookmarks';
import ReactMapboxGl, { Marker, ZoomControl, Popup } from 'react-mapbox-gl';
import { GeolocateControl } from "mapbox-gl";
import BookmarkIcon from './BookmarkIcon';

const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1Ijoic2Vhbm1jZ292ZXJuIiwiYSI6ImNrZ3M3cmloazAzODEydXExcWRsdWNwcngifQ.YP0JMAU2CM5iPnS5MyUusw',
    trackResize: true,
});

const CaretLeft = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left" viewBox="0 0 16 16"><path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753l-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/></svg>

const CaretRight = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16"><path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/></svg>

const PinballMap = (props) => {

    const handleStyleLoad = map => {
        map.resize();
        props.toggleDrawer();
        map.addControl(new GeolocateControl());
    };

    const onPress = (e) => {
        e.preventDefault();
        props.toggleDrawer();
    }

    const [center, setCenter] = useState([ -80, 39.8283 ]);

    const [bounds, setBounds] = useState([[-120, 50], [-55, 20]]);

    useEffect(() => {
        if (props.arcades?.length > 0) {
            // const average = arr => arr.reduce((sum, cur) => sum + cur, 0) / arr.length;
            // const lats = props.arcades.locations.map(m => parseFloat(m.lat));
            // const lons = props.arcades.locations.map(m => parseFloat(m.lon));
            // const averageLon = average(lons);
            // const averageLat = average(lats);
            // setCenter([averageLon, averageLat]);

            const lats = props.arcades.map(m => parseFloat(m.lat));
            const lons = props.arcades.map(m => parseFloat(m.lon));
            // top left point
            const maxLat = lats.reduce((a, b) => Math.max(a, b)) + 0.1; // Math.max(...lats);
            const minLon = lons.reduce((a, b) => Math.min(a, b)); // Math.min(...lons);
            const topLeft = [minLon, maxLat];
            // bottom right point
            const minLat = lats.reduce((a, b) => Math.min(a, b)) - 0.1; // Math.min(...lats);
            const maxLon = lons.reduce((a, b) => Math.max(a, b)) + 0.2; // Math.max(...lons);
            const bottomRight = [maxLon, minLat];
            setBounds([topLeft, bottomRight]);

            closePopup();
        }
    }, [props.arcades]);

    const [popupLocation, setPopupLocation] = useState();

    const handleMarkerClick = (loc) => {
        setPopupLocation({ ...loc, coordinates: {lat: loc.lat, lon: loc.lon}});
    };

    const handleFlipperClick = (loc) => {
        setPopupLocation(loc);
    };

    const openDetails = (loc) => {
        props.openArcadeDetails(loc);
    }

    const closePopup = () => {
        setPopupLocation();
    };

    const [hoveredMarker, setHoveredMarker] = useState();
    
    return (
        <Map 
            // style="mapbox://styles/mapbox/streets-v9"
            style="mapbox://styles/mapbox/light-v9"
            containerStyle={{
                height: '85vh',
                width: '100%',
                flex: 1,
            }}
            fitBounds={bounds}
            onStyleLoad={handleStyleLoad}
            >
            <button className="btn rounded-left shadow" style={{position: "absolute", top: 5, left: -5, backgroundColor: "#F5F9F9", opacity: 0.75, borderWidth: 1, borderColor: "#00B875"}} onClick={onPress}>{props.isVisible ? CaretLeft : CaretRight}</button>
            <ZoomControl style={{marginTop: 40}}/>
            {props.tabValue == 0 && props.arcades?.map(loc => (
                <Marker 
                    coordinates={[loc.lon, loc.lat]} 
                    anchor="bottom" 
                    key={loc.id} 
                    onClick={() => handleMarkerClick(loc)}
                    onMouseEnter={() => setHoveredMarker(loc.id)}
                    onMouseLeave={() => setHoveredMarker(null)}
                    style={{cursor: "pointer", position: "absolute", zIndex: hoveredMarker == loc.id || popupLocation?.id == loc.id ? 2: 1}}>
                    <img src="https://img.icons8.com/ultraviolet/40/000000/marker.png" style={hoveredMarker == loc.id || popupLocation?.id == loc.id  ? {transform: "scale(1.2)", marginBottom: 10} : {opacity: 0.8}}/>                    
                </Marker>
            ))}
            {props.tabValue == 1 && props.locations?.map(loc => (
                <Marker 
                    coordinates={[loc.coordinates.lon, loc.coordinates.lat]} 
                    anchor="bottom" 
                    key={loc.id} 
                    onClick={() => handleFlipperClick(loc)}
                    onMouseEnter={() => setHoveredMarker(loc.id)}
                    onMouseLeave={() => setHoveredMarker(null)}
                    style={{cursor: "pointer", position: "absolute", zIndex: hoveredMarker == loc.id || popupLocation?.id == loc.id ? 2: 1}}>
                    <img src={require('../../images/communityPin.png')} style={hoveredMarker == loc.id || popupLocation?.id == loc.id  ? {transform: "scale(1.2)", marginBottom: 10, fontSize: 10} : {opacity: 0.8, fontSize: 10}}/>                    
                </Marker>
            ))}
            {popupLocation && (
                <Popup
                    style={{width: "400px"}}
                    coordinates={[popupLocation.coordinates.lon, popupLocation.coordinates.lat]}
                    anchor="bottom"
                    offset={25}
                >
                    <div className="card border-success p-2 m-0">
                        <div className="card-body pb-0">
                            <div className="d-flex">
                                <h5 className="card-title text-primary m-0">{popupLocation.name}</h5>
                                <BookmarkIcon 
                                    isAuthenticated={props.auth.isAuthenticated}
                                    location={popupLocation}
                                    bookmarkId={props.bookmarks.find(b => b.coordinates.lat == popupLocation.coordinates.lat && b.coordinates.lon == popupLocation.coordinates.lon)?.id}
                                    isFavorite={props.bookmarks.some(b => b.coordinates.lat == popupLocation.coordinates.lat && b.coordinates.lon == popupLocation.coordinates.lon)}
                                    addBookmark={props.addBookmark}
                                    deleteBookmark={props.deleteBookmark}/>
                            </div>
                            <h5 className="card-text m-0"><small className="text-muted">{popupLocation.street}</small></h5>
                            <p className="lead text-dark m-1"><small>{popupLocation.description}</small></p>
                            <div className="d-inline-flex justify-content-left">
                                <button onClick={() => openDetails(popupLocation)} type="button" className="btn btn-success rounded p-1 pl-2 pr-2 m-0 mr-1">Details</button>
                                <button onClick={closePopup} type="button" className="btn btn-secondary rounded p-1 pl-2 pr-2 m-0">Close</button>
                            </div>
                        </div>
                    </div>
                </Popup>
            )}
        </Map>
    )
};

const mapStateToProps = state => ({
    arcades: state.arcades.arcades,
    locations: state.locations.locations,
    auth: state.auth,
    bookmarks: state.bookmarks.bookmarks
});

export default connect(mapStateToProps, { getArcadesByAddress, openArcadeDetails, addBookmark, deleteBookmark })(PinballMap);
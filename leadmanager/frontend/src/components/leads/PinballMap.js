import React, { useEffect } from 'react';
import { connect } from 'react-redux'; 
import { getMachinesByAddress } from  '../../actions/machines';
import ReactMapboxGl, { Layer, Feature, Marker, ZoomControl } from 'react-mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

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
    };

    const onPress = (e) => {
        console.log("heloleleoleoe")
        e.preventDefault();
        props.toggleDrawer();
    }

    return (
        <Map 
            // style="mapbox://styles/seanmcgovern/ckklq8nd640rm17s5ufcl9gp2"
            style="mapbox://styles/mapbox/streets-v9"
            // style="mapbox://styles/mapbox/light-v10"
            containerStyle={{
                height: '100vh',
                width: '100%',
                flex: 1, 
            }}
            center={[-78.476677, 38.029305]}
            onStyleLoad={handleStyleLoad}
            >
            {/* <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
            </Layer> */}
            <button className="btn rounded-left shadow" style={{position: "absolute", top: 5, left: -5, backgroundColor: "#F5F9F9", opacity: 0.7}} onClick={onPress}>{props.isVisible ? CaretLeft : CaretRight}</button>
            <ZoomControl/>
            {props.machines?.locations?.map(mach => (
                <Marker coordinates={[mach.lon, mach.lat]} anchor="bottom">
                    <img src="https://img.icons8.com/dusk/64/000000/map-pin.png"/>
                </Marker>
            ))}
        </Map>
    )
};

const mapStateToProps = state => ({
    machines: state.machines.machines
});

export default connect(mapStateToProps, { getMachinesByAddress })(PinballMap);
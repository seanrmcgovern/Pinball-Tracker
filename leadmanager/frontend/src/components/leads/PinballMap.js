import React, { useEffect } from 'react';
import { connect } from 'react-redux'; 
import { getMachinesByAddress } from  '../../actions/machines';
import ReactMapboxGl, { Layer, Feature, Marker, ZoomControl, RotationControl, ScaleControl } from 'react-mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// set redux store value to indicate map loaded, and animate side bar once loaded

const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1Ijoic2Vhbm1jZ292ZXJuIiwiYSI6ImNrZ3M3cmloazAzODEydXExcWRsdWNwcngifQ.YP0JMAU2CM5iPnS5MyUusw',
    trackResize: true,
  });

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
            // style="mapbox://styles/mapbox/streets-v9"
            style="mapbox://styles/mapbox/light-v10"
            containerStyle={{
                height: '100vh',
                width: '100%',
                flex: 1, 
            }}
            center={[-78.476677, 38.029305]}
            onStyleLoad={handleStyleLoad}
            >
            {/* <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-1' }}>
                {props.machines?.locations?.map(mach => (
                    <Feature coordinates={[parseFloat(mach.lon), parseFloat(mach.lat)]} />
                ))}
            </Layer> */}
            {/* <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
            </Layer> */}
            <button className="btn btn-primary" style={{position: "absolute", top: 0, left: 0}} onClick={onPress}>{props.isVisible ? "<" : ">"}</button>
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
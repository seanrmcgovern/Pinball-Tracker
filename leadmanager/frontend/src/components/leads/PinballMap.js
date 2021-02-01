import React, { useEffect } from 'react';
import { connect } from 'react-redux'; 
import { getMachinesByAddress } from  '../../actions/machines';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
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

    return (
        <Map 
            style="mapbox://styles/seanmcgovern/ckklq8nd640rm17s5ufcl9gp2"
            //style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
                height: '100vh',
                width: '100%',
                flex: 1, 
            }}
            onStyleLoad={handleStyleLoad}
            >
            {/* <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                {props.machines?.locations?.map(mach => (
                    <Feature coordinates={[parseFloat(mach.lon), parseFloat(mach.lat)]} />
                ))}
            </Layer> */}
            {/* <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
            </Layer> */}
            {props.machines?.locations?.map(mach => (
                <Marker coordinates={[mach.lon, mach.lat]} anchor="bottom">
                    <img src="https://img.icons8.com/dusk/64/000000/map-pin.png"/>
                    {/* <img src="https://img.icons8.com/officel/16/000000/map-pin.png"/> */}
                </Marker>
            ))}
        </Map>
    )
};

const mapStateToProps = state => ({
    machines: state.machines.machines
});

export default connect(mapStateToProps, { getMachinesByAddress })(PinballMap);
import React, { useState } from 'react';
import FavoriteIcon from './FavoriteIcon';
import { connect } from 'react-redux';
import { openArcadeDetails } from '../../actions/arcades';

const Cards = (props) => {

    const [hoveredCard, setHoveredCard] = useState();

    return (
        <div className="m-2 overflow-auto" style={{height: "75vh" , /* IE and Edge */ 'msOverflowStyle': "none", /* Firefox */ 'scrollbarWidth': "none"}}>
            {props.data?.map(loc => (
                <div 
                    className="card m-3" 
                    key={loc.id} 
                    onClick={() => props.openArcadeDetails(loc)}
                    onMouseEnter={() => setHoveredCard(loc.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{borderColor: hoveredCard == loc.id ? "#00B875" : "", borderWidth: 3, cursor: hoveredCard == loc.id ? "pointer" : "auto"}}
                >
                        <FavoriteIcon/>
                        <div className="card-body">
                            <h5 className="card-title text-primary m-0">{loc.name}</h5>
                            <p className="card-text m-0"><small className="text-muted">{loc.street}</small></p>
                            <h6 className="card-text font-weight-normal">{loc.description}</h6>
                        </div>
                </div>
            ))}
            {!props.data && (
                <div className="card m-3" >
                    <div className="card-body">
                        <h6 className="card-text text-muted">Enter a city or address to search for locations near you</h6>
                    </div>
                </div>
            )}
        </div>
    );
};

export default connect(null, { openArcadeDetails })(Cards);

import React, { useState } from 'react';
import FavoriteIcon from './FavoriteIcon';
import { connect } from 'react-redux';
import { openArcadeDetails } from '../../actions/arcades';

const Cards = (props) => {

    const [hoveredCard, setHoveredCard] = useState();

    return (
        <div className="m-2 overflow-auto" style={{height: "75vh" , /* IE and Edge */ '-ms-overflow-style': "none", /* Firefox */ 'scrollbar-width': "none"}}>
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
                            <p className="card-text">{loc.description}</p>
                            {/* // number of machines
                            // rating system */}
                        </div>
                </div>
            ))}
        </div>
    );
};

export default connect(null, { openArcadeDetails })(Cards);

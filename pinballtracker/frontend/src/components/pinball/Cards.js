import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { openArcadeDetails } from '../../actions/arcades';
import BookmarkIcon from './BookmarkIcon';
import { Transition } from 'react-transition-group'; 

const Cards = (props) => {

    const defaultStyle = {
        transition: "opacity .3s ease-out",
    };

    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
        exited: { opacity: 0 }
    };

    const [hoveredCard, setHoveredCard] = useState();

    const [rendered, setRendered] = useState(props.isVisible);

    useEffect(() => {
        if (props.isVisible) {
            setTimeout(() => {
                setRendered(true);
            }, 300)
        } else {
            setRendered(false);
        }
    }, [props.isVisible]);


    return (
        <div className="overflow-auto" style={{ width: rendered ? "100%" : 0, height: "75vh" }}>
            <Transition in={rendered} timeout={500}>
                {state => (
                    <div 
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                        }}
                    >
                    {props.data?.map(loc => (
                        <div 
                            className="card m-3" 
                            key={loc.id} 
                            onClick={() => props.openArcadeDetails(loc)}
                            onMouseEnter={() => setHoveredCard(loc.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            style={{borderColor: hoveredCard == loc.id ? "#00B875" : "", borderWidth: 3, cursor: hoveredCard == loc.id ? "pointer" : "auto"}}
                        >
                            <BookmarkIcon 
                                isAuthenticated={props.isAuthenticated}
                                location={loc}
                                bookmarkId={props.bookmarks.find(b => b.coordinates.lat == loc.coordinates.lat && b.coordinates.lon == loc.coordinates.lon)?.id}
                                isFavorite={props.bookmarks.some(b => b.coordinates.lat == loc.coordinates.lat && b.coordinates.lon == loc.coordinates.lon)} 
                                addBookmark={props.addBookmark}
                                deleteBookmark={props.deleteBookmark}/>
                            <div className="card-body">
                                <h5 className="card-title text-primary m-0">{loc.name}</h5>
                                <p className="card-text m-0"><small className="text-muted">{loc.street}</small></p>
                                <h6 className="card-text font-weight-normal">{loc.description}</h6>
                            </div>
                        </div>
                    ))}
                    {(!props.data || props.data.length == 0) && (
                        <div className="card m-3" >
                            <div className="card-body">
                                <h6 className="card-text text-muted">Enter a city or address to search for locations near you</h6>
                            </div>
                        </div>
                    )}
                    </div>
                    )}
            </Transition>
        </div>
    );
};

export default connect(null, { openArcadeDetails })(Cards);

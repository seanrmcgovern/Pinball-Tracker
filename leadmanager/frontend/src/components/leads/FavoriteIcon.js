import React, { useState } from 'react';
import { Transition } from 'react-transition-group'; 
import { BsStar, BsFillStarFill } from "react-icons/bs";

const FavoriteIcon = (props) => { // props.isFavorite

    const [isHovered, setIsHovered] = useState(false);

    const [isFavorite, setIsFavorite] = useState(false);

    const toggleHovered = () => {
        setIsHovered(!isHovered);
    };

    const defaultStyle = {
        transition: "transform .3s ease-out",
        color: "#00B875",
        fontSize: 25,
        position: "absolute", 
        top: 10, 
        right: 10
    };

    const transitionStyles = {
        entering: { transform: "scale(1.5)", cursor: "pointer" },
        entered: { transform: "scale(1.5)", cursor: "pointer" },
        exiting: { transform: "scale(1)", cursor: "auto" },
        exited: { transform: "scale(1)", cursor: "auto" }
    };

    return (
        <Transition in={isHovered} timeout={200}>
            {state => (
                isFavorite ? <BsFillStarFill style={{...defaultStyle, ...transitionStyles[state]}} onMouseEnter={toggleHovered} onMouseLeave={toggleHovered}/> :
                <BsStar style={{...defaultStyle, ...transitionStyles[state]}} onMouseEnter={toggleHovered} onMouseLeave={toggleHovered}/>
            )}
        </Transition>
    )

};

export default FavoriteIcon;
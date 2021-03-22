import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group'; 
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";

const BookmarkIcon = (props) => {

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

    const [isHovered, setIsHovered] = useState(false);

    const toggleHovered = () => {
        setIsHovered(!isHovered);
    };

    const bookmark = (e) => {
        e.stopPropagation();
        props.addBookmark(props.location);
    };

    const removeBookmark = (e) => {
        e.stopPropagation();
        props.deleteBookmark(props.bookmarkId);
    }

    return (
        <Transition in={isHovered} timeout={200}>
            {state => (
                props.isAuthenticated ? (
                    props.isFavorite ? <BsFillBookmarkFill onClick={removeBookmark} style={{...defaultStyle, ...transitionStyles[state]}} onMouseEnter={toggleHovered} onMouseLeave={toggleHovered}/> 
                    : <BsBookmark onClick={bookmark} style={{...defaultStyle, ...transitionStyles[state]}} onMouseEnter={toggleHovered} onMouseLeave={toggleHovered}/>
                ) : (<Link to="/login">
                        <BsBookmark style={{...defaultStyle, ...transitionStyles[state]}} onMouseEnter={toggleHovered} onMouseLeave={toggleHovered}/>
                    </Link>)
            )}
        </Transition>
    )

};

export default BookmarkIcon;
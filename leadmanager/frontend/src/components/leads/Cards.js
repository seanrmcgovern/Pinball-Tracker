import React from 'react';
import FavoriteIcon from './FavoriteIcon';

const Cards = (props) => {

    const StarIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16"><path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/></svg>

    return (
        <div className="m-2">
            {props.data?.locations?.map(item => (
                <div className="card m-3 border" key={item.id}>
                    {/* <button class="btn btn-outline-success cc_pointer" style={{position: "absolute", top: 5, right: 5}}>
                        {StarIcon}
                    </button> */}
                    <FavoriteIcon/>
                    <div className="card-body">
                        <h5 className="card-title text-primary m-0">{item.name}</h5>
                        <p className="card-text m-0"><small className="text-muted">{item.street}</small></p>
                        <p className="card-text">{item.description}</p>
                        {/* // number of machines
                        // star icon for favoriting
                        // rating system */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cards;
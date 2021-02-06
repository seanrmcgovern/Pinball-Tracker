import React from 'react';

const Cards = (props) => {

    return (
        <div className="m-2">
            {props.data?.locations?.map(item => (
                <div className="card m-3" key={item.id}>
                    {/* <img class="card-img-top" src="..." alt="Card image cap"> */}
                    <div className="card-body">
                        <h5 className="card-title m-0">{item.name}</h5>
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
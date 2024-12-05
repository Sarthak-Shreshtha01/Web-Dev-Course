import { useState } from "react";

function Card({id,img,info,price,name}) {

    const description = `${info.substring(200)}....`;
    const [readmore, setreadmore] = useState(false);

    function readmoreHandler() {
        setreadmore(!readmore);
    } 

    function removeTour(id) {
        
    };

    return ( 
        <div className="card">

            <img src={img} alt="" className="image" />

            <div className="tour-info">
                <div className="tour-details">
                    <h4 className="tour-price">{price} </h4>
                    <h4 className="tour-name">{name} </h4>
                </div>

                <div className="description">
                    {description}
                    <span onClick={readmoreHandler}>
                        {readmore ? `show less`:`read more`};
                    </span>
                </div>
            </div>

            <button onClick={removeTour} className="btn-red">Not Interested</button>

        </div>
     );
}

export default Card;

import './Itemdate.css';

function Itemdate(props){

    const day = props.day;
    const month = props.month;
    const year = props.year;


    return(<div className='date'>
        <span>{day}</span>
        <span> {month} </span>
        <span> {year} </span>
    </div>);
}

export default Itemdate;
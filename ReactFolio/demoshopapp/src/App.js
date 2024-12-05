import './App.css';
import Item from './components/Item';
import Itemdate from './components/Itemdate';
import Card from './components/Card';

function App() {
  const response = [
    {
      itemName : "nirma",
      itemDay : "20",
      itemMonth : "june",
      itemYear : "1990"
    },
    {
      itemName : "nirma2",
      itemDay : "202",
      itemMonth : "june2",
      itemYear : "19902"
    },
    {
      itemName : "nirma3",
      itemDay : "203",
      itemMonth : "june3",
      itemYear : "19903"
    }
  ];
  return (
    <div>
      
      <Card>

        <Item name={response[0].itemName} >
          This is first element
        </Item>
        <Itemdate day={response[0].itemDay} month={response[0].itemMonth} year={response[0].itemYear} ></Itemdate>
        
        <Item name={response[1].itemName}></Item>
        <Itemdate day={response[1].itemDay} month={response[1].itemMonth} year={response[1].itemYear} ></Itemdate>

        <Item name={response[2].itemName}></Item>
        <Itemdate day={response[2].itemDay} month={response[2].itemMonth} year={response[2].itemYear} ></Itemdate>
        <div className="App">Hello</div>
      </Card>
    </div>
  );
}

export default App;

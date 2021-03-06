import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getCards, filterCardsByTitle, filterCardsByRegion, filterCardsByCategory } from '../../../Redux/actions/cardActions';
import {CardDeck, Card, Button} from 'react-bootstrap'
import {Spinner} from 'reactstrap'
import Filter from './Filter'


const HomeVisitor = ({result}) => {

  const TitleString = useSelector(state => state.cardReducer.TitleString)
  const RegionString = useSelector(state => state.cardReducer.RegionString)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCards())
  }, [])

const { isLoading } = useSelector((state) => state.authReducer);
  
  return (

  <Router>
    {isLoading ? 
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div> : 
  
  <div className="container" style={{marginBottom:'50px'}}>

    
    <Route path="/" render={() => (
      <>
      <Filter/>

      <div style={{display:'flex', flexWrap:'wrap'}}>
      { 
        result && result
        .filter(el => el.title.toLowerCase().includes(TitleString.toLowerCase().trim()))
        .filter(el => el.region.toLowerCase().includes(RegionString.toLowerCase().trim()))
        .map(card => 
          
  <CardDeck style={{margin: '15px'}}>
  <Card style={{ width: '18rem' , display:'flex', flexWrap:'wrap', textAlign:'center',  boxShadow: '0 8px 16px 0 lightBlue'}}>
    <Link to="/">
      <Card.Img variant="top" src={card.image} onClick={() => alert('You should register to see details')} style={{height:'12rem'}}/>
    </Link>
    <Card.Body style={{display:'flex', flexDirection:'column',alignContent:'space-around'}}>
      <Link to="/">
        <Card.Title onClick={() => alert('You should register to see details')}> {card.title} </Card.Title>
      </Link>
      <Card.Text>{card.region}</Card.Text>
      <Card.Text>{card.category}</Card.Text>
      <Card.Text>{card.description}</Card.Text>
    </Card.Body>
    {/*<Card.Footer>
      <small className="text-muted">Created at: {card.dateOfCreation.substr(0,10)}</small>
    </Card.Footer>*/}
    <Card.Footer style={{display:'flex'}}>
    <Button style={{margin:'3px'}}>Profile</Button>
    <Button style={{margin:'3px'}}>Website</Button>
    <Button style={{margin:'3px'}}>Join</Button>
    </Card.Footer>
  </Card>
  </CardDeck>
        )}
      </div>
      </>
      )}
    />
    
    
  </div>
}
  </Router>
  )
};

export default HomeVisitor; 
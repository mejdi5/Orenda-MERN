import React from 'react';
import { Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {CardDeck, Card} from 'react-bootstrap'
import Filter from './Filter'

function SubscribedIn({result}) {

const user = useSelector(state => state.authReducer.user)
const users = useSelector(state => state.userReducer.users)
const TitleString = useSelector(state => state.cardReducer.TitleString)
const RegionString = useSelector(state => state.cardReducer.RegionString)


return (

    <div className="container" style={{marginBottom:'50px'}}>
    <Filter/> 
    <div className="card-group">
      {result && result
      .filter(card => card.title.toLowerCase().includes(TitleString.toLowerCase().trim()))
      .filter(card => card.region.toLowerCase().includes(RegionString.toLowerCase().trim()))
      .map(card => 
      {const pro = users && users.find(user => user.email === card.email)
        return (
      card.subscribers.find(subscriber => subscriber._id === user._id) 
      ? 
      <CardDeck style={{margin: '20px', boxShadow: '0 8px 16px 0 lightBlue'}}>
      <Card style={{ width: '18rem' , display:'flex', flexWrap:'wrap', textAlign:'center'}}>
      {pro ? 
      <Link to={`/${pro._id}`}>
        <Card.Img variant="top" src={card.image} style={{height:'12rem'}}/>
      </Link> : 
      <Card.Img variant="top" src={card.image} style={{height:'12rem'}}/>} 
        <Card.Body style={{display:'flex', flexDirection:'column',alignContent:'space-around'}}>
      {pro ? 
      <Link to={`/${pro._id}`}>
        <Card.Title> {card.title} </Card.Title>
      </Link> : 
      <Card.Title> {card.title} </Card.Title>
      }
        <Card.Text>Region: {card.region}</Card.Text>
        <Card.Text>Category: {card.category}</Card.Text>
      </Card.Body>
        <Card.Footer>
          <small className="text-muted">Created at: {card.dateOfCreation.substr(0,10)}</small>
        </Card.Footer>
      </Card>
      </CardDeck>
      : null
      )})}
    </div>
    </div>
    )
}

export default SubscribedIn

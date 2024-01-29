import React from 'react'
import succesImg from '../assets/3.png'
import qrCode from '../assets/qrCode.png'
import { Row, Col,} from 'react-bootstrap';

export default function Success() {
  return (
    <div>
 <Row>
<Col>
<div style={{padding:50,display:'flex',justifyContent:'center',alignItems:'center'}}>
 <div>  
<img src={succesImg} height={250}/>
</div> 
<div>
<h5>Tickets Confrimed</h5>
<h5>Enjoy your movie</h5>
</div>
</div>
</Col>
<Col>
<div style={{padding:50,display:'flex',justifyContent:'center',alignItems:'center'}}>
<img src={qrCode} height={350}/>
</div >
</Col>
</Row>
    </div>
  )
}

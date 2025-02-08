import '../styles/LandingPage.css'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function LandingPage() {

    return (<>
   
    <Card>
      <Card.Img variant="top" src="/src/assets/coworkingBackground.jpg" className="coworking"/>
      <Card.ImgOverlay>
        <div className="allItems">
         <h1>Where would you like to work?</h1>
         <Card.Body>
           <Form>
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search by city"
                  className=" mr-sm-2"
                  style={{width: '32rem'}}
                />
              </Col>
            </Row>
           </Form>
          </Card.Body>
           <h3>The Code Chrysalis's Largest Coworking Space Marketplace</h3>
        </div>
      </Card.ImgOverlay>
    </Card>
   </>  
    );
};
export default LandingPage;
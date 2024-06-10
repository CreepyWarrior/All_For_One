import { useEffect, useState } from 'react';
import { MushroomStore_backend } from 'declarations/MushroomStore_backend';
import {Container, Row, Col, Card, Table, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function App() {
  const [mushrooms, setMushrooms] = useState ([]);
  const navigate = useNavigate();
useEffect(()=>{
  getMushroom()
}, []);

  function getMushroom() {
    Swal.fire("Cargando Productos!");
    Swal.showLoading();
    MushroomStore_backend.getAllMushroom().then(mushrooms => {
    setMushrooms(mushrooms);
    Swal.close();
  });
} 


  return (
    <Container className  = 'm-3'>
      <Row>
        <Card>
          <Card.Body>
            <Row>
              <Col>
            <Card.Title>Tienda de Hongos</Card.Title>
            </Col>
            <Col>
            <Button variant="secondary" onClick={()=> navigate('/Agregar')}>Agregar Objeto</Button>
            </Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Objeto</th>
                  <th>Descripcion</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {
                  mushrooms.length > 0?
                  mushrooms.map((mushroom) => (
                    <tr>
                      <td>{Number(mushroom.id)}</td>
                      <td>{mushroom.Name}</td>
                      <td>{mushroom.Description}</td>
                      <td>{Number(mushroom.Price)}</td>
                    </tr>
                  ))
                  : <tr></tr>
                }
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default App;

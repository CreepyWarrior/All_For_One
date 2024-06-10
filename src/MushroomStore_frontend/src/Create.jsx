import React from 'react-router-dom';
import { Form, Button, Container, Card, Row} from 'react-bootstrap';
import { useState } from 'react';
import { MushroomStore_backend } from 'declarations/MushroomStore_backend';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


const Create = () => {
    const [Title,setTitle] = useState("");
    const [Description,setDescription] = useState("");
    const [Price,setPrice] = useState(0);
    const navigate = useNavigate ();

    const onChangeTitle = (e) => {
        e.preventDefault()
        const preTitle = e.target.value;
        setTitle(preTitle);
    };

    const onChangeDescription = (e) => {
        e.preventDefault()
        const preDescription = e.target.value;
        setDescription(preDescription);
    };

    const onChangePrice = (e) => {
        e.preventDefault()
        const prePrice = e.target.value;
        setPrice(prePrice);
    };

    function createMushroom() {
        Swal.fire("Agregando Producto Nuevo !");
        Swal.showLoading();
        MushroomStore_backend.AddMushroom(Description,BigInt(Price), Title).then(() => {
            Swal.fire({
                icon: "success",
                title: "Ta bien",
                showConfirmButton: false,
                timer: 2000
            }).then (() => navigate('/'))
      }).catch ((err)=>{
        Swal.fire({
            icon: "error",
            title: "Error",
            showConfirmButton: false,
            timer: 2000
          });
          console.log("Error ", err)
      })
    } 

    return (
        <Container className='m-3'>
            <Row>
                <Card>
                    <Card.Title>Agregar Objetos a la Tienda</Card.Title>
                    <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control name="Title" onChang= {onChangeTitle} type="text" placeholder="Ingrese nombre de objeto" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control name="Description" onChange={onChangeDescription} as="textarea" placeholder="Ingrese los datos hacerca del objeto" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Precio que tendra</Form.Label>
            <Form.Control name='Price' onChange={onChangePrice} type="number" placeholder="Ingresar el numero de monedas que costara" />
          </Form.Group>
          <Button variant="secondary" onClick={createMushroom}>
            guardar 
          </Button>
        </Form>
        </Card.Body>
        </Card>
        </Row>
        </Container>
      );
}

export default Create;
import { useState } from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


export default function SearchModal({ text }) {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);

    function handleShow() {
        setFullscreen();
        setShow(true);
    }
    return (
        <>
            <Button className="linkBtn" onClick={() => handleShow()}>
                {text}
            </Button>

            <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body></Modal.Body>
            </Modal>
        </>
    )
}

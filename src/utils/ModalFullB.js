import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function ModalFullB(props) {


    return (
        <>
            <Modal show={props.show} fullscreen onHide={props.onHide}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>{props.children}</Modal.Body>
            </Modal>
        </>
    );
}

export default ModalFullB;

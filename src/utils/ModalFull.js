import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalFull({ breakpoint, children, text }) {
  const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow() {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>
      <Button className="linkBtn" onClick={() => handleShow()}>
        {text}{" "}
      </Button>

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}

export default ModalFull;

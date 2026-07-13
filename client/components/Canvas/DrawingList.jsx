import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import React from 'react';

function DrawingList({ drawings, currentDrawing, loadDrawing }) {
  return (
    <Row xs={2} sm={4} lg={6} className="g-3 p-2">
      {drawings.map((d) => (
        <Col key={d.id}>
          <Image
            src={d.imageUrl}
            onClick={() => loadDrawing(d.id)}
            style={{
              cursor: 'pointer',
              width: '100%',
              height: '120px',
              objectFit: 'cover',
            }}
          />
        </Col>
      ))}
    </Row>
  );
}

export default DrawingList;

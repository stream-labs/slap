import React, { CSSProperties, ReactChild } from 'react';
import { Col, Row } from 'antd';

export function PanelHeader(p: { title: string, extra?: ReactChild }) {
  const { title, extra } = p;
  const colStyle: CSSProperties = {
    backgroundColor: '#e1e3e4',
    lineHeight: '30px',
    borderBottom: '1px solid #ddd',
    borderTop: '1px solid #ddd',
    padding: '0 16px',
  };
  return (
    <Row
      wrap={false}
    >
      <Col flex="auto" style={{ ...colStyle, color: '#6A51B2' }}>{title}</Col>
      <Col flex="auto" style={{ ...colStyle, textAlign: 'right' }}>{extra}</Col>
    </Row>
  );
}

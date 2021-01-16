import React from "react";
import {
  AnnotationLabel,
} from "react-annotation";

import "./MyAnnotation.css"

const plot = [
  { 'x': -20, 'y': 50 },
  { 'x': 200, 'y': 30 },
  { 'x': -150, 'y': -20 },
  { 'x': -80, 'y': 30 },
  { 'x': -250, 'y': 10 },
  { 'x': -200, 'y': -50 },
  { 'x': -50, 'y': -100 },
  { 'x': 100, 'y': -80 },
]

const MyAnnotation = ({ title, label, color, wrap, i }) => {
  return (
    <>
      <AnnotationLabel
      className="note-style show-bg"
        x={0}
        y={0}
        dy={plot[i%8].y}
        dx={plot[i%8].x}
        color={color}
        editMode={true}
        connector={{"type":"line","end":"arrow", "endScale": "0.6"}}
        note={{
          title: title,
          label: label,
          align: "middle",
          orientation: "topBottom",
          bgPadding: 8,
          padding: 8,
          titleColor: "white",
          labelColor: "white",
          wrap: wrap,
          lineType:"horizontal"
        }}
      />
    </>
  );
};

MyAnnotation.defaultProps = {
  i: 0
}

export default MyAnnotation;

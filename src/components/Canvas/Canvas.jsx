/* eslint-disable react/prop-types */
// Canvas.js
import TextBlock from "../TextBlock/TextBlock";
import './Canvas.css'

const Canvas = ({ textBlocks, moveText, setSelectedText,handleBlur, canvasWidth, canvasHeight }) => {
  
  return (
    <div
      style={{
        position: 'relative',
        width: canvasWidth + 'px',
        height: canvasHeight + 'px',
        backgroundColor: 'rgb(232,232,232)',
      }}
      className="canvas"
    >
      {textBlocks.map((block) => (
        <TextBlock
          key={block.id}
          text={block.text}
          x={block.x}
          y={block.y}
          style={{
            fontSize: block.fontSize,
            fontWeight: block.fontWeight,
            fontStyle: block.fontStyle,
            textDecoration: block.textDecoration,
            fontFamily: block.fontFamily,
          }}
          onMove={(e) => moveText(e, block.id)}
          onSelect={(selectedText) => setSelectedText(selectedText)} // Handle selection
          onBlur={(newText, id) => handleBlur(newText, id)} // Handle text update on blur
          words={block.words}
        />
      ))}
    </div>
  );
};

export default Canvas;

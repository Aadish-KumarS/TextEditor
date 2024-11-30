/* eslint-disable react/prop-types */
import { useState, useRef } from 'react';

const TextBlock = ({ text, x, y, style, onMove, onBlur, onSelect }) => {
  const [isEditable, setIsEditable] = useState(false); 
  const textRef = useRef(null);  

  // Handle text block click event to set it as editable and select it
  const handleClick = () => {
    setIsEditable(true);  
    onSelect(text);  
    if (textRef.current) {
      textRef.current.focus(); 
    }
  };

  // Handle when editing is finished (on blur)
  const handleBlur = (e) => {
    setIsEditable(false);  
    onBlur(e.target.innerText);  
  };

  return (
    <div
      onClick={handleClick}  
      style={{
        position: 'absolute',
        left: x,  
        top: y,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        fontStyle: style.fontStyle,
        textDecoration: style.textDecoration,
        fontFamily: style.fontFamily,
        padding: '.25rem',
        cursor: 'pointer',  
      }}
    >
      <div
        ref={textRef}
        contentEditable={isEditable}  
        suppressContentEditableWarning  
        onBlur={handleBlur}  
        onMouseDown={(e) => onMove(e)}  
        style={{
          background: isEditable ? 'rgb(225, 225, 225)' : 'none',  
          outline: 'none',  
        }}
      >
        {text} 
      </div>
    </div>
  );
};

export default TextBlock;

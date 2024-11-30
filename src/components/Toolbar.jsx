/* eslint-disable react/prop-types */

import { useState, useCallback } from 'react';
import { BsTypeBold, BsTypeUnderline } from "react-icons/bs";
import { PiTextItalicLight } from "react-icons/pi";
import { FiAlignCenter } from "react-icons/fi";

const Toolbar = ({ applyTextStyle }) => {
  // State variables for text formatting and controls
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [fontSize, setFontSize] = useState(16);  // Default font size
  const [textAlign, setTextAlign] = useState("left");  // Default alignment
  const [fontFamily, setFontFamily] = useState("Arial");  // Default font family

  // Toggle style function for text formatting (bold, italic, underline)
  const toggleStyle = useCallback((styleKey, value, stateUpdater, currentValue) => {
    const newValue = !currentValue;  // Toggle current value
    stateUpdater(newValue);  // Update local state
    applyTextStyle({ [styleKey]: newValue ? value : "normal" });  // Apply the new style
  }, [applyTextStyle]);

  // Handle font size change with increment/decrement
  const changeFontSize = useCallback((increment) => {
    const newFontSize = Math.max(8, fontSize + increment);  // Prevent font size less than 8
    setFontSize(newFontSize);  // Update the font size state
    applyTextStyle({ fontSize: newFontSize });  // Apply the updated font size
  }, [fontSize, applyTextStyle]);

  // Handle text alignment (left, center, etc.)
  const handleTextAlign = useCallback((alignment) => {
    setTextAlign(alignment);  // Set the alignment state
    applyTextStyle({ textAlign: alignment });  // Apply the new alignment
  }, [applyTextStyle]);

  // Handle font family change
  const handleFontFamily = useCallback((e) => {
    const selectedFont = e.target.value;  // Get the selected font family
    setFontFamily(selectedFont);  // Update font family state
    applyTextStyle({ fontFamily: selectedFont });  // Apply the selected font family
  }, [applyTextStyle]);

  return (
    <section className="toolbar-container center">
      {/* Font Family Selector */}
      <div className="font-family center">
        <select value={fontFamily} onChange={handleFontFamily}>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>

      {/* Font Size Control (Increase / Decrease) */}
      <div className="font-size-controls center">
        <button onClick={() => changeFontSize(-2)}>-</button>
        <span>{fontSize}px</span>
        <button onClick={() => changeFontSize(2)}>+</button>
      </div>

      {/* Text Formatting Options (Bold, Italic, Underline) */}
      <div className="text-format center">
        <button
          onClick={() => toggleStyle("fontWeight", "bold", setIsBold, isBold)}
          className={isBold ? "active" : ""}
        >
          <BsTypeBold size={18} color={isBold ? "black" : "rgb(156,156,156)"} />
        </button>

        <button
          onClick={() => toggleStyle("fontStyle", "italic", setIsItalic, isItalic)}
          className={isItalic ? "active" : ""}
        >
          <PiTextItalicLight size={18} color={isItalic ? "black" : "rgb(156,156,156)"} />
        </button>

        <button
          onClick={() => handleTextAlign("center")}
          className={textAlign === "center" ? "active" : ""}
        >
          <FiAlignCenter size={18} color={textAlign === "center" ? "black" : "rgb(156,156,156)"} />
        </button>

        <button
          onClick={() => toggleStyle("textDecoration", "underline", setIsUnderline, isUnderline)}
          className={isUnderline ? "active" : ""}
        >
          <BsTypeUnderline size={18} color={isUnderline ? "black" : "rgb(156,156,156)"} />
        </button>
      </div>
    </section>
  );
};

export default Toolbar;

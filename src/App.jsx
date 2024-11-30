import { useState } from 'react';
import Canvas from './components/Canvas/Canvas';
import UndoRedo from './components/UndoRedoElement/Undoredoelement';
import Toolbar from './components/Toolbar/Toolbar';
import { RxText } from 'react-icons/rx';

const App = () => {
  // Canvas dimensions
  const canvasWidth = 1000;
  const canvasHeight = 500;

  // Initial state for text blocks
  const initialTextState = [
    {
      id: 1,
      text: 'Sample Text',
      x: 100,
      y: 100,
      fontSize: 16,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
    },
  ];

  // State hooks
  const [textBlocks, setTextBlocks] = useState(initialTextState);
  const [history, setHistory] = useState([initialTextState]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedText, setSelectedText] = useState(null);


  // ---------------------------------------------
  // Undo and Redo functionality
  // ---------------------------------------------
  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setTextBlocks(history[currentIndex - 1]);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTextBlocks(history[currentIndex + 1]);
    }
  };

  // Apply state change to history for undo/redo
  const applyState = (newState) => {
    const newHistory = [...history.slice(0, currentIndex + 1), newState];
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setTextBlocks(newState);
  };


  // ---------------------------------------------
  // Text Block Manipulation
  // ---------------------------------------------

  // Function to select a text block
  const selectText = (id) => {
    setSelectedText(selectedText === id ? null : id); // Deselect if same block is clicked
  };

  // Add new text block
  const addText = () => {
    const newTextBlock = {
      id: Date.now(),
      text: 'New Text',
      x: 100,
      y: 150,
      fontSize: 16,
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      fontFamily: 'Arial',
    };
    const newTextBlocks = [...textBlocks, newTextBlock];
    applyState(newTextBlocks);
  };

  // Move text block with canvas boundaries check
  const moveText = (e, id) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;

    const onMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      const updatedTextBlocks = textBlocks.map((block) =>
        block.id === id
          ? {
              ...block,
              x: Math.min(Math.max(block.x + deltaX, 0), canvasWidth - 100), // Prevent left/right overflow
              y: Math.min(Math.max(block.y + deltaY, 0), canvasHeight - 50), // Prevent up/down overflow
            }
          : block
      );
      applyState(updatedTextBlocks);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  // ---------------------------------------------
  // Text Styling
  // ---------------------------------------------
  const applyTextStyle = (style) => {
    if (selectedText !== null) {
      const updatedTextBlocks = textBlocks.map((block) =>
        block.text === selectedText ? { ...block, ...style } : block
      );
      applyState(updatedTextBlocks);
    } else {
      // Apply style to all blocks if no text is selected
      const updatedTextBlocks = textBlocks.map((block) => ({ ...block, ...style }));
      applyState(updatedTextBlocks);
    }
  };

  // Update text on blur (after editing)
  const handleBlur = (newText, id) => {
    const updatedTextBlocks = textBlocks.map((block) =>
      block.id === id ? { ...block, text: newText, edited: true } : block
    );
    applyState(updatedTextBlocks);
  };

  
  return (
    <section className="center">
      <div className="main-container">
        {/* Undo and Redo Controls */}
        <div>
          <UndoRedo undo={undo} redo={redo} />
        </div>

        {/* Canvas where text blocks are displayed and moved */}
        <Canvas
            textBlocks={textBlocks}
            moveText={moveText}
            setSelectedText={selectText} 
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            handleBlur={handleBlur}
        />

        {/* Toolbar for text styling */}
        <Toolbar applyTextStyle={applyTextStyle} />

        {/* Add new text block */}
        <button className="center add-text" onClick={addText}>
          <RxText size={18} /> Add Text
        </button>
      </div>
    </section>
  );
};

export default App;

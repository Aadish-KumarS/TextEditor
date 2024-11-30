/* eslint-disable react/prop-types */
import { BiUndo, BiRedo } from "react-icons/bi";

const UndoRedo = ({ undo, redo }) => {
  return (
    <section className="undoRedoElement center">
      <button onClick={undo} className="button-container center">
        <BiUndo size={30} color={"rgb(156,156,156)"}/>
        Undo
      </button>
      <button onClick={redo} className="button-container center">
        <BiRedo size={30} color={"rgb(156,156,156)"}/>
        Redo
      </button>
    </section>
  );
};

export default UndoRedo;

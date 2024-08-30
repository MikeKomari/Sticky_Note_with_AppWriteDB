import { useRef, useEffect, useState } from "react";
import "../assets/index.css";
import DeleteButton from "./DeleteButton";
import Spinner from "../icons/Spinner";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";
import { db } from "../appwrite/databases";

/* eslint-disable react/prop-types */
const NoteCard = ({ note }) => {
  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);

  const body = bodyParser(note.body);
  const color = bodyParser(note.color);
  const [position, setPosition] = useState(bodyParser(note.position));

  let mouseStartPos = { x: 0, y: 0 };
  const cardRef = useRef(null);

  const mouseDown = (e) => {
    if (e.target.className === "card-header") {
      setZIndex(cardRef.current);

      mouseStartPos.x = e.clientX;
      mouseStartPos.y = e.clientY;

      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    updateNotes("position", newPosition);
    // db.notes.update(note.$id, { position: JSON.stringify(newPosition) });
  };

  const mouseMove = (e) => {
    const mouseMoveDirection = {
      xChange: mouseStartPos.x - e.clientX,
      yChange: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDirection);

    setPosition(newPosition);
  };

  const updateNotes = async (key, value) => {
    //Biar kita bisa update apapun, key nya ini position, data dll
    const data = { [key]: JSON.stringify(value) };

    try {
      await db.notes.update(note.$id, data);
    } catch (err) {
      console.error(err);
    }

    setSaving(false);
  };

  //AUTO-GROWING THE CARD
  const textAreaRef = useRef(null);
  useEffect(() => {
    autoGrow(textAreaRef);
  }, []);

  //Timer untuk request untuk update notes
  //Jadi setiap 2 detik, update
  const handleKeyUp = () => {
    setSaving(true);

    if (keyUpTimer.current) clearTimeout(keyUpTimer.current);

    keyUpTimer.current = setTimeout(() => {
      updateNotes("body", textAreaRef.current.value);
    }, 2000);
  };

  return (
    <div
      className="card"
      ref={cardRef}
      style={{
        backgroundColor: color.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header"
        style={{ color: color.colorHeader }}
      >
        <DeleteButton noteID={note.$id} updateNotes={updateNotes} />
        {saving && (
          <div className="card-saving">
            <Spinner color={color.colorText} />
            <span style={{ color: color.colorText }}>Saving...</span>
          </div>
        )}
      </div>

      <div className="card-body">
        <textarea
          onKeyUp={handleKeyUp}
          onFocus={() => setZIndex(cardRef.current)}
          ref={textAreaRef}
          defaultValue={body}
          style={{ color: color.colorText }}
          onInput={() => {
            autoGrow(textAreaRef);
          }}
        ></textarea>
        ?
      </div>
    </div>
  );
};

export default NoteCard;

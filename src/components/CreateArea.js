import React, { useState } from "react";
import "./Popup.css";
const CreateArea = ({ onAdd, modal, setModal }) => {
  const [note, setNote] = useState({
    Title: "",
    TagLine: "",
    content: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }
  function submitButton(e) {
    e.preventDefault();
    if (note.Title !== "" && note.content !== "" && note.TagLine !== "") {
      onAdd(note);
      setNote({
        Title: "",
        TagLine: "",
        content: "",
      });
    } else {
      setModal(true);
    }
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <>
      {modal ? (
        <>
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <h2>Please fill all the fields</h2>
              <button className="close-modal" onClick={toggleModal}>
                CLOSE
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>
          <form onSubmit={submitButton}>
            <input
              value={note.Title}
              type="text"
              placeholder="Please provide Title"
              name="Title"
              onChange={handleChange}
            />
            <input
              value={note.TagLine}
              type="text"
              placeholder="Please provide Tagline"
              name="TagLine"
              onChange={handleChange}
            />
            <p>
              <textarea
                value={note.content}
                name="content"
                placeholder="Please provide body"
                onChange={handleChange}
              ></textarea>
            </p>
            <button>Add</button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateArea;

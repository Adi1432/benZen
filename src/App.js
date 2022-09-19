import Header from "./components/Header";
import CreateArea from "./components/CreateArea";
import Notes from "./components/Notes";
import { useState, useEffect } from "react";
import Count from "./components/Count";
import ReactPaginate from "react-paginate";
function App() {
  const [notes, setNotes] = useState([]);
  const [modal, setModal] = useState(false);
  // create note
  function addNote(newNote) {
    setNotes((prevNote) => {
      return [...prevNote, newNote];
    });
  }
  // delete note
  function deleteNotes(id) {
    setNotes((preValue) => {
      return [
        ...preValue.filter((note, index) => {
          return index !== id;
        }),
      ];
    });
  } //pin function
  function onPin(id) {
    let pinned = notes.splice(id, 1);
    setNotes(() => {
      return [...pinned, ...notes];
    });
  }
  console.log(notes);
  // paginatopn
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(notes.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(notes.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, notes]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % notes.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div>
        <Header />
        <Count
          count={
            notes.length === 0
              ? "Empty"
              : `showing ${notes.length} Notes are created `
          }
        />
        <CreateArea onAdd={addNote} modal={modal} setModal={setModal} />

        <div className="notesContainer">
          {currentItems.map((note, idx) => {
            return (
              <Notes
                onPin={onPin}
                modal={modal}
                todos={notes}
                key={idx}
                id={idx}
                Title={note.Title}
                content={note.content}
                TagLine={note.TagLine}
                onDelete={deleteNotes}
                todo={note}
                setTodos={setNotes}
              />
            );
          })}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={6}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
        />
      </div>
    </>
  );
}

export default App;

import { useState } from "react";
import Nav from "./components/nav";

function App() {
  const [list, setList] = useState([]);
  const [titleResults, setTitleResults] = useState("");
  const [readMainKey, setReadMainKey] = useState("");
  const [audio, setAudio] = useState("");

  const getDataFromApi = () => {};

  return (
    <>
      <main>
        <Nav />
        <div id="search-box">
          <span></span>
          <input id="search" name="search" type="text" placeholder="" />
        </div>
        <div id="main-result-box">
          <section className="main-result-section" id="first">
            <p>
              <strong></strong>
            </p>
            <p>
              <strong></strong>
            </p>
          </section>
          <section className="main-result-section" id="btn-box">
            <button></button>
          </section>
        </div>
        <div id="descryption-results-wrapper">
          <span>Meaning</span>
          <ul></ul>
          <section id="synoms-box">
            <p>
              <strong>Synonyms</strong>
            </p>
            <p id="synom-result">
              <strong></strong>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;

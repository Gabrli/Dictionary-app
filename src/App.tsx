import { KeyboardEvent, useState } from "react";
import Nav from "./components/nav";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import "./styles/app.css";
import axios from "axios";

function App() {
  const [meanings, setMeanings] = useState("");
  const [verbs, setVerbs] = useState("");
  const [titleResults, setTitleResults] = useState("");
  const [readMainKey, setReadMainKey] = useState("");
  const [sourceLink, setSourceLink] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [synoms, setSynoms] = useState("not find");
  const [audio, setAudio] = useState("");

  const handlerDataApi = (e: KeyboardEvent, inputValue: string) => {
    if (e.code === "Enter") {
      setMeanings("");
      setVerbs("");
      axios
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
        .then((res) => {
          setAudio(res.data[0].phonetics[0].audio);
          setTitleResults(res.data[0].word);
          setReadMainKey(res.data[0].phonetic);
          setMeanings(res.data[0].meanings[0].definitions[3].definition);
          setVerbs(res.data[0].meanings[1].definitions[2].definition);
          setSourceLink(res.data[0].sourceUrls[0]);
          setSynoms(res.data[0].meanings[0].synonyms[0]);

          if (res.data[0].phonetics[0].audio === "") {
            setAudio(res.data[0].phonetics[1].audio);
            if (res.data[0].phonetics[1].audio === "") {
              setAudio(res.data[0].phonetics[2].audio);
              if (res.data[0].phonetics[2].audio === "") {
                console.log("null");
              }
            }
          } else {
            setAudio(res.data[0].phonetics[0].audio);
          }
        });
    }
  };

  const playAudio = (audio: string) => {
    const play = new Audio(audio);
    play.play();
  };

  return (
    <>
      <Nav />
      <main>
        <div id="search-box">
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            id="search"
            name="search"
            type="text"
            placeholder="Enter the keyword"
            onKeyDown={(e) => handlerDataApi(e, inputValue)}
          />
          <span>{<AiOutlineSearch />}</span>
        </div>
        <div id="main-result-box">
          <section className="main-result-section" id="first">
            <p id="main-key">
              <strong>{titleResults}</strong>
            </p>
            <p id="how-read-text">
              <strong>{readMainKey}</strong>
            </p>
          </section>
          <section className="main-result-section" id="btn-box">
            <button onClick={() => playAudio(audio)}>{<FaPlay />}</button>
          </section>
        </div>
        <div id="first-box-hr" className="box-hr">
          <p>
            <strong>noun</strong>
          </p>
          <div id="hr-1" className="hr"></div>
        </div>
        <div id="descryption-results-wrapper">
          <span>Meaning</span>
          <ul>
            <li>{meanings}</li>
          </ul>
          <section id="synoms-box">
            <p>
              <strong>Synonyms</strong>
            </p>
            <p id="synom-result">
              <strong>{synoms}</strong>
            </p>
          </section>
        </div>
        <div id="second-box-hr" className="box-hr">
          <p>
            <strong>verb</strong>
          </p>
          <div id="hr-2" className="hr"></div>
        </div>
        <div id="verb-result-wrapper">
          <span>Meaning</span>
          <ul>
            <li>{verbs}</li>
          </ul>
        </div>

        <div id="source-box">
          <span>Source</span>
          <a href={sourceLink}>{sourceLink}</a>
          <span>{<BiLinkExternal />}</span>
        </div>
        <div id="production-box">
          <section>
            <p className="simple-end-text">Coded by</p>
            <p className="by-text">
              <a href="">Gabriel Wiśniewski</a>
            </p>
          </section>
          <section>
            <p className="simple-end-text">The challenge comes from</p>
            <p className="by-text">
              <a href="">Frontend Mentor | Challenges</a>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;

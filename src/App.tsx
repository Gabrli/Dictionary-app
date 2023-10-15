import { KeyboardEvent, useState } from "react";
import Nav from "./components/nav";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { BsFillVolumeUpFill } from "react-icons/bs";
import "./styles/app.css";
import "./styles/nav.css";
import axios from "axios";

function App() {
  const [meanings, setMeanings] = useState(
    "An associative array, a data structure where each value is referenced by a particular key, analogous to words and definitions in a physical dictionary."
  );
  const [verbs, setVerbs] = useState("To complite a dictionary");
  const [titleResults, setTitleResults] = useState("Dictionary");
  const [readMainKey, setReadMainKey] = useState("/ˈdɪkʃəˌnɛɹi/");
  const [sourceLink, setSourceLink] = useState(
    "https://en.wiktionary.org/wiki/dictionary"
  );
  const [inputValue, setInputValue] = useState("");
  const [synoms, setSynoms] = useState("");
  const [audio, setAudio] = useState(
    "https://api.dictionaryapi.dev/media/pronunciations/en/dictionary-uk.mp3"
  );
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState("light");

  const getDataFromApi = (inputValue: string) => {
    let data;
    setMeanings("");
    setVerbs("");
    setError(false);
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`)
      .then((res) => {
        data = res.data[0]
        setAudio(data.phonetics[0].audio);
        setTitleResults(data.word);
        setReadMainKey(data.phonetic);
        setMeanings(data.meanings[0].definitions[3].definition);
        setVerbs(data.meanings[1].definitions[2].definition);
        setSourceLink(data.sourceUrls[0]);
        setSynoms(data.meanings[0].synonyms[0]);
        console.log(data)
        if (data.phonetics[0].audio === "") {
          setAudio(data.phonetics[1].audio);
          if (data.phonetics[1].audio === "") {
            setAudio(data.phonetics[2].audio);
            if (data.phonetics[2].audio === "") {
              console.log("null");
            }
          }
        } else {
          setAudio(data[0].phonetics[0].audio);
        }
      })
      .catch((err) => {
        if (err) {
          setError(true);
        }
      });
  };

  const handlerEvent = (e: KeyboardEvent) => {
    if (e.code === "Enter") {
      getDataFromApi(inputValue);
    } 
  };

  const playAudio = (audio: string) => {
    const play = new Audio(audio);
    play.play();
  };

  const switchTheme = (theme: string) => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div data-theme={theme} className="app">
      <Nav switchTheme={() => switchTheme(theme)} />

      <main>
        <div className={error ? "active-error" : ""} id="search-box">
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onKeyDown={(e) => handlerEvent(e)}
            id="search"
            name="search"
            type="text"
            placeholder="Enter the keyword"
          />
          <span
            onClick={() => getDataFromApi(inputValue)}
            className={error ? "active-error-text" : "normal-text"}
          >
            {<AiOutlineSearch />}
          </span>
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
            <button onClick={() => playAudio(audio)}>
              {<BsFillVolumeUpFill />}
            </button>
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
          <a target="_blank" href={sourceLink}>
            {sourceLink}
          </a>
          <span>{<BiLinkExternal />}</span>
        </div>
        <div id="production-box">
          <section>
            <p className="simple-end-text">Coded by</p>
            <p className="by-text">
              <a
                target="_blank"
                href="https://gabrli.github.io/GabrielDeveloperSite/"
              >
                Gabriel Wiśniewski
              </a>
            </p>
          </section>
          <section>
            <p className="simple-end-text">The challenge comes from</p>
            <p className="by-text">
              <a
                target="_blank"
                href="https://www.frontendmentor.io/challenges/dictionary-web-app-h5wwnyuKFL"
              >
                Frontend Mentor | Challenges
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;

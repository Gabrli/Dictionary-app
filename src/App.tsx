import { KeyboardEvent, useState } from "react";
import Nav from "./components/nav";
import MainResult from "./components/resultsElements/mainResult";
import DescryptionResult from "./components/resultsElements/descryptionResult";
import VerbResult from "./components/resultsElements/verbresult";
import SearchBox from "./components/searchElements/searchBox";

import { BiLinkExternal } from "react-icons/bi";

import "./styles/app.css";
import "./styles/nav.css";
import axios from "axios";

function App() {
  const [meanings, setMeanings] = useState(
    "An associative array, a data structure where each value is referenced by a particular key, analogous to words and definitions in a physical dictionary."
  );
  const [verbs, setVerbs] = useState("To complite a dictionary");
  const [titleResults, setTitleResults] = useState("Dictionary");
  const [phoneticKey, setPhoneticKey] = useState("/ˈdɪkʃəˌnɛɹi/");
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
        data = res.data[0];
        setAudio(data.phonetics[0].audio);
        setTitleResults(data.word);
        setPhoneticKey(data.phonetic);
        setMeanings(data.meanings[0].definitions[3].definition);
        setVerbs(data.meanings[1].definitions[2].definition);
        setSourceLink(data.sourceUrls[0]);
        setSynoms(data.meanings[0].synonyms[0]);
        console.log(data);
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
        err.response.status === 404 ? setError(true) : "";
      });
  };

  const handlerEvent = (e: KeyboardEvent) => {
    e.code === "Enter" ? getDataFromApi(inputValue) : "";
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
        <SearchBox
          handlerEvent={(e: KeyboardEvent) => handlerEvent(e)}
          errorClass={error}
          setInputValue={setInputValue}
          inputValue={inputValue}
          getDataFromApi={() => getDataFromApi(inputValue)}
        />
        <MainResult
          titleResult={titleResults}
          phoneticKey={phoneticKey}
          playAudio={() => playAudio(audio)}
          audio={audio}
        />
        <div id="first-box-hr" className="box-hr">
          <p>
            <strong>noun</strong>
          </p>
          <div id="hr-1" className="hr"></div>
        </div>
        <DescryptionResult meanings={meanings} synoms={synoms} />
        <div id="second-box-hr" className="box-hr">
          <p>
            <strong>verb</strong>
          </p>
          <div id="hr-2" className="hr"></div>
        </div>
        <div id="verb-result-wrapper">
          <span>Meaning</span>
          <VerbResult verb={verbs} />
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

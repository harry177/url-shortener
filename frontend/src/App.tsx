import { ChangeEvent, useState } from 'react';
import { createShortUrl } from './api/requests';
import './App.css'

function App() {

  const [originalUrl, setOriginalUrl] = useState("");

  const handleUrlInput = (event: ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(event.target.value);
  };

  const handleUrlCreation = () => {
    createShortUrl(originalUrl);
  };

  return (
    <>
      <input onChange={handleUrlInput} value={originalUrl}></input>
      <button onClick={handleUrlCreation}>Submit</button>
    </>
  );
}

export default App

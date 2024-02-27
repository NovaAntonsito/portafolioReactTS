import './App.css'
import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [randomSong, setRandomSong] = useState<string | null>(null);


  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/v1/user/development');
        if (!response.ok) {
          throw new Error('Failed to fetch access token');
        }
        const data = await response.json();
        if (data.success) {
          setAccessToken(data.body);
          console.log('Access token retrieved:', data.body);
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
    
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(()=> {
    const fetchRandomSong = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/v1/user/getRandomSong?id=1');
        if (!response.ok) {
          throw new Error('Failed to fetch random song');
        }
        const data = await response.json();
        if (data.success) {
          setRandomSong(data.body);
        }
      } catch (error) {
        console.error('Error fetching random song:', error);
      }
    };


    if (accessToken) {
      fetchRandomSong();
    }
  }, [accessToken]);

  return (
    <>
    <h1>Vite + React</h1>
    <div className='player'>
  
      {accessToken && (
        <SpotifyPlayer token={accessToken} uris={[randomSong]} initialVolume={50} />
      )}
    </div>
    <p className="read-the-docs">
      Click on the Vite and React logos to learn more
    </p>
  </>
);
}

export default App;




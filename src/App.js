import './App.css';
import { useEffect, useState } from 'react';
import Auth from './Auth';
import axios from 'axios';
import {server} from './config';

const App = () => {
  const [token,setToken] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log(code);
    if(code){
      //googleAuthHandler(code)
    }
  },[]);

  // const googleAuthHandler = (code) => {
  //   setLoading(true);
  //   axios.post(`${server}/auth/signin/`,{code,service:"google"})
  //   .then(res => {
  //       localStorage.setItem("token",res.data.token);
  //       setToken(res.data.token)
  //       setLoading(false)
  //   })
  //   .catch(err => {
  //       console.log(err.response);
  //       setLoading(false);
  //       setError(err.response.data)
  //   })
  // }

  const logouthandler = () => {
    localStorage.removeItem("token");
    setToken(null);
  }

  const fetchDummyDataHandler = () => {
    setLoading(true);
    axios.get(`${server}/auth/dummy/`,{headers:{Authorization: `Bearer ${token}`}})
    .then(res => {
      setData(res.data);
      setError(null);
      setLoading(false);
    })
    .catch(err => {
      setError(err.response.data);
      setData(null);
      setLoading(false)
    });
  }

  const downloadcsvhandler = () => {
    setLoading(true);
    axios({
      url: `${server}/auth/history/`, 
      method: 'GET',
      responseType: 'blob', // important
      headers:{Authorization: `Bearer ${token}`}
  })
    .then(res => {
      setError(null);
      setLoading(false);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.csv'); //or any other extension
      document.body.appendChild(link);
      link.click();
    })
    .catch(err => {
      console.log(err)
      setError("Error in getting file");
      setData(null);
      setLoading(false)
    });
  }

  if(token)
  {
    return <div className="Home">
      <div className="Home__message">You are signed in</div>
      <div className="Home__fetchbutton" onClick={fetchDummyDataHandler}>Try getting dummy data using token</div>
      <div className="Home__data">{data}</div>
      <div className="Home__csv" onClick={downloadcsvhandler}>Get LoginReport</div>
      {error?<div className="Home__error">{error}</div>:null}
      <div onClick={logouthandler} className="Home__logout">Logout</div>
      {loading?<div className="loading">Loading ...</div>:null}
    </div>
  }
  else{
    return <div>
      <Auth />
    </div>
  }
}

export default App;

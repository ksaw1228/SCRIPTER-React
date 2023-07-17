import React from 'react';
import { useEffect, useState ,useRef } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import './style.css';


function YourComponent() {
  const { id } = useParams();
  const [top, setTop] = useState([])
  const [topValue, setTopValue] = useState([])
  const [bot, setBot] = useState([])
  const [topR,setTopR] = useState([])
  const [loadCount, setLoadCount] = useState(0)
  const [mid, setMid] = useState("")
  const [inputValue, setInputValue] = useState("")
  const topRef = useRef(null);

  useEffect(() => {
    fetch(`https://earnest-fuze-387700.du.r.appspot.com/api/${id}`)
      .then((response) => response.json())
      .then((json) => {
        const newLoadCount = json.loadCount;
        setLoadCount(newLoadCount);
        setTop(json.text.slice(0, newLoadCount));
        setTopValue(json.topValue.slice(0, newLoadCount));
        setMid(json.text[newLoadCount]);           
        setBot(json.text.slice(newLoadCount + 1)); 
        setTopR(json.Rtext)
      });
  }, []);
  useEffect(() => {
    topRef.current.scrollTo(0, topRef.current.scrollHeight);
  }, [top]);
  function onSubmit(e){
    e.preventDefault()
    setTop(prevState => prevState.concat(mid))
    setTopValue(prevState => prevState.concat(inputValue))
    setMid(bot[0])
    setBot(bot.filter((_, index) => index !== 0))
    setLoadCount(loadCount+1)
    setInputValue('')
  }
  const onButtonClick = async () => {
    try {
      await axios.post("https://earnest-fuze-387700.du.r.appspot.com/save", {
        _id: id,
        loadCount: loadCount,
        topValue: topValue,
      });
      
      // 요청 성공 후 알림창을 사용하여 "저장 완료" 메시지 표시
      alert("저장 완료");
    } catch (error) {
      console.error("POST 요청 중 오류 발생:", error);
    }
  };
  const logoutClick = async () => {
    try {
      await axios.post("https://earnest-fuze-387700.du.r.appspot.com/logout", {
      });
    } catch (error) {
      console.error("POST 요청 중 오류 발생:", error);
    }
    window.location.replace('/')
  };
  
  
  function onChange(e){
    setInputValue(e.target.value)
  }
  return (

<div className="backcor">
<div className="parent">
    <div id="navpar">
        <div id="nav">
        <nav className="navC">
      <div className="navC-left">
        <a href="/" className="navC-item" style={{fontFamily: 'fira-sans-900italic', color: '#ffe1e1'}}>SCRIPTER</a>
        <a href="#" className="navC-item"></a>
        <a href="#" className="navC-item"></a>
      </div>
      <div className="navC-right">
        <a href="/contect" className="navC-item"><img src="mail.png" style={{filter: 'invert(100%)'}} alt="mail"/></a>
        <a href="#" className="navC-item" onClick={logoutClick}><img src="logout.png" style={{filter: 'invert(100%)'}} alt="logout"/></a>
        <a href="/login" className="navC-item"><img src="user.png" style={{filter: 'invert(100%)'}} alt="User"/></a>
      </div>
    </nav>
        </div>
    </div>
    <div className="space"><a href='/main'><button className='button topBtn'>목록</button></a><button className='button topBtn' onClick={onButtonClick}>저장</button></div>
  <div id='toppar' className="hide-scrollbar">
    <div id="topLeft" className="hide-scrollbar" ref={topRef}>
        {top.map((v,i) => {
            return(<div style={{border:'1px solid black'}}>
              <><div>{v}</div><div>{topValue[i]}</div></></div>)
          })}
    </div>
    <div id="topRight" className="hide-scrollbar">
    {topR.map((i) => {
        return(<div>{i}</div>)
      })}
    </div>
  </div>
  <div id="mid" className="hide-scrollbar">
    <form id="mid-form" onSubmit={onSubmit}>
      <div id="midMap">{mid}</div>
      <input type="text" className="input-text" placeholder="Enter text" onChange={onChange} value={inputValue} required></input>
      <button className="button">Enter</button>
    </form>
  </div>
  <div id='bot' className="hide-scrollbar">
    {bot.map((i) => {
        return(<div>{i}</div>)
      })}
</div>
<div className="space"></div>
</div>
</div>
  );  
}

export default YourComponent;


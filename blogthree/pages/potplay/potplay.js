import play from "./potplay.module.css";
import Image from 'next/image';
import dynamic from "next/dynamic";
import { useEffect, useState,useRef } from "react";
import { io } from "socket.io-client";
import { nanoid } from "nanoid"
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })



export default function PotPlay() {
    let pref = useRef();
    let chatcom  = useRef();
    let lefttp  = useRef();
    let [StarList, setStarList] = useState([]);
    let valueall = [];
    let valuesll = [];
    // 视频播放URL
    let [videoUrl, setvideUrl] = useState('https://vip.lz-cdn16.com/20221219/353_756732c2/2000k/hls/mixed.m3u8');
    // socket
    let [sockets,setSocket] = useState(null);
    // 随机id
    let [id,setId] = useState('');
   
    useEffect(() => {
        nanoid.id = nanoid();
        setId(id = nanoid.id)
        Resulrapi();
        const socket = io("ws://localhost:3000");
        setSocket(sockets = socket)
        socket.on("connection",function(socket){
        pref.current.innerText = '正在连接中'
       })
        socket.on("connect",() => { 
            pref.current.style='display: none';
           
        })
        
        socket.on('servermsg', function(message) {
            console.log(message)
            if(id == message.name){
              return;
            }else{
                let lefttp = document.createElement('div');
                lefttp.classList = [`${play.leftp}`];
                let span = document.createElement('span');
                span.innerText =message.name.slice(0,4) + '：' + message.value  ;
                lefttp.appendChild(span);
                chatcom.current.appendChild(lefttp);
                   

            }
       })
        // 连接失败
        socket.io.on("error", (error) => {
            console.log(error)
            pref.current.style='display: block';
            pref.current.innerText = '连接失败， 正在重新连接中....'
            
          });
    }, [])
    async function Resulrapi() {
       
            let result = await fetch('http://127.0.0.1:8080/api/Stardesc', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(result)
        let res = await result.json();
        setStarList(StarList = res);
        
       
    }
  
    // 集数选择
    function handleEpis(e) {
        let Url = e.target.getAttribute('url');
        setvideUrl(videoUrl = Url);
    }
    function handleChange(e){
        if(e.keyCode == 13){
            // 去除空格
            let value = e.target.value;
            let message = {
                name:id,
                value:value
            }
            sockets.emit('chat', message)
            e.target.value = '';
            // <div ref={rightp} className={play.rightp}><span></span></div>
            let rightp = document.createElement('div');
            rightp.classList = [`${play.rightp}`];
            let span = document.createElement('span');
            span.innerText = value + ':';
            rightp.appendChild(span);
            chatcom.current.appendChild(rightp);
        }


    }
   
    return (
        <div className={play.playContainer}>
            <div className={play.playLeft}>
                <div className={play.PlayersContainer}>
                    {/* <div className={play.img} >
                        <Image alt="starimg" width={260} height={360} priority src="http://localhost:8080/star.jpeg"></Image>
                    </div> */}
                    {StarList.map((value, key) =>
                        <div className={play.title} key={key}> <h1>{value.title}</h1>
                            <ul className={play.Works}>
                                {/* <li>导演：{value.Director
                                }</li> */}
                                <li>剧情简介：{value.desc}</li>
                                {/* <li>类型：{value.type
                                }</li> */}
                                {/* <li>国家/地区：{value.Region}</li>
                                <li>又名：{value.names}</li>
                                 */}
                            </ul>
                        </div>
                    )
                    }
                </div>
                {/* 集数 */}
                <div className={play.episodes}>
                    <ul onClick={handleEpis} className={play.episodesList}>
                        <li url="https://vip.lz-cdn16.com/20221219/353_756732c2/2000k/hls/mixed.m3u8">第一集</li>
                        <li url="https://vip.lz-cdn16.com/20221219/342_bd3c209d/2000k/hls/mixed.m3u8">第二集</li>
                        <li url="https://vip.lz-cdn16.com/20221219/344_ac3ac181/2000k/hls/mixed.m3u8">第三集</li>
                        <li url="https://vip.lz-cdn16.com/20221219/345_237a4a26/2000k/hls/mixed.m3u8">第四集</li>
                        <li url="https://vip.lz-cdn16.com/20221219/346_539d79c8/2000k/hls/mixed.m3u8">第五集</li>
                        <li url="https://vip.lz-cdn16.com/20221219/349_24773672/2000k/hls/mixed.m3u8">第六集</li>
                        <li url="https://vip.lz-cdn16.com/20221219/347_af23bd67/2000k/hls/mixed.m3u8">第七集</li>
                        <li url="https://vip.lz-cdn16.com/20221219/348_303e4d79/2000k/hls/mixed.m3u8">第八集</li>
                        <li url="https://vip.lz-cdn16.com/20221219/352_90d90a3b/2000k/hls/mixed.m3u8">第九集</li>
                        <li url="https://vip.lz-cdn16.com/20221219/351_00064dbb/2000k/hls/mixed.m3u8">第十集</li>
                        <li url='https://vip.lz-cdn16.com/20221219/350_4e3edbeb/2000k/hls/mixed.m3u8'>第十一集</li>
                        <li url="https://vip.lz-cdn16.com/20221219/354_3b2267c0/2000k/hls/mixed.m3u8">第十二集</li>
                        <li url="https://vip.lz-cdn16.com/20221219/353_756732c2/2000k/hls/mixed.m3u8">第十三集</li>
                    </ul>
                </div>
                <section className={play.section} >
                    <ReactPlayer light={<img src='http://localhost:8080/883691.png' alt='Thumbnail' />} width={'100%'} height={'100%'} controls url={videoUrl}>
                    </ReactPlayer>
                </section>


            </div>
            <div className={play.playRight}>
                <div className={play.zoomtitle}>
                <h1>聊天室</h1>
                </div>
                
                <div className={play.ChatBox}>
                     <div className={play.chatContainer}>
                     <p className={play.chatp} ref={pref}></p>
                     <div className={play.chatcom} ref={chatcom}>
                     {/* <div ref={lefttp} className={play.leftp}> <span ></span></div>
                     <div ref={rightp} className={play.rightp}><span></span></div> */}
                     </div>
                    
                     </div>
                    {/*  <svg t="1683123364121"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2401" width="32" height="32"><path d="M510.56 88.847c-232.294 0-421.278 188.985-421.278 421.278S278.266 931.404 510.56 931.404c232.293 0 421.278-188.985 421.278-421.278S742.853 88.847 510.56 88.847zM270.937 233.909c20.479-31.955 48.104-49.553 77.785-49.553a74.68 74.68 0 0 1 19.453 2.584c6.005-3.799 12.559-5.892 19.423-5.892 27.931 0 50.745 34.602 52.196 78.146 11.248 26.363 17.291 57.207 17.291 89.424 0 43.203-10.859 83.941-30.578 114.709-20.479 31.955-48.104 49.553-77.785 49.553-29.681 0-57.305-17.598-77.785-49.553-19.719-30.768-30.578-71.506-30.578-114.709s10.859-83.94 30.578-114.709zM780 628.453c0 65.554-18.879 117.452-55.996 154.252-20.215 20.042-45.878 35.513-76.783 46.373l0.061 39.637-2.677 1.928c-1.174 0.819-29.605 20.053-123.605 25.315v0.417l-4-0.208-4 0.208v-0.417c-94-5.262-122.485-24.496-123.658-25.314l-2.721-1.928 0.057-39.463c-31.061-10.815-56.891-26.471-76.821-46.603-19.026-19.218-33.303-42.993-42.157-70.664-5.341-16.692-8.864-35.192-10.593-55.246-0.786-9.115-1.107-18.552-1.107-28.285V620h524v8.453z m-29.888-165.126c-20.479 31.955-48.104 49.553-77.785 49.553s-57.305-17.598-77.785-49.553c-19.719-30.768-30.578-71.506-30.578-114.709s10.859-83.941 30.578-114.709c20.479-31.955 48.104-49.553 77.785-49.553 7.163 0 14.204 1.035 21.055 3.039 7.357-6.244 15.769-9.79 24.706-9.79 28.868 0 52.271 36.961 52.271 82.555 0 5.386-0.337 10.374-0.961 15.006 7.381 22.519 11.292 47.54 11.292 73.452 0.001 43.203-10.859 83.941-30.578 114.709z" fill="#F9F455" p-id="2402"></path><path d="M922.517 336.09c-22.519-53.242-54.755-101.055-95.811-142.11-41.056-41.056-88.869-73.292-142.111-95.812-55.13-23.318-113.684-35.141-174.035-35.141S391.654 74.85 336.525 98.168c-53.242 22.52-101.055 54.755-142.112 95.812-41.056 41.056-73.292 88.869-95.811 142.11-23.317 55.13-35.141 113.684-35.141 174.035S75.284 629.031 98.602 684.16c22.519 53.241 54.755 101.055 95.811 142.11 41.057 41.057 88.87 73.292 142.112 95.812 55.129 23.318 113.683 35.141 174.034 35.141s118.906-11.823 174.034-35.141c53.242-22.52 101.055-54.756 142.111-95.812 41.056-41.056 73.292-88.868 95.811-142.11 23.318-55.131 35.141-113.684 35.141-174.035s-11.822-118.904-35.139-174.035z m9.321 174.035c0 232.293-188.985 421.278-421.278 421.278-232.294 0-421.278-188.985-421.278-421.278S278.266 88.847 510.56 88.847c232.293 0 421.278 188.985 421.278 421.278z" fill="" p-id="2403"></path><path d="M386.728 770.75l0.138-133.75H273.461c0.848 35 6.924 64.549 18.388 89.534 0.277 0.183 36.812 24.258 94.879 44.216zM647 810.814c23-8.797 42.76-20.464 58.95-35.003-13.158 11.145-31.95 23.532-58.95 33.891v1.112zM732.471 745.061C751.304 716.239 761.359 680 762.527 637H647.025l0.124 144.596c28.116-8.21 56.716-20.068 85.322-36.535zM387 810.844v-0.271c-28-10.637-46.845-23.805-60.979-36.539C342.298 789.401 362 801.682 387 810.844z" fill="#FFFFFF" p-id="2404"></path><path d="M256 628.453c0 9.734 0.324 19.17 1.11 28.285 1.729 20.054 5.292 38.554 10.633 55.246 8.854 27.671 23.118 51.446 42.144 70.664 19.931 20.132 45.763 35.789 76.824 46.603l-0.039 39.463 2.672 1.928c1.174 0.82 29.656 20.054 123.656 25.316v0.417l4-0.208 4 0.208v-0.417c94-5.262 122.431-24.496 123.604-25.314l2.693-1.928-0.071-39.637c30.905-10.86 56.566-26.331 76.781-46.373C761.125 745.906 780 694.008 780 628.453V620H256v8.453zM762.527 637c-1.168 43-11.223 79.239-30.056 108.061 0.011-0.006 0.022 0.003 0.033-0.004 0 0-6.661 13.971-26.467 30.747-16.19 14.538-36.037 26.213-59.037 35.01v-1.111l0.063-28.092L647.025 637h115.502z m-236.353-2H634.113l0.195 226.444c-8.518 4.349-38.128 16.496-108.21 21.005L526.174 635z m-126.396 0h107.94l0.076 247.532c-69.455-4.482-99.575-16.893-108.21-21.214L399.778 635z m-12.912 2l-0.138 133.75c0.008 0.003 0.016 0.02 0.024 0.023l0.131 39.792c-0.016-0.006 0.118-0.005 0.118-0.012V810.843c-25-9.161-44.867-21.443-61.144-36.809-0.179-0.169-0.447-0.334-0.626-0.504-26.778-24.353-33.36-46.957-33.36-46.957s-0.009 0.004-0.007 0.005l-0.011-0.034C280.389 701.561 274.309 672 273.461 637h113.405z" fill="" p-id="2405"></path><path d="M348.722 495.667c23.611 0 46.089-14.784 63.292-41.628 17.964-28.03 27.858-65.469 27.858-105.421 0-17.84-1.978-35.176-5.761-51.4-8.668 21.094-26.235 30.006-46.512 30.006-28.868 0-52.271-18.027-52.271-63.621 0-24.634 6.834-46.744 17.668-61.87a56.345 56.345 0 0 0-4.274-0.164c-23.611 0-46.089 14.784-63.292 41.628-17.964 28.03-27.858 65.469-27.858 105.421s9.893 77.391 27.858 105.421c17.203 26.844 39.681 41.628 63.292 41.628z" fill="#FFFFFF" p-id="2406"></path><path d="M348.722 512.88c29.681 0 57.305-17.598 77.785-49.553 19.719-30.768 30.578-71.506 30.578-114.709 0-32.218-6.042-63.061-17.291-89.424-1.451-43.544-24.265-78.146-52.196-78.146-6.864 0-13.418 2.093-19.423 5.892a74.68 74.68 0 0 0-19.453-2.584c-29.681 0-57.305 17.598-77.785 49.553-19.719 30.768-30.578 71.506-30.578 114.709s10.859 83.941 30.578 114.709c20.48 31.955 48.104 49.553 77.785 49.553zM285.43 243.197c17.203-26.844 39.681-41.628 63.292-41.628 1.429 0 2.854 0.057 4.274 0.164-10.834 15.126-17.668 37.236-17.668 61.87 0 45.594 23.402 63.621 52.271 63.621 20.277 0 37.844-8.912 46.512-30.006 3.783 16.224 5.761 33.56 5.761 51.4 0 39.951-9.893 77.391-27.858 105.421-17.203 26.844-39.681 41.628-63.292 41.628-23.611 0-46.089-14.784-63.292-41.628-17.964-28.03-27.858-65.469-27.858-105.421s9.893-77.391 27.858-105.421z" fill="" p-id="2407"></path><path d="M718.089 323.782c-28.868 0-52.271-18.027-52.271-63.621 0-22.578 5.741-43.036 15.04-57.94a56.581 56.581 0 0 0-8.531-0.652c-23.611 0-46.089 14.784-63.292 41.628-17.964 28.03-27.858 65.469-27.858 105.421s9.893 77.391 27.858 105.421c17.203 26.844 39.681 41.628 63.292 41.628s46.089-14.784 63.292-41.628c17.964-28.03 27.858-65.469 27.858-105.421 0-15.412-1.478-30.446-4.318-44.714-9.571 13.853-24.404 19.878-41.07 19.878z" fill="#FFFFFF" p-id="2408"></path><path d="M770.36 260.161c0-45.594-23.402-82.555-52.271-82.555-8.937 0-17.349 3.545-24.706 9.79-6.852-2.004-13.893-3.039-21.055-3.039-29.681 0-57.305 17.598-77.785 49.553-19.719 30.768-30.578 71.506-30.578 114.709s10.859 83.941 30.578 114.709c20.479 31.955 48.104 49.553 77.785 49.553s57.305-17.598 77.785-49.553c19.719-30.768 30.578-71.506 30.578-114.709 0-25.912-3.911-50.933-11.292-73.452 0.624-4.633 0.961-9.62 0.961-15.006z m-34.74 193.878c-17.203 26.844-39.681 41.628-63.292 41.628s-46.089-14.784-63.292-41.628c-17.964-28.03-27.858-65.469-27.858-105.421s9.893-77.391 27.858-105.421c17.203-26.844 39.681-41.628 63.292-41.628 2.863 0 5.709 0.222 8.531 0.652-9.299 14.904-15.04 35.362-15.04 57.94 0 45.594 23.402 63.621 52.271 63.621 16.666 0 31.499-6.025 41.07-19.878 2.84 14.268 4.318 29.302 4.318 44.714 0 39.952-9.894 77.391-27.858 105.421z" fill="" p-id="2409"></path><path d="M647.174 809.702c26.795-10.36 45.792-22.746 58.95-33.891 19.806-16.776 26.38-30.739 26.38-30.739l-0.033 0.019c-28.606 16.467-57.206 28.34-85.321 36.55l0.024 28.061zM292 726.573v0.001l-0.078 0.004c0.031 0.107 6.575 22.657 33.289 46.952 14.164 12.882 33.97 26.25 61.479 37.023 0.016 0.006 0.021 0.013 0.037 0.019l0.029-39.785-0.026-0.008c-58.067-19.958-94.523-44.018-94.801-44.201l0.071-0.005z" fill="#FF9702" p-id="2410"></path><path d="M634.114 635H526.174l-0.076 247.533c70.082-4.508 99.692-16.825 108.21-21.174L634.114 635zM507.718 635h-107.94l-0.195 226.403c8.635 4.321 38.755 16.563 108.21 21.045L507.718 635z" fill="#FFFFFF" p-id="2411"></path></svg> */}
                     <div className={play.edit}>   
                          <input id={play.paragraph} onKeyDown={handleChange}    placeholder="发送消息" rows="1" ></input>
                      
                     </div>
                </div>
            </div>
        </div>
    )
}
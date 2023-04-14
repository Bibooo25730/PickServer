import Colorcs from "./Colorpick..module.css"
import {useEffect,useState,useRef} from "react"


export default function ColorPick(){
    let [ctx,setCtx] = useState();
    let refim = useRef(0);
    let refims = useRef(0);
    let cards = useRef(0);
    useEffect(()=>{
             var c= document.getElementById("canvas");
             let ctxs=c.getContext("2d");
             var img=document.getElementById("imgol");
             let w = img.width;
             let h = img.height;
            ctxs.drawImage(img,0,0,w,h);
           setCtx(ctx = ctxs)
            
    },[])
 
   function handleTouch(event){
    
      event = event || window.event;
      var x = event.nativeEvent.offsetX;
      var y = event.nativeEvent.offsetY;
      console.log(event)
      console.log(x,y)
      let pxArr = ctx.getImageData(x, y, 1, 1).data;
      let rgba = 'rgba(' + pxArr[0] + ',' + pxArr[1] +',' + pxArr[2] + ',' + (pxArr[3] / 255) + ')';
      refim.current.style.backgroundColor = rgba;
      cards.current.style.backgroundColor = rgba;
      refims.current.textContent = rgba;
      }
     function handleDropper(){
        const resultElement = document.getElementById("cards");
        const resulthElement = document.getElementById("resulth");
        const btn1 = document.getElementById("btn1");
        if (!window.EyeDropper) {
            resulthElement.textContent =
              "您的浏览器不支持EyeDropper API";
            return;
          }
          const eyeDropper = new EyeDropper();
          eyeDropper
          .open()
          .then((result) => {
            resultElement.style.backgroundColor = result.sRGBHex;
            resulthElement.textContent = result.sRGBHex;
            btn1.style.color = result.sRGBHex;
          })
          .catch((e) => {
            console.log(e)
            resulthElement.textContent = e;
          });
     }
  
   
    return(
        <div className={Colorcs.Colorcontainer}>
            <div className={Colorcs.name}>
                <div className={Colorcs.Contas}>
                <i className={'iconfont icon-yanse'}></i> <h1>图片拾色器</h1>
                </div>
              
               <div className={Colorcs.ShangC}>
                   <i title="点击我" className={' iconfont icon-shangchuantupian'}>         </i>
                   <span className={Colorcs.ftp}>上传图片</span>
                   
               </div>
            </div>
             <div id="cards" className={Colorcs.cardCon}>
                 <div ref={cards} className={Colorcs.card} >
                     <div  className={Colorcs.imgol}   >

                        {/* <img id="imgol" style={{display:'none'}}   src="http://localhost:3000/_next/static/media/bg.a99082d1.png"></img> */}
                        <canvas style={{display:'none'}}  id="canvas" onClick={handleTouch}   width="885" height="497"></canvas>
                     {/* <Image src=""
                      alt="headPic" priority width={120}
                  height={120}></Image> */}
                      <div ref={refim} className={Colorcs.cardsm}>
                          
                      </div>
                     </div>
                     <h3 ref={refims}>rgba()</h3>
                 </div>
                 <div  className={Colorcs.cards}>
                      <h3>拾色器</h3>
                      <p>点击下面的按钮，在你的屏幕上任何地方选择一种颜色！</p>
                      <button  className={Colorcs.btn} onClick={handleDropper}>
                      <i id="btn1" title="点击我" className={' iconfont icon-bi'}></i>
                      </button>
                      <p id="result">Selected colour:</p>
                      <h3 id="resulth">rgba()</h3>
                      <div >
    <iframe src="//player.bilibili.com/player.html?aid=419554542&bvid=BV1F3411r7rR&cid=382913646&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"  sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>
</div>

                 </div>
             </div>
        </div>
    )
}
import fs from "fs";
import path from 'path'
const publicPath = path.resolve(process.cwd(), "public");

const fontSquareBanner = fs.readFileSync(`${publicPath}/fonts/bpg-square-banner/bpg-square-banner-2013-webfont.ttf`);
const base64SquareBanner = new Buffer.from(fontSquareBanner).toString('base64');

const fontSquareBanner2013 = fs.readFileSync(`${publicPath}/fonts/bpg-square-banner-caps/bpg-square-banner-caps-2013-webfont.ttf`);
const base64SquareBanner2013 = new Buffer.from(fontSquareBanner2013).toString('base64');

const styles = `
  :root {
    --dark-blue: #051a25;
    --light-blue: #276a91;
    --blue: #193e53;
    --gray: #aaa;
  }

  @font-face {
    font-family: 'BPG Square Banner 2013';
    src: url('data:woff2;charset=utf-8;base64,${base64SquareBanner}') format('woff2');
  }      
  @font-face {
    font-family: 'BPG Square Banner Caps 2013';
    src: url('data:woff2;charset=utf-8;base64,${base64SquareBanner2013}') format('woff2');
  }

  body{
    width: 505px;
    height: 802.5px;
  }

  .card {
    font-family: "BPG Square Banner Caps 2013", sans-serif;
    width: 500.775px;
    height: 802.5px;
    border: 2px solid #ddd;
    color: #161616;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
  }

  .card * {
    font-family: inherit;
    margin: 0;
    padding: 0;
    line-height: 1;
    font-weight: 400;
  }

  .card header {
    background-color: transparent;
    border: 0;
    padding: 27.5px 25px 0 25px;
    margin-bottom: 5rem;

  }

  .card header h3 {
    font-size: 25px;
    margin-bottom: 1rem;

  }

  .card header span {
    font-size: 18px;
    color: var(--blue);
  }

  .card main {
    padding: 0 25px;
    flex: 1;
  }

  .card main span {
    font-family: "BPG Square Banner 2013", sans-serif;
    font-size: 12.5px;
    opacity: 0.5;
  }

  .card main h4 {
    font-size: 27.5px;
    margin: 14px 0 60px;
    letter-spacing: -1px;
  }
    
  .badge {
    width: 100px;
    height: 90px;
    border-radius: 50%;
    background: #fff;
    margin-top: -1.5rem;
    overflow: hidden;
    object-fit: cover;

    position: absolute;
    left: 25px;
    bottom: 112.5px;

    -webkit-filter: grayscale(40%);
    filter: grayscale(40%);
  }

  .avatar {
    width: 165px;
    height: 160px;
    border-radius: 50%;
    object-fit: cover;

    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    overflow: hidden;

    position: absolute;
    right: 60px;
    top: 435px;
  }

  .barcode {
    width: 105px;
    height: 105px;
    object-fit: cover;

    position: absolute;
    right: 50px;
    top: 43%;
  }

  .card footer {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 24px;
    
    height: 92.5px;
    color: #fff;
    background: var(--blue);
  }
`;

export function backTemplate () {
  return `
    <html>
      <style> ${styles} </style>
  
      <body>
        <div class="card">
          <header>
            <h3>{{name}}</h3>
            <span>{{badge}} place</span>
          </header>

          <main>
            <span>DATE OF BIRTH</span>
            <h4>{{birth}}</h4>

            <span>PERSONAL NUMBER</span>
            <h4>{{personal}}</h4>

            <span>CARD NUMBER</span>
            <h4>{{card}}</h4>

            <span>DATE OF REGISTRATION</span>
            <h4>{{register}}</h4>

            <img class="barcode" src={{barcode}} alt="Barcode" />
          </main>
        
          <footer>card template</footer>
        </div>
      </body>
    </html>
  `
};

export function frontTemplate(){
  return `
    <html>
      <style> ${styles} </style>

      <body>
        <div class="card">
          <header>
            <h3>{{name}}</h3>
            <span>{{badge}} place</span>
          </header>

          <main>
            <img class="badge" src={{badgeImage}} alt="{{badge}} place" />
            <img class="avatar" src={{avatar}} alt={{name}} />
          </main>

          <footer>card template</footer>
        </div>
      </body>
    </html>
  `
};
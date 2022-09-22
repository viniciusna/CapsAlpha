import { createGlobalStyle } from "styled-components";

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
</style>;

export const GlobalStyle = createGlobalStyle`
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  display:;
    }
.divv{
      display:flex;
      justify-content:center;
      align-items:center;
      height:fit-content;
      width:100%;

    }
.div{
  display:flex;
  gap:2rem;
}
.invisible{
  display: none;
}
.visible_flex{
  display: flex;
}
.hometrace{
  height:8vh;
  display:flex;
  align-items:center;
  border-top:1px solid grey;
  width:75%;
}

.h1-home{
  font-family: 'Roboto Mono', monospace;
  font-size:3em;
  // border:1px solid red;
  width:75%;

}
.h3-home{
  all:unset;
  font-family: 'Roboto', sans-serif;
  font-size:1em;
  color:grey;
  width:75%;
}
.h2-home{
  text-align:center;
  // border:1px solid red;
  width:45%;
}

.p-home{
  text-align:center;
  // border:1px solid red;
  width:60%;
}
.text{
  // border:1px solid red;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap:1rem;
}

a{
  all:unset;
  font-weight:bold;
  cursor:pointer;
  padding-left:0.2rem;
}

.prototype-title{
  display:flex;
  justify-content:center;
  align-items:center;
  height:12vh;
}

.home-display{
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  height:fit-content;
  width:fit-content;
  // border: solid 1px red;
}
`;
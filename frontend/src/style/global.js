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
      height:92vh;
      width:100%;
    }
.div{
  display:flex;
  gap:2rem;
}
.hometrace{
  height:8vh;
  display:flex;
  align-items:center;
  border-top:1px solid grey;
  width:75%;
}

h1{
  font-family: 'Roboto Mono', monospace;
  font-size:3em;
  // border:1px solid red;
  width:75%;

}
h3{
  all:unset;
  font-family: 'Roboto', sans-serif;
  font-size:1em;
  color:grey;
  width:75%;
}
h2{
  text-align:center;
  // border:1px solid red;
  width:45%;
}

p{
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
  color:blue;
  cursor:pointer;
}

`;
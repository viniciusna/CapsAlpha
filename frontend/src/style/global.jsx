import { createGlobalStyle } from 'styled-components';

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
	@import
	url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
</style>;

export const GlobalStyle = createGlobalStyle`
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;

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
}

.prototype-title{
  display:flex;
  justify-content:center;
  align-items:center;
  height:12vh;
}

.hometrace{
  flex-direction: row;    
  column-gap: 5px;
}

#snackbar {
  visibility: hidden;
  min-width: 500px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  bottom: 30px;
  font-size: 17px;
}
#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;} 
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;} 
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

button{
  all:unset;
  cursor:pointer;
  &:hover {
        color:red;  
  
      }

}

.showcase{
  display: flex;
  justify-content: center;
  align-items: center;
  height:20vh;
  width:45vw;
  gap:2em;
  // border:red solid 1px;
}

.logo-v{
  cursor:pointer;
}
`;


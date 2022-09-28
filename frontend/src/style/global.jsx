import { createGlobalStyle } from 'styled-components';

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
	@import
	url('https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap');
</style>;

export const GlobalStyle = createGlobalStyle`
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Roboto', sans-serif;
	font-size: 16px;
}

.divv {
	display: flex;
	justify-content: center;
	align-items: center;
	height: fit-content;
	width: 100%;
}

.div {
	display: flex;
	gap: 2rem;
}

.invisible {
	display: none;
}

.visible_flex {
	display: flex;
}

.hometrace {
	height: 8vh;
	display: flex;
	align-items: center;
	border-top: 1px solid grey;
	width: 75%;
}

.h1-home {
	font-family: 'Roboto Mono', monospace;
	font-size: 3rem;
	// border:1px solid red;
	width: 75%;
}

.h3-home {
	all: unset;
	font-family: 'Roboto', sans-serif;
	font-size: 1em;
	color: grey;
	width: 75%;
}

.h2-home {
	text-align: center;
	// border:1px solid red;
	width: 45%;
}

.p-home {
	text-align: center;
	// border:1px solid red;
	width: 60%;
}

.text {
	// border:1px solid red;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
}

a {
	all: unset;
	font-weight: bold;
	cursor: pointer;
}

.prototype-title {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 12vh;
}

.hometrace {
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
	from {
		bottom: 0;
		opacity: 0;
	}
	to {
		bottom: 30px;
		opacity: 1;
	}
}

@keyframes fadein {
	from {
		bottom: 0;
		opacity: 0;
	}
	to {
		bottom: 30px;
		opacity: 1;
	}
}

@-webkit-keyframes fadeout {
	from {
		bottom: 30px;
		opacity: 1;
	}
	to {
		bottom: 0;
		opacity: 0;
	}
}

@keyframes fadeout {
	from {
		bottom: 30px;
		opacity: 1;
	}
	to {
		bottom: 0;
		opacity: 0;
	}
}

button {
	all: unset;
	cursor: pointer;
	&:hover {
		color: red;
	}
}

.showcase {
	padding: 3rem 0;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 20vh;
	width: 45vw;
	gap: 2em;
	// border:red solid 1px;
}

.logo-v {
	cursor: pointer;
}

.scroll-ajust {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 99%;
	// border: 1px solid blue;
	overflow: auto;
	padding-right: 15px;
}

@media (min-aspect-ratio: 16/8) {
	body {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	#root {
		width: 200vh;
		height: 100vh;
	}
}

.ql-toolbar.ql-snow {
	display: flex;
	border: 1px solid #ccc;
	box-sizing: border-box;
	font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	padding: 8px;
	align-content: center;
	align-items: center;
}

@media (min-width: 600px) {
	.container-home {
		width: 100%;
		height: 100%;
		display: flex;
  }
}

@media (max-width: 599px) {
	.container-home {
		width: 100%;
		height: 92vh;
		display: flex;
    flex-direction: column;
    align-items: center;
    
    & > div:first-child {
      width: 100%;
      height: 35%;
      justify-content: space-around;
      row-gap: 1rem;
      & > div {
        justify-content: center;
        & > div{
          width: 100%;
          justify-content: space-around;
          gap: 0;
          & > div {
            width: 50%;
            box-sizing: border-box;
          }
        }
      }
    }

    & > div:last-child {
      width: 100%;
      height: 65%;
      & > div {
        height: 100%;
        & .showcase{
            width: 80%;
            & > div {
              width: 100%;
            }
        }
      }
    }
  }
}

`;

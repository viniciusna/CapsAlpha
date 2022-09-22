import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/index.jsx';
import { GlobalStyle } from './style/global';
import { Provider } from './context/Context.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<GlobalStyle />
		<BrowserRouter>
			<Provider>
				<Router />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);

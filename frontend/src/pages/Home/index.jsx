import axios from 'axios';
import { BsTrashFill } from 'react-icons/bs';
import Button from '../../components/Button/Button.jsx';
import ButtonNewDocument from '../../components/Button/ButtonNewDocument.jsx';
import CardDocuments from '../../components/CardDocuments/CardDocuments.jsx';
import { Context } from '../../context/Context.jsx';
import HalfPage from '../../components/HalfPage/HalfPage.jsx';
import Header from '../../components/Header/Header.jsx';
import HeadersButtons from '../../components/HeadersButtons/headerButton';
import InputDocumentCode from '../../components/InputDocumentCode/InputDocumentCode.jsx';
import Note from '../../assets/images/notes.svg';
import PerfilModal from '../../components/PerfilModal/index';
import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as S from '../../components/InputDocumentCode/style';

function Home() {
	const [value, setValue] = useState('');
	const [hover, setHover] = useState(false);
	const [registerHover, setRegisterHover] = useState(false);
	const [documentLoaded, setDocumentLoaded] = useState(false);
	const [deletedDocumentId, setDeletedDocumentId] = useState('');
	const {
		user,
		documents,
		setDocuments,
		snackbarMessage,
		setSnackbarMessage,
		showSnackbar,
	} = useContext(Context);
	const location = useLocation();
	const navigate = useNavigate();

	function handleChange(event) {
		const value = event.target.value;
		setValue(value);
	}

	useEffect(() => {
		if (!location?.state?.error) return;
		setSnackbarMessage(location.state.error);
		showSnackbar();
		return () => {};
	}, []);

	useEffect(() => {
		if (!user || documentLoaded) return;

		fetch('https://capsalpha.live:3001/document/my', {
			method: 'GET',
			credentials: 'include',

			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (res.message !== 'Success') {
					setError(res.message);
					return null;
				}
				setDocuments(res.data.documents);
			})
			.catch((err) => console.log(err));
		setDocumentLoaded(true);
	}, [user]);
	function handleClickLinkDocument() {
		navigate(`/Editor/${value}`);
	}

	function handleClickCreateDocument(event) {
		fetch('https://capsalpha.live:3001/document/', {
			method: 'POST',
			credentials: 'include',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (res.message !== 'Success') {
					setError(res.message);
					return null;
				}
				navigate('/Editor/' + res.data.documentId);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		if (!deletedDocumentId) return;

		axios
			.delete('https://capsalpha.live:3001/document/' + deletedDocumentId, {
				withCredentials: true,
			})
			.then(function (response) {
				console.log(response);
				if (response.data.message === 'Success') {
					setDocuments(documents.filter((doc) => doc.id != deletedDocumentId));
					setSnackbarMessage('Documento deletado com sucesso.');
					showSnackbar();
				} else {
					setSnackbarMessage('Erro ao deletar documento.');
					showSnackbar();
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}, [deletedDocumentId]);

	return (
		<>
			<Header onClick={() => navigate('/')}>
				<HeadersButtons gap="2em">
					{user ? (
						<PerfilModal />
					) : (
						<>
							<Button
								onClick={() => navigate('/Login')}
								onMouseOver={() => setHover(true)}
								onMouseOut={() => setHover(false)}
								colorbg={hover ? 'black' : 'white'}
								colorfnt={hover ? 'white' : 'black'}
								value="Entrar"
								height="5vh"
								width="9vw"
							/>
							<Button
								onClick={() => navigate('/Register')}
								onMouseOver={() => setRegisterHover(true)}
								onMouseOut={() => setRegisterHover(false)}
								colorbg={registerHover ? 'white' : 'black'}
								colorfnt={registerHover ? 'black' : 'white'}
								value="Criar conta"
								height="5vh"
								width="9vw"
							/>
						</>
					)}
				</HeadersButtons>
			</Header>
			<div className="divv">
				<HalfPage gap="3em" height="84vh" justifyContent="center">
					<h1 className="h1-home">Documentos Simultâneos</h1>
					<h3 className="h3-home">Faça aqui seu Mardown</h3>
					<S.button>
						{user ? (
							<div>
								<ButtonNewDocument handleClick={handleClickCreateDocument} />
								<InputDocumentCode handleChange={handleChange} />
							</div>
						) : (
							[]
						)}
						{value ? (
							<S.search onClick={handleClickLinkDocument}>Entrar</S.search>
						) : (
							''
						)}
					</S.button>
					{user ? (
						[]
					) : (
						<S.div className="hometrace">
							Não tem uma conta?
							<a onClick={() => navigate('/Register')}>Comece agora</a>
						</S.div>
					)}
				</HalfPage>

				<HalfPage gap="1.5em" height="84vh" paddingTop="2em">
					<div className='scroll-ajust'>
						{documents ? (
							documents.map((document, index) => {
								if (index > 15) return;
								return (
									<div key={'container_' + document.id} className="showcase">
										<CardDocuments
											title={document.title}
											key={document.id}
											updatedAt={document.updated_at}
											owner={document.owner}
											handleClick={() => navigate(`/Editor/${document.id}`)}
										/>
										<button
											key={'document_' + document.id}
											onClick={async () => setDeletedDocumentId(document.id)}
										>
											<BsTrashFill key={'icon_' + document.id} size={20} />
										</button>
									</div>
								);
							})
						) : (
							<>
								<img src={Note} alt="" srcSet="" />
								<div className="text">
									<h2 className="h2-home">Criar um link para compartilhar</h2>
									<p className="p-home">
										Clique em Novo documento se quiser criar um link para enviar
										aos convidados
									</p>
								</div>
							</>
						)}
					</div>
				</HalfPage>
				<div id="snackbar">{snackbarMessage}</div>
			</div>
		</>
	);
}
export default Home;

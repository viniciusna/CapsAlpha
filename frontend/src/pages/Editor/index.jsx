import axios from 'axios';
import Button from '../../components/Button/Button.jsx';
import { Context } from '../../context/Context.jsx';
import { Converter } from 'showdown';
import { CustomToolbar } from '../../components/CustomToolbar/customToolbar';
import DocTitle from '../../components/DocTitle/DocTitle.jsx';
import dompurify from 'dompurify';
import HalfPage from '../../components/HalfPage/HalfPage';
import Header from '../../components/Header/Header.jsx';
import HeadersButtons from '../../components/HeadersButtons/headerButton';
import Quill from 'quill';
import showdownHighlight from 'showdown-highlight';
import { useParams } from 'react-router-dom';
import PerfilModal from '../../components/PerfilModal/index.jsx';
import { modules } from '../../components/CustomToolbar/customToolbar';
import { useCallback, useContext, useEffect, useState, useRef } from 'react';
import UserIdentifier from '../../components/UserIdentifier/UserIdentifier.jsx';
import 'github-markdown-css/github-markdown-light.css';
import 'highlight.js/styles/github.css';
import 'quill/dist/quill.snow.css';

const converter = new Converter({
	extensions: [
		showdownHighlight({
			pre: true,
			auto_detection: true,
		}),
	],
	underline: true,
	openLinksInNewWindow: true,
	simplifiedAutoLink: true,
	tasklists: true,
});
converter.setFlavor('github');

function Editor() {
	const {
		navigate,
		user,
		setUser,
		setDocuments,
		addUser,
		usersColors,
		documents,
		snackbarMessage,
		setSnackbarMessage,
		showSnackbar,
	} = useContext(Context);

	const [users, setUsers] = useState([]);
	const [socket, setSocket] = useState();
	const [quill, setQuill] = useState();
	const [quillCursors, setQuillCursors] = useState();
	const [connectRoom, setConnectRoom] = useState(false);
	const [title, setTitle] = useState('');
	const { documentId } = useParams();
	const logo = '/src/images/logo.svg';
	const cursorColors = ['#6290c3', '#92BCCF', '#1A1B41', '#2F3052'];
	const [textBox, setTextBox] = useState();
	const textPreviewRef = useRef();
	// Inicia o socket
	useEffect(() => {
		if (!user) return;
		const s = new WebSocket('wss://www.capsalpha.live:3001');
		setSocket(s);

		s.onopen = () => {
			if (connectRoom) return;
			s.send(
				JSON.stringify({
					type: 'join',
					params: {
						userId: user.id,
						documentId: documentId,
					},
				})
			);
		};

		fetch('https://www.capsalpha.live:3001/document/my', {
			method: 'GET',
			credentials: 'include',

			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.message !== 'Success') {
					return null;
				}

				if (!res.data.documents) {
					return getTitle();
				}

				setDocuments(res.data.documents);
				const thisDoc = res.data.documents.filter(
					(doc) => doc.id == documentId
				);

				if (thisDoc[0]?.title) {
					document.getElementById('title').value = thisDoc[0].title;
					setTitle(document.getElementById('title').value);
				} else {
					getTitle();
				}
			})
			.catch((err) => {
				console.log(err);
			});

		return () => {
			s.close();
		};
	}, [user]);

	useEffect(() => {
		if (socket == null || quill == null) return;

		const handlerDelta = (delta) => {
			quill.updateContents(delta);
			setTextBox(quill.getText());
		};

		const handlerJoin = (data) => {
			setConnectRoom(true);
			fetch(`https://www.capsalpha.live:3001/document/${documentId}`, {
				method: 'GET',
				credentials: 'include',
				headers: new Headers({
					'Content-Type': 'application/json',
				}),
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.message !== 'Success') {
						return null;
					}
					quill.setText(res.data.document.content);
					setTextBox(quill.getText());
				})
				.catch((err) => console.log(err));
		};

		const handlerCursor = (cursor, userId, name) => {
			const cursors = quillCursors.cursors();

			const cursorExist =
				cursors.filter((cursor) => cursor.id == userId).length > 0;

			if (cursorExist) {
				quillCursors.moveCursor(userId, cursor);
			} else {
				quillCursors.createCursor(userId, name, cursorColors[cursors.length]);
				if (users.filter((u) => u.id == userId).length == 0) {
					setUsers((users) => [
						...users,
						{
							name: name,
							id: userId,
							color: cursorColors[cursors.length],
						},
					]);
				}
			}
		};

		function handlerLeave() {
			setConnectRoom(false);
		}

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			const type = data.type;

			if (type == 'message') {
				handlerDelta(data.params.data);
			} else if (type == 'cursor') {
				const { cursor, userId, name } = data.params.data;
				handlerCursor(cursor, userId, name);
			} else if (type == 'title') {
				setTitle(data.params.data);
			} else if (type == 'join') {
				if (data.status != 'Success') {
					navigate('/Home', { state: { error: data.message } });
				}
				handlerJoin(data);
			} else if (type == 'leave') {
				handlerLeave(data);
				quillCursors.removeCursor(`${data.userIdExiting}`);
				setUsers(users.filter((user) => user.id == data.userIdExiting));
			} else {
				console.log('type não existe');
			}
		};

		return () => {
			socket.close();
		};
	}, [socket]);

	useEffect(() => {
		if (socket == null || quill == null) return;

		const handler = (delta, oldDelta, source) => {
			if (source !== 'user') return;

			setTextBox(quill.getText());
			socket.send(JSON.stringify({ type: 'message', params: { data: delta } }));
		};

		quill.on('text-change', handler);

		return () => {
			quill.off('text-change', handler);
		};
	}, [socket, quill]);

	useEffect(() => {
		if (socket == null || quill == null) return;

		const cursorHandler = function (range, oldRange, source) {
			if (range) {
				socket.send(
					JSON.stringify({
						type: 'cursor',
						params: {
							data: { cursor: range, userId: `${user.id}`, name: user.name },
						},
					})
				);
			}
		};

		quill.on('selection-change', cursorHandler);

		return () => {
			quill.off('selection-change', cursorHandler);
		};
	}, [socket, quill]);

	const wrapperRef = useCallback((wrapper) => {
		if (wrapper == null) return;

		wrapper.innerHTML = '';
		const editor = document.createElement('div');
		wrapper.append(editor);

		const q = new Quill(editor, {
			modules: modules,
			formats: [],
			theme: 'snow',
		});

		const qc = q.getModule('cursors');
		setQuill(q);
		setQuillCursors(qc);
	}, []);

	function leaveDocument() {
		socket.send(
			JSON.stringify({ type: 'leave', params: { room: documentId } })
		);
	}

	function saveDocument() {
		socket.send(JSON.stringify({ type: 'save', params: { room: documentId } }));
	}

	function downloadDocument() {
		download(
			`${title}.md`,
			document.getElementsByClassName('ql-editor')[0].innerText
		);
	}

	function shareDocument() {
		let url = window.location.href;
		navigator.clipboard.writeText(url.slice(-36));
		console.log('Compartilhar', url.slice(-36));
		let message = 'Código do documento copiado para clipboard';
		setSnackbarMessage(message);
		showSnackbar();
	}

	function download(filename, text) {
		var element = document.createElement('a');
		element.setAttribute(
			'href',
			'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
		);
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	function updateTitle() {
		axios
			.post(
				'https://www.capsalpha.live:3001/document/title',
				{
					documentId: documentId,
					title: title,
				},
				{ withCredentials: true }
			)
			.then(function (response) {
				return;
			})
			.catch(function (error) {
				console.log(error);
			});

		socket.send(JSON.stringify({ type: 'title', params: { data: title } }));
	}

	function render() {
		if (textBox == null) return { __html: '' };
		return {
			__html: dompurify.sanitize(converter.makeHtml(textBox)),
		};
	}

	function getTitle() {
		fetch(`https://www.capsalpha.live:3001/document/get-title/${documentId}`, {
			method: 'GET',
			credentials: 'include',

			headers: new Headers({
				'Content-Type': 'application/json',
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.message !== 'Success') {
					return null;
				}
				document.getElementById('title').value = res.data.title;
				setTitle(document.getElementById('title').value);
			})
			.catch((err) => console.log(err));
	}

	return (
		<>
			<Header
				onClick={() => {
					leaveDocument();
					navigate('/Home');
				}}
			>
				<HeadersButtons gap="2rem">
					<DocTitle
						id="title"
						value={title}
						onInput={(event) => setTitle(event.target.value)}
						onBlur={() => updateTitle()}
					/>
					<HeadersButtons gap="0.2rem">
						{users.map((user, i) => (
							<UserIdentifier key={i} colorbg={user.color} colorfnt={'white'}>
								{user.name.toString().charAt(0)}
							</UserIdentifier>
						))}
					</HeadersButtons>
				</HeadersButtons>
				<PerfilModal />
			</Header>
			<CustomToolbar
				handleSave={saveDocument}
				handleDownload={downloadDocument}
				handleShare={shareDocument}
			/>
			<div className="divv">
				<HalfPage gap="0em" height="86vh">
					<div
						id="textBox"
						ref={wrapperRef}
						style={{ height: '100%', width: '100%' }}
					></div>
				</HalfPage>
				<HalfPage gap="0em" height="86vh">
					<div
						id="textPreview"
						className="markdown-body"
						ref={textPreviewRef}
						style={{
							height: '100%',
							width: '100%',
							border: '1px solid black',
							padding: '25px',
							overflowY: 'scroll',
						}}
						dangerouslySetInnerHTML={render()}
					></div>
				</HalfPage>
				<div id="snackbar">{snackbarMessage}</div>
			</div>
		</>
	);
}

export default Editor;

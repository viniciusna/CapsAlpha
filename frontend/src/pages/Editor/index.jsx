import { Context } from '../../context/Context.jsx';
import HalfPage from '../../components/HalfPage/HalfPage';
import Header from '../../components/Header/Header.jsx';
import UserIdentifier from '../../components/UserIdentifier/UserIdentifier.jsx';
import HeadersButtons from '../../components/HeadersButtons/headerButton';
import { CgProfile } from 'react-icons/cg';
import Button from '../../components/Button/Button.jsx';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import dompurify from 'dompurify';
import { marked, use } from 'marked';
import { useParams } from 'react-router-dom';

function Editor() {
	const { navigate, user, setUser, users, setUsers, addUser, usersColors } =
		useContext(Context);
	const [socket, setSocket] = useState();
	const [quill, setQuill] = useState();
	const [connect, setConnect] = useState(false);
	const { documentId } = useParams();
	const logo = '/src/images/logo.svg';

	const [textBox, setTextBox] = useState();
	const textPreviewRef = useRef();

	// Inicia o socket
	useEffect(() => {
		const s = new WebSocket('ws://localhost:3001');
		setSocket(s);

		s.onopen = () => {
			setConnect(true);
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

		// return () => {
		//   s.close()
		// }
	}, []);

	// message socket Quill

	useEffect(() => {
		if (socket == null || quill == null) return;

		const handler = (delta) => {
			quill.updateContents(delta);
			console.log(textBox);
		};

		socket.onmessage = (event) => {
			console.log('Recebeu');
			console.log(event.data);
			const data = JSON.parse(event.data);
			console.log(event);
			if (data.type == 'message') handler(data.params.data);
		};

		return () => {
			socket.close();
		};
	}, [socket, quill]);

	// onchange Quill

	useEffect(() => {
		if (socket == null || quill == null) return;

		const handler = (delta, oldDelta, source) => {
			if (source !== 'user') return;
			console.log(delta);
			socket.send(
				JSON.stringify({
					type: 'message',
					params: { data: delta, room: documentId },
				})
			);

			setTextBox(quill.getText());
		};

		quill.on('text-change', handler);

		return () => {
			quill.off('text-change', handler);
		};
	}, [socket, quill]);

	// Start QUill

	const wrapperRef = useCallback((wrapper) => {
		if (wrapper == null) return;

		wrapper.innerHTML = '';
		const editor = document.createElement('div');
		wrapper.append(editor);
		const q = new Quill(editor, {
			modules: {
				toolbar: false,
				syntax: false,
			},
			formats: [],
			theme: 'bubble',
		});
		// q.disable()
		// q.setText("Loading...")
		setQuill(q);
	}, []);

	function abacate() {
		if (textBox == null) return { __html: '' };
		return {
			__html: dompurify.sanitize(marked.parse(textBox)),
		};
	}

	return (
		<>
			<Header onClick={() => navigate('/Home')}>
				<HeadersButtons gap="2rem">
					<HeadersButtons gap="0.2rem">
						{users.map((user, i) => (
							<UserIdentifier
								key={i}
								colorbg={usersColors[i][0]}
								colorfnt={usersColors[i][1]}
							>
								{user.toString().charAt(0)}
							</UserIdentifier>
						))}
					</HeadersButtons>
					<CgProfile size={38} />
				</HeadersButtons>
			</Header>
			<div className="divv">
				<HalfPage gap="0em" height="92vh">
					<div
						id="textBox"
						ref={wrapperRef}
						style={{ height: '100%', width: '100%', border: '1px solid black' }}
					></div>
				</HalfPage>
				<HalfPage gap="0em" height="92vh">
					<div
						id="textPreview"
						ref={textPreviewRef}
						style={{
							height: '100%',
							width: '100%',
							border: '1px solid black',
							padding: '25px',
							'overflow-y': 'scroll',
						}}
						dangerouslySetInnerHTML={abacate()}
					></div>
				</HalfPage>
			</div>
		</>
	);
}

export default Editor;

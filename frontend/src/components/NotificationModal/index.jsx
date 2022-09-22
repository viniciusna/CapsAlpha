import * as S from './style';
import createContainer from './CreateContainer';

export default function NotificationModal({ color = Color.info, children }) {
	return createPortal(
		<S.Notification>
			{children}
			<S.CloseButton>
				<Times height={16} />
			</S.CloseButton>
		</S.Notification>,
		container
	);
}

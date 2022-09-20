import Quill from 'quill';
import QuillCursors from 'quill-cursors';

const CustomHeart = () => {
	return <span>♥</span>;
};
const CustomH1 = () => {
	return <span><strong>H1</strong></span>;
};
const CustomH2 = () => {
	return <span><strong>H2</strong></span>;
};
function insertHeart() {
	const cursorPosition = this.quill.getSelection().index;
	this.quill.insertText(cursorPosition, '♥');
	this.quill.setSelection(cursorPosition + 1);
}

function insertH1() {
	const cursorPosition = this.quill.getSelection().index;
	this.quill.insertText(cursorPosition, '# ');
	this.quill.setSelection(cursorPosition + 2);
}

function insertH2() {
	const cursorPosition = this.quill.getSelection().index;
	this.quill.insertText(cursorPosition, '## ');
	this.quill.setSelection(cursorPosition + 3);
}

/*
 * Custom toolbar component including the custom heart button and dropdowns
 */
const CustomToolbar = () => (
	<div id="toolbar">
		<button className="ql-clean" />
		<button
		 className="ql-insertHeart">
			<CustomHeart />
		</button>
		<button className="ql-insertH1">
			<CustomH1 />
		</button>
		<button className="ql-insertH2">
			<CustomH2 />
		</button>
	</div>
);

// Add sizes to whitelist and register them
const Size = Quill.import('formats/size');
Size.whitelist = ['extra-small', 'small', 'medium', 'large'];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font');
Font.whitelist = [];
Quill.register(Font, true);
Quill.register('modules/cursors', QuillCursors);
/*
 * Editor component with custom toolbar and content containers
 */
const modules = {
	cursors: true,
	toolbar: {
		container: '#toolbar',
		handlers: {
			insertHeart: insertHeart,
			insertH1: insertH1,
			insertH2: insertH2
		},
	},
};

export {
	modules,
	CustomToolbar
}

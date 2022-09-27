import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import * as S from './style';
import {
	AiTwotoneSave,
	AiOutlineBold,
	AiOutlineItalic,
	AiOutlineStrikethrough,
	AiOutlineUnorderedList,
	AiOutlineOrderedList,
	AiOutlineDownload,
	AiOutlineShareAlt,
} from 'react-icons/ai';
import { MdChecklist } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';
import { React, useState } from 'react';

const CustomH1 = () => {
	return (
		<span>
			<strong>H1</strong>
		</span>
	);
};
const CustomH2 = () => {
	return (
		<span>
			<strong>H2</strong>
		</span>
	);
	p;
};
const CustomH3 = () => {
	return (
		<span>
			<strong>H3</strong>
		</span>
	);
	p;
};
const CustomBold = ({ color }) => {
	return <AiOutlineBold color={color} size={25} />;
};
const CustomItalic = ({ color }) => {
	return <AiOutlineItalic color={color} size={25} />;
};
const CustomStrikethrough = ({ color }) => {
	return <AiOutlineStrikethrough color={color} size={25} />;
};
const CustomUnorderedList = ({ color }) => {
	return <AiOutlineUnorderedList color={color} size={25} />;
};
const CustomOrderedList = ({ color }) => {
	return <AiOutlineOrderedList color={color} size={25} />;
};
const CustomCheckList = ({ color }) => {
	return <MdChecklist color={color} size={25} />;
};

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

function insertH3() {
	const cursorPosition = this.quill.getSelection().index;
	this.quill.insertText(cursorPosition, '### ');
	this.quill.setSelection(cursorPosition + 4);
}

function insertBold() {
	const cursorPosition = this.quill.getSelection().index;
	this.quill.insertText(cursorPosition, '****');
	this.quill.setSelection(cursorPosition + 2);
}

function insertItalic() {
	const cursorPosition = this.quill.getSelection().index;
	this.quill.insertText(cursorPosition, '**');
	this.quill.setSelection(cursorPosition + 1);
}

function insertStrikethrough() {
	const cursorPosition = this.quill.getSelection().index;
	this.quill.insertText(cursorPosition, '~~~~');
	this.quill.setSelection(cursorPosition + 2);
}
function insertUnorderedList() {
	const cursorPosition = this.quill.getSelection().index;
	this.quill.insertText(cursorPosition, '- ');
	this.quill.setSelection(cursorPosition + 2);
}

function insertOrderedList() {
	const cursorPosition = this.quill.getSelection().index;
	this.quill.insertText(cursorPosition, '1. ');
	this.quill.setSelection(cursorPosition + 3);
}

function insertCheckList() {
	const cursorPosition = this.quill.getSelection().index;
	this.quill.insertText(cursorPosition, '- [ ] ');
	this.quill.setSelection(cursorPosition + 6);
}

/*
 * Custom toolbar component including the custom heart button and dropdowns
 */

const CustomToolbar = ({ props, handleSave, handleDownload, handleShare }) => (
	<S.Toolbar id="toolbar">
		<S.Elements>
			<Tooltip title="Bold">
				<button className="ql-insertBold">
					<CustomBold color={'#b9b9b9'} />
				</button>
			</Tooltip>
			<Tooltip title="Italic">
				<button className="ql-insertItalic">
					<CustomItalic color={'#b9b9b9'} />
				</button>
			</Tooltip>
			<Tooltip title="Cross Out Text">
				<button className="ql-insertStrikethrough">
					<CustomStrikethrough color={'#b9b9b9'} />
				</button>
			</Tooltip>
			<Tooltip title="First Heading">
				<button className="ql-insertH1">
					<CustomH1 />
				</button>
			</Tooltip>
			<Tooltip title="Second Heading">
				<button className="ql-insertH2">
					<CustomH2 />
				</button>
			</Tooltip>
			<Tooltip title="Third Heading">
				<button className="ql-insertH3">
					<CustomH3 />
				</button>
			</Tooltip>
			<Tooltip title="Unordered List">
				<button className="ql-insertUnorderedList">
					<CustomUnorderedList color={'#b9b9b9'} />
				</button>
			</Tooltip>
			<Tooltip title="Ordered list">
				<button className="ql-insertOrderedList">
					<CustomOrderedList color={'#b9b9b9'} />
				</button>
			</Tooltip>
			<Tooltip title="Check List">
				<button className="ql-insertCheckList">
					<CustomCheckList color={'#b9b9b9'} />
				</button>
			</Tooltip>
			<Tooltip title="Save">
				<button
					onClick={() => {
						alert('Your File has Been Saved!');
					}}
					className="ql-save"
				>
					<AiTwotoneSave onClick={handleSave} color={'#b9b9b9'} size={20} />
				</button>
			</Tooltip>
			<Tooltip title="File Download">
				<button
					onClick={() => {
						alert('Your code has Been saved on clipboard!');
					}}
					className="ql-fileDownload"
				>
					<AiOutlineDownload
						onClick={handleDownload}
						color={'#b9b9b9'}
						size={20}
					/>
				</button>
			</Tooltip>
			<Tooltip title="Share">
				<button
					onClick={() => {
						alert('Your code has Been saved on clipboard!');
					}}
					className="ql-share"
				>
					<AiOutlineShareAlt
						onClick={handleShare}
						color={'#b9b9b9'}
						size={20}
					/>
				</button>
			</Tooltip>
		</S.Elements>
	</S.Toolbar>
);

Quill.register('modules/cursors', QuillCursors);
const modules = {
	cursors: true,
	toolbar: {
		container: '#toolbar',
		handlers: {
			insertH1: insertH1,
			insertH2: insertH2,
			insertH3: insertH3,
			insertBold: insertBold,
			insertItalic: insertItalic,
			insertStrikethrough: insertStrikethrough,
			insertUnorderedList: insertUnorderedList,
			insertOrderedList: insertOrderedList,
			insertCheckList: insertCheckList,
		},
	},
};

export { modules, CustomToolbar };

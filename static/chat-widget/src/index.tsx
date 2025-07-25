import React from 'react';
import ReactDOM from 'react-dom';
import ChatModal from './ChatModal';

const container = document.getElementById('chat-root');
if (container) {
  ReactDOM.render(<ChatModal isOpen={true} onClose={() => {}} />, container);
}

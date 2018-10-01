import * as React from 'react';
import * as ReactDom from 'react-dom';

function onClick(event: React.MouseEvent<HTMLHeadingElement>) {
  alert(event.currentTarget.innerText);
}

ReactDom.render(<>CSS Grid Drag</>, document.getElementById('app'));

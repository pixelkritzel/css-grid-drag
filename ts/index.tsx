import * as React from 'react';
import * as ReactDom from 'react-dom';
const css = require('../scss/style.scss');

function onClick(event: React.MouseEvent<HTMLHeadingElement>) {
  alert(event.currentTarget.innerText);
}

ReactDom.render(
  <h1
    className={[css.borderBottom, css.italicFont, css.nicerHeadlineWithAComplication, css.normal].join(' ')}
    onClick={onClick}
  >
    Hello from React!
  </h1>,
  document.getElementById('app')
);

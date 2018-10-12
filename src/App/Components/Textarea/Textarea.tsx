import * as React from 'react';

import CSS from './Textarea.module.scss';

type ITextAreaProps = {
  bindTextAreaRef: (ref: HTMLTextAreaElement) => void;
  className?: string;
  id?: string;
  placeholder?: string;
  rows?: number;
};

export class Textarea extends React.Component<ITextAreaProps> {
  render() {
    const { bindTextAreaRef, className = '', id = '', placeholder = '', rows } = this.props;
    return (
      <textarea
        ref={bindTextAreaRef}
        className={className + CSS.textarea}
        id={id}
        placeholder={placeholder}
        rows={rows}
      />
    );
  }
}

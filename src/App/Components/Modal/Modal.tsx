import * as React from 'react';
import * as ReactDOM from 'react-dom';

import CloseIcon from '@material-ui/icons/Close';

import { Button } from 'src/App/Components/Button';

import CSS from './Modal.module.scss';

type IModalProps = {
  closeModal?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  modalFooter?: React.ReactNode;
  title?: string;
};

export class Modal extends React.Component<IModalProps> {
  render() {
    const { closeModal, modalFooter, title = '' } = this.props;
    return ReactDOM.createPortal(
      <>
        <div className={CSS.backdrop} />
        <div className={CSS.modalContainer}>
          <div className={CSS.modal}>
            {(closeModal || title) && (
              <div className={CSS.modalHeader}>
                <div className={CSS.modalTitle}>{title}</div>
                {closeModal && (
                  <Button icon onClick={closeModal}>
                    <CloseIcon />
                  </Button>
                )}
              </div>
            )}
            <div className={CSS.modalBody}>{this.props.children}</div>
            {modalFooter && <div className={CSS.modalFooter}>{modalFooter}</div>}
          </div>
        </div>
      </>,
      document.body
    );
  }
}

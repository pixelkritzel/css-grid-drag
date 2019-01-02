import * as React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import AddIcon from '@material-ui/icons/Add';

import { Button } from 'src/App/Components/Button';
import { Modal } from 'src/App/Components/Modal';
import { Textarea } from 'src/App/Components/Textarea';

import { urlExists } from 'src/utils/urlExists';
import { IStore } from 'src/store';

@inject('store')
@observer
export class AddResourceButton extends React.Component<{ store?: IStore }> {
  @observable
  isModalOpen = false;

  textareaRef: HTMLTextAreaElement | null;

  closeModal = () => {
    if (this.textareaRef!.value.trim().length > 0) {
      this.textareaRef!.value.split('\n').forEach(async line => {
        const isUrlAvailable = await urlExists(line);
        if (isUrlAvailable) {
          this.props.store!.data.addRessource(line);
        }
      });
    }
    this.isModalOpen = false;
  };

  renderAddFotosModal = () => (
    <Modal
      closeModal={this.closeModal}
      modalFooter={<Button onClick={this.closeModal}>OK</Button>}
      title="Add photo urls"
    >
      <label htmlFor="add-photo-urls-textarea">Please enter one photo url per line</label>
      <Textarea
        bindTextAreaRef={(ref: HTMLTextAreaElement) => (this.textareaRef = ref)}
        id="add-photo-urls-textarea"
        placeholder="http://placekitten.com/200/300"
        rows={6}
      />
    </Modal>
  );

  render() {
    return (
      <>
        <Button icon onClick={_ => (this.isModalOpen = true)}>
          <AddIcon />
        </Button>
        {this.isModalOpen && this.renderAddFotosModal()}
      </>
    );
  }
}

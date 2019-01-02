import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { ElementForm } from './ElementForm';

import { IStore } from 'src/store/store';

@inject('store')
@observer
export class ElementsList extends React.Component<{ store?: IStore }> {
  render() {
    const { store } = this.props;
    const { shownGrid } = store!;
    return (
      <>
        <h4>Elements</h4>
        {shownGrid.elements.map((element, index) => (
          <ElementForm
            key={`element-form-${element.id}`}
            element={element}
            index={index}
            open={store!.selectedElement === element}
          />
        ))}
      </>
    );
  }
}

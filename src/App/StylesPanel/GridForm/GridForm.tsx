import * as React from 'react';
import { observer, inject } from 'mobx-react';

import { Button } from 'src/App/Components/Button';
import { InputField } from 'src/App/Components/InputField';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { ICssGrid } from 'src/store/cssGridModel';
import { IStore } from 'src/store/store';

import CSS from './GridForm.module.scss';

@inject('store')
@observer
export class GridForm extends React.Component<{ mediaQuery: ICssGrid; store?: IStore }> {
  onValueChange = (name: string, value: string) => {
    const { mediaQuery } = this.props;
    mediaQuery.updateField(name, value);
  };

  render() {
    const { mediaQuery } = this.props;
    return (
      <>
        <form>
          <h4>Grid styles</h4>
          <div>
            Columns:
            <div className={CSS.changeGridColumns}>
              <div>
                <Button icon onClick={() => mediaQuery.changeGridItems('columns', 'decrement', 'start')}>
                  <RemoveIcon />
                </Button>
                <Button icon onClick={() => mediaQuery.changeGridItems('columns', 'increment', 'start')}>
                  <AddIcon />
                </Button>
              </div>
              {mediaQuery.columns.length - 1}
              <div>
                <Button icon onClick={() => mediaQuery.changeGridItems('columns', 'decrement', 'end')}>
                  <RemoveIcon />
                </Button>
                <Button icon onClick={() => mediaQuery.changeGridItems('columns', 'increment', 'end')}>
                  <AddIcon />
                </Button>
              </div>
            </div>
          </div>
          <div>
            Rows:
            <div className={CSS.changeGridRows}>
              <div>
                <Button icon onClick={() => mediaQuery.changeGridItems('rows', 'decrement', 'start')}>
                  <RemoveIcon />
                </Button>
                <Button icon onClick={() => mediaQuery.changeGridItems('rows', 'increment', 'start')}>
                  <AddIcon />
                </Button>
              </div>
              {mediaQuery.rows.length - 1}
              <div>
                <Button icon onClick={() => mediaQuery.changeGridItems('rows', 'decrement', 'end')}>
                  <RemoveIcon />
                </Button>
                <Button icon onClick={() => mediaQuery.changeGridItems('rows', 'increment', 'end')}>
                  <AddIcon />
                </Button>
              </div>
            </div>
          </div>
          <InputField
            inline
            label="Grid Gap"
            name="gridGap"
            value={mediaQuery.gridGap}
            onValueChange={this.onValueChange}
          />
          <InputField
            inline
            label="Cell Width"
            name="cellWidth"
            type="number"
            value={mediaQuery.cellWidth.toString()}
            onValueChange={this.onValueChange}
          />
          <InputField
            inline
            label="Cell Height"
            name="cellHeight"
            type="number"
            value={mediaQuery.cellHeight.toString()}
            onValueChange={this.onValueChange}
          />
        </form>
      </>
    );
  }
}

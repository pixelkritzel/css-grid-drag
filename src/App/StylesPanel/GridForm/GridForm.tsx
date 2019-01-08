import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import ReactAnimateHeight from 'react-animate-height';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { Button } from 'src/App/Components/Button';
import { IncrementDecrement } from 'src/App/Components/IncrementDecrement';
import { InputField } from 'src/App/Components/InputField';

import { IStore } from 'src/store/store';

import CSS from './GridForm.module.scss';

@inject('store')
@observer
export class GridForm extends React.Component<{ store?: IStore }> {
  @observable isExpanded = true;

  get formHeight() {
    return this.isExpanded ? 'auto' : 0;
  }

  toggleGridForm = () => (this.isExpanded = !this.isExpanded);

  onValueChange = (name: string, value: string | number) => {
    const { shownGrid } = this.props.store!;
    const fieldType = typeof shownGrid[name];
    if (fieldType === 'string') {
      shownGrid.updateField(name, value.toString());
    } else if (fieldType === 'number') {
      shownGrid.updateField(name, Number(value));
    }
  };

  render() {
    const { shownGrid } = this.props.store!;
    const { formHeight, isExpanded } = this;
    return (
      <form>
        <Button variant="text" onClick={this.toggleGridForm}>
          <h4 className={CSS.title}>{isExpanded ? <ArrowDropDownIcon /> : <ArrowRightIcon />}Grid styles</h4>
        </Button>
        <ReactAnimateHeight height={formHeight} duration={160}>
          <IncrementDecrement
            name="columns"
            label="Columns"
            initialValue={shownGrid.columns.length - 1}
            minValue={1}
            onIncrement={() => shownGrid.changeGridItems('columns', 'increment')}
            onDecrement={() => shownGrid.changeGridItems('columns', 'decrement')}
          />
          <IncrementDecrement
            name="rows"
            label="Rows"
            initialValue={shownGrid.rows.length - 1}
            minValue={1}
            onIncrement={() => shownGrid.changeGridItems('rows', 'increment')}
            onDecrement={() => shownGrid.changeGridItems('rows', 'decrement')}
          />
          <IncrementDecrement
            name="cellWidth"
            label="Cell Width"
            minValue={1}
            initialValue={shownGrid.cellWidth}
            onValueChange={this.onValueChange}
          />
          <IncrementDecrement
            name="cellHeight"
            label="Cell Height"
            minValue={1}
            initialValue={shownGrid.cellHeight}
            onValueChange={this.onValueChange}
          />
          <InputField label="Grid Gap" name="gridGap" value={shownGrid.gridGap} onValueChange={this.onValueChange} />
          <IncrementDecrement
            label="Start Width"
            name="startWidth"
            initialValue={shownGrid.startWidth}
            onValueChange={this.onValueChange}
          />
        </ReactAnimateHeight>
      </form>
    );
  }
}

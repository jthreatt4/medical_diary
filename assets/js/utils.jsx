import r from 'ramda';
import kefir from 'kefir';
import React, { Component, createElement } from 'react';
const h = createElement;

export function combineObject(active, passive = {}) {
  const keys = r.concat(r.keys(active), r.keys(passive));
  return kefir.combine(r.values(active), r.values(passive))
    .map(r.zipObj(keys));
}

export class KefirComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: null
    };

    this._subscribe = props$ => {
      const handler = values => {
        this.setState({
          values
        })
      };
      props$.onValue(handler);
      this._unsubscribe = () => {
        props$.offValue(handler);
        this._unsubscribe = null;
      };
    };
  }

  componentWillMount() {
    this._subscribe(this.props.props$);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.props$ !== this.props.props$) {
      this._unsubscribe();
      this._subscribe(nextProps.props$);
    }
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    return this.props.render(this.state.values);
  }
}

// function call to make kicking off an app easy
// export const KefirReact = (props$, Component, Loader = Component) => {
//   return props => h(KefirComponent, {
//     props$,
//     render: values => values ? h(Component, {
//       ...props,
//       ...values
//     }) : h(Loader, props)
//   });
// };

export function updateDataOfBlock(editorState, block, newData) {
  const contentState = editorState.getCurrentContent();
  const newBlock = block.merge({
    data: newData
  });
  const newContentState = contentState.merge({
    blockMap: contentState.getBlockMap().set(block.getKey(), newBlock),
  });
  return EditorState.push(editorState, newContentState, 'change-block-type');
}
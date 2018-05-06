import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  EditorState
} from 'draft-js';
import { convertToHTML } from 'draft-convert';
import renderHTML from 'react-render-html';
import * as r from 'ramda';
import moment from 'moment';

import {
  BulletJournalEditor, getBlockRendererFn
} from './components/editor.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import '../sass/main.scss';

let csrftoken = csrfToken();

function csrfToken() {
  return (function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      let cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  })('csrftoken');
}

function csrfSafeMethod(method) {
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}

$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }
  }
});

class Entry {
  constructor(content, type, timestamp = null) {
    this.content = content;
    this.timestamp = timestamp || Date.now();
    this.type = type;
  }

  save(cb) {
    const entry_type = this.type;
    const content = this.content;
    const timestamp = moment(this.timestamp)._d.toISOString();
    $.post('create_entry/', {timestamp, content, entry_type}, cb)
  }

  render() {
    let type = this.type !== 'unstyled' ? `#${this.type}` : '';
    return <div key={this.timestamp} className="entry">
      <span className="timestamp">{moment(this.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</span>
      <div>{this.content}<span className="todo"> {type}</span></div>
    </div>;
  }
}

class MyComponent extends Component {
  constructor(props) {
    super(props);
    const entries = [].map(({content, type, timestamp}) => {
      return new Entry(content, type, timestamp);
    });
    this.state = {
      counter: 1,
      entries
    };

    this.handleReturn = this.handleReturn.bind(this);
    this.past = this.past.bind(this);
    this.future = this.future.bind(this);

    $.get('journal_notes/', resp => {
      let current_entries = this.state.entries;
      let new_entries = resp.map(({content, entry_type, timestamp}) => {
        return new Entry(content, entry_type, moment(timestamp))
      });
      let entries = current_entries.concat(new_entries);
      this.setState({entries});
    });
  }

  handleReturn(e, editorState) {
    // let html = convertToHTML({
    //   blockToHTML: block => {
    //     return <div />;
    //   }
    // })(editorState.getCurrentContent());
    // let result = renderHTML(html);
    // console.log('html', result);
    let blocks = editorState.getCurrentContent().getBlocksAsArray();  // there should only ever be one

    let data = blocks[0].data;
    let type = blocks[0].type;
    let result = new Entry(blocks[0].text, type);
    result.save(() => console.log('saving/saved'));
    let entries = this.state.entries;
    entries.push(result);
    this.setState({entries});
  }

  past(now) {
    let list = r.filter(x => now > x.timestamp, this.state.entries);
    return r.sort((a,b) => b.timestamp - a.timestamp, list)
      .map(x => x.render());

  }

  future(now) {
    let list = r.filter(x => now < x.timestamp, this.state.entries);
    return r.sort((a,b) => b.timestamp - a.timestamp, list)
      .map(x => x.render());
  }

  render() {
    const now = Date.now();
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title={"Health Diary"}/>
          <div className="future">
            {this.future(now)}
          </div>
          <BulletJournalEditor matchers={[
            [matchTodo, handleTodo],
            [generalWeight(/(.*)(weigh-in|Weigh-in)(\s|\S)(\d*)/), handleGeneral(WEIGHT)],
            [generalWeight(/(.*)(weighed|Weighed)(\s|\S)(\d*)/), handleGeneral(WEIGHT)],
            [generalWeight(/(.*)(weight)(\s|\S)(\d*)/), handleGeneral(WEIGHT)],
          ]}
                               blockRendererFn={getBlockRendererFn}
                               handleReturn={this.handleReturn}
          />
          <div className="past">
            {this.past(now)}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

render(
  <MyComponent />,
  document.getElementById("app")
);


const TODO_BLOCK = 'todo';
const EXERCISE = 'exercise';
const DIET = 'diet';
const APPOINTMENT = 'appointment';
const WEIGHT = 'weight';

function matchTodo(str, currentBlock) {
  return str.match(/^\[\]$/);
}
function handleTodo(match_result, editorState, currentBlock) {
  const newType = currentBlock.getType() !== TODO_BLOCK ? TODO_BLOCK : 'unstyled';
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const key = selectionState.getStartKey();
  const blockMap = contentState.getBlockMap();
  const block = blockMap.get(key);
  let newText = '';
  const text = block.getText();
  if (block.getLength() >= 2) {
    newText = text.substr(1);
  }
  const newBlock = block.merge({
    text: newText,
    type: newType,
    data: getDefaultBlockData(newType)
  });
  const newContentState = contentState.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: selectionState.merge({
      anchorOffset: 0,
      focusOffset: 0
    })
  });
  return EditorState.push(editorState, newContentState, 'change-block-type');
}

function generalWeight(regex) {
  return function (str, currentBlock) {
    if (currentBlock.getType() === WEIGHT) return false;
    return str.match(regex);
  }
}


function handleGeneral(type) {
  return function (match_result, editorState, currentBlock) {
    const newType = currentBlock.getType() !== type ? WEIGHT : 'unstyled';
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const key = selectionState.getStartKey();
    const blockMap = contentState.getBlockMap();
    const block = blockMap.get(key);
    let newText = '';
    const text = block.getText();
    newText = text;
    const newBlock = block.merge({
      text: newText,
      type: newType,
      data: getDefaultBlockData(newType)
    });
    const newContentState = contentState.merge({
      blockMap: blockMap.set(key, newBlock),
      // selectionAfter: selectionState.merge({
      //   anchorOffset: 0,
      //   focusOffset: 0
      // })
      selectionAfter: selectionState
    });
    return EditorState.push(editorState, newContentState, 'change-block-type');
  }
}

function getDefaultBlockData(blockType, initialData={}) {
  switch(blockType) {
    case TODO_BLOCK: return {checked:false, tag: 'todo'};
    case EXERCISE: return {tag: 'exercise'};
    case DIET: return {tag: 'diet'};
    case APPOINTMENT: return {tag: 'appointment'};
    case WEIGHT: return {tag: 'weight'};
    default: return initialData;
  }
}

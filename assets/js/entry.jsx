import React, { Component } from 'react';
import { render } from 'react-dom';
import NoteBookListEditor from './components/editor.jsx';

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

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1
    };
  }
  render() {
    return (
      <div>
        <h1>Header!</h1>
        <span>Counter is at: { this.state.counter }</span>
        <NoteBookListEditor/>
      </div>
    );
  }
}

render(
  <MyComponent />,
  document.getElementById("app")
);

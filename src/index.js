import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import MailBox from './containers/MailBox'

new Promise(resolve => {
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', 'messages_sample.json', true);
  xmlhttp.setRequestHeader('Content-Type', 'application/json')
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && (xmlhttp.status == 200 || xmlhttp.status == 304)) {
      resolve(JSON.parse(xmlhttp.responseText));
    }
  };
  xmlhttp.send();

}).then((returnedData) => {
  render(
    <MailBox data={returnedData} />,
    document.getElementById('root')
  )
});



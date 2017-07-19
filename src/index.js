import React from 'react';
import ReactDOM from 'react-dom';
import HighCharts from './HighCharts';
import './index.css';

// Change subreddit to whatever you like:
ReactDOM.render(
  <HighCharts subreddit='soccer' jsondata='reactjs'/>,
  document.getElementById('root')
);

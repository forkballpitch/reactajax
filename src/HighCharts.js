import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts from 'highcharts';
import Drilldown from 'highcharts-drilldown';
import PropTypes from 'prop-types';
import axios from 'axios';

import Footer from './component/Footer'
import Navbar from './component/Navbar'
import FlashCard from './component/FlashCard'

Drilldown(Highcharts);
 
const series1 = { data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4] };
const series2 = { data: [10.9, 20.5, 30.4, 40.2, 50.0, 60.0, 10.6, 30.5, 50.4, 70.1, 100.6, 50.4] };

 
// Create the chart
const config = {
    chart: {
        type: 'column'
		
    },
    title: {
        text: 'Browser market shares. January, 2015 to May, 2015'
    },
    subtitle: {
        text: 'Click the columns to view versions. Source: <a href="http://netmarketshare.com">netmarketshare.com</a>.'
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Total percent market share'
        }
 
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
            }
        }
    },
 
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
	

 
   series: [series1, series2],
    drilldown: {
		animation: false,
        series: [{
            name: 'Microsoft Internet Explorer',
            id: 'Microsoft Internet Explorer',
            data: [
                [
                    'v11.0',
                    24.13
                ],
                [
                    'v8.0',
                    17.2
                ],
                [
                    'v9.0',
                    8.11
                ],
                [
                    'v10.0',
                    5.33
                ],
                [
                    'v6.0',
                    1.06
                ],
                [
                    'v7.0',
                    0.5
                ]
            ]
        }, {
            name: 'Chrome',
            id: 'Chrome',
            data: [
                [
                    'v40.0',
                    5
                ],
                [
                    'v41.0',
                    4.32
                ],
                [
                    'v42.0',
                    3.68
                ],
                [
                    'v39.0',
                    2.96
                ],
                [
                    'v36.0',
                    2.53
                ],
                [
                    'v43.0',
                    1.45
                ],
                [
                    'v31.0',
                    1.24
                ],
                [
                    'v35.0',
                    0.85
                ],
                [
                    'v38.0',
                    0.6
                ],
                [
                    'v32.0',
                    0.55
                ],
                [
                    'v37.0',
                    0.38
                ],
                [
                    'v33.0',
                    0.19
                ],
                [
                    'v34.0',
                    0.14
                ],
                [
                    'v30.0',
                    0.14
                ]
            ]
        }, {
            name: 'Firefox',
            id: 'Firefox',
            data: [
                [
                    'v35',
                    2.76
                ],
                [
                    'v36',
                    2.32
                ],
                [
                    'v37',
                    2.31
                ],
                [
                    'v34',
                    1.27
                ],
                [
                    'v38',
                    1.02
                ],
                [
                    'v31',
                    0.33
                ],
                [
                    'v33',
                    0.22
                ],
                [
                    'v32',
                    0.15
                ]
            ]
        }, {
            name: 'Safari',
            id: 'Safari',
            data: [
                [
                    'v8.0',
                    2.56
                ],
                [
                    'v7.1',
                    0.77
                ],
                [
                    'v5.1',
                    0.42
                ],
                [
                    'v5.0',
                    0.3
                ],
                [
                    'v6.1',
                    0.29
                ],
                [
                    'v7.0',
                    0.26
                ],
                [
                    'v6.2',
                    0.17
                ]
            ]
        }, {
            name: 'Opera',
            id: 'Opera',
            data: [
                [
                    'v12.x',
                    0.34
                ],
                [
                    'v28',
                    0.24
                ],
                [
                    'v27',
                    0.17
                ],
                [
                    'v29',
                    0.16
                ]
            ]
        }]
    }
};


 
class HighCharts extends Component {
	
	
  static propTypes = {
    subreddit: PropTypes.string.isRequired
	
  }	
	
   // Set up the default state with a property intitializer
  // instead of writing a whole constructor just for this
  // You can reference 'this.props' here if you need to.
  state = {
    posts: [],
    loading: true,
    error: null
  }
  
   componentDidMount() {
	   
	   
    axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
      .then(res => {
        // Transform the raw data by extracting the nested posts
        const posts = res.data.data.children.map(obj => obj.data);

        // Update state to trigger a re-render.
        // Clear any errors, and turn off the loading indiciator.
        this.setState({
          posts,
          loading: false,
          error: null
        });
      })
      .catch(err => {
        // Something went wrong. Save the error in state and re-render.
        this.setState({
          loading: false,
          error: err
        });
      });
  }
  
    renderLoading() {
    return <div>Loading...</div>;
  }

  
    renderPosts() {
    // Using destructuring to extract the 'error' and 'posts'
    // keys from state. This saves having to write "this.state.X" everwhere.
    const { error, posts } = this.state;

    if(error) {
      return this.renderError();
    }

    return (
      <ul>
        {posts.map(post =>
          <li key={post.id}>
            <span className="score">{post.score}</span>
            {post.title}
          </li>
        )}
      </ul>
    );
  }

	
    render() {
		
	     const { subreddit } = this.props;
         const { loading } = this.state;
		
		 return (
		 /*
			  <div>
				<h1>{`/r/${this.props.subreddit}`}</h1>
				<ul>
				  {this.state.posts.map(post =>
					<li key={post.id}>{post.title}</li>
				  )}
				</ul>
			  </div>*/
			  
			  <div>
					<div>
						  <Navbar/>
						  <FlashCard jsondata='reactjs'/>
						  <Footer/>
						</div>
				<h1>{`/r/${subreddit}`}</h1>
				    {loading ? this.renderLoading() : this.renderPosts()}
				    <ReactHighcharts config={config}></ReactHighcharts>					   
			  </div>
			  
			
			);
		  }
		/*
        return (
            <div>
                <ReactHighcharts config={config}></ReactHighcharts>
            </div>
        );*/
    }

 
export default HighCharts;


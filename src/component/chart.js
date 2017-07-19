import React from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

class FlashCard extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            value :"",
            flashcards: [],
			postdata: [],
			posts: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
		this.getdata = this.getdata.bind(this);
		this.deletedata = this.deletedata.bind(this);
    }

	
	static propTypes = {
	 jsondata: PropTypes.string.isRequired
    }	
	

    handleChange(event) {
        console.log(event.target.value + 'dglkndflkgnlfk');
        this.setState({value: event.target.value});

    }
	


    handleSubmit(event) {
    	    	
        event.preventDefault();
        var arr = this.state.flashcards;
        arr.push(this.state.value);
        this.setState({flashcards : arr})
        console.log(this.state.flashcards + 'dglkndflkgnlfk');
		


    }
	
	//버튼에 맵핑된 함수임
	getdata(event){
		     axios.get(`http://www.reddit.com/r/${this.props.jsondata}.json`)
		  .then(res => {
			// Transform the raw data by extracting the nested posts
			const postdata = res.data.data.children.map(obj => obj.data);

			// Update state to trigger a re-render.
			// Clear any errors, and turn off the loading indiciator.
			this.setState({
			  postdata,
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
	
	deletedata(event){
		this.setState({postdata:[]});
	}


	componentDidMount() {
		 	//컴포넌트를 생성 할 때는 constructor -> componentWillMount -> render -> componentDidMount 순으로 진행됩니다.	
			//처음로딩될 때 실행할 데이터 setstate로 값을 넣어도 됨

    }
	
   renderPosts() {
    // Using destructuring to extract the 'error' and 'posts'
    // keys from state. This saves having to write "this.state.X" everwhere.
    const { error, postdata } = this.state;

    if(error) {
      return this.renderError();
    }

    return (
      <ul>
        {postdata.map(post =>
          <li key={post.id}>
            <span className="score">{post.score}</span>
            {post.title}
          </li>
        )}
      </ul>
    );
  }



	
    showFlashCards(){
        var namesList = this.state.flashcards.map(function(name){
                return <li className="list-group-item">{name}</li>;
                })

        return  <ul className="list-group">{ namesList }</ul>
    }
    
    
    
    
    onSubmit(){
		let userInfo={
			'user_id': '123',
			'user_pw': '123'
		};

		fetch('/login',{
			method: 'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userInfo)
	    }).then((response)=> response.json())
	    .then((responseData)=>{
	    	if(responseData.loginresult){
	    		this.props.onSuccess(this.state.requestID);
	    	}
	    	else{
				/*
	    		msg.show(`일치하는 ID와 PW가 없습니다.`
					, {
					time: 2000,
					type: 'error'
				});*/
				this.setState({
					requestID:'',
					requestPW:''
				});
	    	}
	    });
	}


    render(){
		
		 const { jsondata } = this.props;
		   
        return (
            <div  style={{border:'1px solid gray'}}>
                <div className='panel panel-default'>
                    <div className='panel-heading'>Add FlashCard</div>
                    <div className='panel-body'>
                        <form onSubmit={this.handleSubmit}>            
                        <div className={'form-group '}>
                            <label className='control-label'>FlashCard</label>
                            <input type='text' className='form-control' ref='nameTextField' value={this.state.value} onChange={this.handleChange}/>

                        </div>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                        <button className="loginwindowbutton" onClick={this.getdata}>데이터조회</button>
    					 <button className="loginwindowbutton" onClick={this.deletedata}>데이터숨기기</button>
                        </form>
                    </div>
                </div>
                <hr/>
                {this.showFlashCards()}
			    {this.renderPosts()}
            </div>
    );
    }
}

export default FlashCard;

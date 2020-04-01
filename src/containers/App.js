import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'
import '../components/app.css';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			robots: [],
			searchField: ''
		}
  }

  componentDidMount() {
  	fetch('https://jsonplaceholder.typicode.com/users')
  		.then(response => response.json())
  		.then(users => this.setState({ robots: users }));
  }

  onSearchChange = (event) => {
  	this.setState({ searchField: event.target.value });
  }

  render() {
    const { robots, searchField } = this.state;

  	const filteredRobots = robots.filter(robot => {
  		return robot.name.toLowerCase().includes(searchField.toLowerCase());
  	});

  	if (robots.empty) {
  		return <div className='tc pa5 ma5'><h1>Loading...</h1></div>
  	}

    return (
		 	<div className='tc'>
		  	<h1 className="f2">RoboFriends</h1>
		  	<SearchBox searchChange={this.onSearchChange} />
		  	<Scroll>
            <ErrorBoundry>
		  		    <CardList robots={filteredRobots} />
            </ErrorBoundry>
		  	</Scroll>
			</div>
	  );
  }
}

export default App;
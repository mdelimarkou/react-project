import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list.js';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';

const API_KEY = ' AIzaSyCRf_A1ZS06PqNYijLilxXlxNLZJolg77A ';


class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('dark knight')
	}  

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos : videos,
				selectedVideo: videos[0]
			});
		});
	}

	//New component - produces HTML
	render() {
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 2000);
		return( 
			<div>
				<SearchBar onSearch = {videoSearch}/>
				<VideoDetail video = {this.state.selectedVideo}/>
				<VideoList 
					onVideoSelect = {(selectedVideo) =>this.setState({selectedVideo})}
					videos = {this.state.videos} />
			</div>
		);
	}
}


//Take component's generated HTML and put it on the page
ReactDOM.render(<App />, document.querySelector('.container'));
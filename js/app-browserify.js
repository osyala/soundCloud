// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

let fetch = require('./fetcher'),
	$ = require('jquery'),
	Backbone = require('backbone'),
	React = require('react')
	// Soundcloud = require('soundcloud')



console.log("js loaded")

var clientId = 'ada5d58a722b5bfb6d69fa7a50a06638'

// Backbone

SC.initialize({
	url: 'http://api.soundcloud.com/tracks',
	client_id: clientId

})

var gettingTracks = SC.get('/tracks', {q: 'post malone'}).then(function(tracks){
	console.log(tracks)
	return (React.render(<PlaylistView data={tracks} />, 
			document.getElementById('container')))
})

console.log(gettingTracks)

// SC.stream('/tracks/134079724').then(function(player){

// })

var Playlist = Backbone.Collection.extend({
	url: 'http://api.soundcloud.com/tracks',
	client_id: 'ada5d58a722b5bfb6d69fa7a50a06638'

})
// React

// var np = new Playlist

var PlaylistView = React.createClass({

	
	render: function(){
		var sInfo = this.props.data

			return(
					<div id="playlistView">
						<SongInfo songsArr={sInfo} />
					</div>	
				)
	}
})



var SongInfo = React.createClass({
	_textData: function(trackInfo){
		var artist = trackInfo.user.username
		var songTitle = trackInfo.title
		var artWork = trackInfo.artwork_url
		var favCount = trackInfo.favoritings_count
		var playCount = trackInfo.playback_count
		var tracks = trackInfo

		return(
			<div className="textData">
				<img src={artWork} />
				<div className="textInfo">
					<p> {songTitle} </p>
					<p> By: {artist} </p>
					<p> Favorited: {favCount} </p>
					<p> Played: {playCount} </p>
				</div>
			</div>

			)
	},

	render: function(){
		var songInfoArray = this.props.songsArr
		var self = this

		return(
			<div className='listTracks'>
				{songInfoArray.map(self._textData)}
			</div>

			)
	}
})


var ScRouter = Backbone.Router.extend({

	router:{
		'*home': 'showPlaylist'
	},

// 	showPlaylist: function(track){
// 		var self = this
// 		this.np.fetch({
// 			data:{
// 				q: 'edm'
// 			},
// 			// dataType: 'jsonp'
// 		}).then(function(tracksData)
// 		{ console.log(tracksData) 
// 			React.render(<PlaylistView data={tracksData} />, 
// 			document.getElementById('container'))}
// )
	},

	initialize: function(){
		console.log('initiated')
		this.np = new Playlist()
		Backbone.history.start()
	}

});


// var newRouter = new ScRouter()


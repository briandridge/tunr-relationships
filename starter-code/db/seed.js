var DB = require("../models").models;

var lucySongs = [
    {
        title: "O sole mio",
        duration: "3:21",
        date_of_release: "1990",
        album_title: "Three Tenors in Concert"
    },
    {
        title: "Nessun dorma",
        duration: "3:21",
        date_of_release: "1990",
        album_title: "Three Tenors in Concert"
    }
];

var extraArtists = [
{
	name:'Donny Dangle',
	photoUrl:'http://img.informador.com.mx/biblioteca/imagen/677x508/811/810055.jpg',
	nationality: 'Hereish',
	instrument:'Spoons',
	home_address:'I said he is from hereish'
},
{
	name:'Prince',
	photoUrl:'http://img.informador.com.mx/biblioteca/imagen/677x508/811/810055.jpg',
	nationality: 'Outer Space',
	instrument:'Your Soul',
	home_address:'Your Dreams'
}];

var theAD = [
{
	headline:'Doin it as hard as I can',
	url:'http://www.relatably.com/m/img/dave-chappelle-memes/image.jpg '
}];

console.log("theAD" + theAD);
console.log("lucySongs" + lucySongs);

var artistCreate = function() {
	return DB.Artist.create({
    name: 'Luciano Pavarotti',
    photoUrl: 'http://img.informador.com.mx/biblioteca/imagen/677x508/811/810055.jpg',
    nationality: 'Italiano',
    instrument: 'Voice',
    home_address: '1 Strada Roma'
  })
	.then(function(artist) {
    lucySongs.forEach(function(song) {
        song.artistId = artist.id;
    });
    DB.Song.bulkCreate(lucySongs);
  });
};

var managerCreate = function() {
	return DB.Manager.create({
    name: 'Ricky Bobby',
    email: 'rbobby@gmail.com',
    office_number: '516-877-0304',
    cell_phone_number: '718-989-1231'
	})
	.then (function(manager){
		theAD.forEach(function(ad){
		ad.managerId = manager.id;

	});
		extraArtists.forEach(function(artist){
			artist.managerId = manager.id;
			console.log(artist.managerId);
		});
		console.log(manager.id);
	DB.Artist.bulkCreate(extraArtists);
	DB.Ad.bulkCreate(theAD);
	});

	// .then( function(adresponse){
	// 	console.log("YEEEP!" + adresponse);
	// 	console.log(adresponse.id);
	// 	console.log(theAD.managerId);
	// });
};


var songCreate = function() {
	return DB.Song.create({
	    title: 'The Best Song Ever',
	    duration: '3:31',
	    date_of_release: '7/13/2015',
	    album_title: 'Best Album Ever'
	});
};

artistCreate()
.then(managerCreate)
.then(songCreate)
.then(function() {
	process.exit();
});


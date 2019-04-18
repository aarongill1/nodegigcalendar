module.exports = class Gig {
  constructor(artist, date) {
  this.artist = artist;
  this.date = date;
  }

  get getArtist() {
    return this.artist;
  }
  get getDate() {
    return this.date;
  }
}

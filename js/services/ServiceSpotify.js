(function() {

  const token = 'BQDkuAGjd0FhNkXaslV9HiqgxxmJsRJrKVv3SainWkpcb8Hu1xnsL16EAPizE-S4rn6SJSqiVhmNPcT47Tj1-7UgsotCSUg0vm2HWK4JDKIlXefA9V_3AYINNwiusgs2ro17_hH0w9uyVKZZRBgT'

  const urlSearch = 'https://api.spotify.com/v1/search'
  const urlGetAlbums = 'https://api.spotify.com/v1/artists/<%ID_ARTIST%>/albums'
  const urlGetTracks = 'https://api.spotify.com/v1/albums/<%ID_ALBUM%>/tracks'

  function searchArtist( query ) {
    const url = urlSearch
    const q = query
    const type = 'artist'
    const Authorization = 'Bearer ' + token

    return $.ajax({
      url,
      data: { q, type },
      headers: { Authorization }
    })
  }

  function getAlbums(idArtistSelected) {
    var urlAlbums = urlGetAlbums.replace('<%ID_ARTIST%>', idArtistSelected)

    return $.ajax({
      url: urlAlbums,
      headers: {
          Authorization: 'Bearer ' + token
      }
    })
  }

  function getTracks(idAlbumSelected) {
    var urlTracks = urlGetTracks.replace('<%ID_ALBUM%>', idAlbumSelected)

    return $.ajax({
      url: urlTracks,
      headers: {
          Authorization: 'Bearer ' + token
      }
    })
  }

  window.SPOTIFY_SERVICE = { searchArtist, getAlbums, getTracks }

})()

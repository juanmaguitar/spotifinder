
var token = 'BQDEqN9ClSrMmSagqT81aWtgS9yyhCTr0xVKA6CuWxm-F4G4R-fSVzHgYyGhXUcq0m6ZY20uRlVEWRkpuyCwXw_LTbdb8aEeppxrN2GHE4ymdtvUtwAPpJ2wJo7Kt4vTxNCmR60jYaKGCxHARulm'

var urlSearch = 'https://api.spotify.com/v1/search'
var urlGetAlbums = 'https://api.spotify.com/v1/artists/<%ID_ARTIST%>/albums'
var urlGetTracks = 'https://api.spotify.com/v1/albums/<%ID_ALBUM%>/tracks'

var itemResultTpl = $('#tplItemResult').text().trim()

$('#search').on('submit', function(e) {
    e.preventDefault()
    var query = $(this).find('input').val()

    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      data: {
          q: query,
          type: 'artist'
      },
      headers: {
          Authorization: 'Bearer ' + token
      }
    })
    .then(function(oData) {

        var contentSelect = ''
        var defaultImg = 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=4577402'

        oData.artists.items.forEach( function(artist) {
          var imageBand = artist.images && artist.images[0] && artist.images[0].url || defaultImg


          contentSelect += itemResultTpl
                            .replace('<%IMG%>', imageBand )
                            .replace('<%ID%>', artist.id)
                            .replace('<%NAME%>', artist.name)
        })

        $('#artists .results').html(contentSelect)
        $('#artists').removeClass('hidden')
        $('#albums, #tracks').addClass('hidden')

    })
})

$('#artists .results').on('click', 'a', function(e) {
  e.preventDefault()
  var idArtistSelected = $(this).parent().data('id')
  $(this).closest('.card-result')
    .addClass('selected')
    .siblings().addClass('hidden')

  var urlAlbums = urlGetAlbums.replace('<%ID_ARTIST%>', idArtistSelected)

  $.ajax({
    url: urlAlbums,
    headers: {
        Authorization: 'Bearer ' + token
    }
  })
  .then( function(response) {

    var albums = response.items
    var contentSelect = ''

    albums.forEach( function(album) {
      contentSelect += itemResultTpl
                          .replace('<%ID%>', album.id)
                          .replace('<%IMG%>', album.images[0].url)
                          .replace('<%NAME%>', album.name)
    })
    $('#albums .results').html(contentSelect)
    $('#albums').removeClass('hidden')
    $('#tracks').addClass('hidden')

  })
})

$('#albums .results').on('click', 'a', function(e) {
  e.preventDefault()
  var idAlbumSelected = $(this).parent().data('id')
  $(this).closest('.card-result')
    .addClass('selected')
    .siblings().addClass('hidden')

  var urlTracks = urlGetTracks.replace('<%ID_ALBUM%>', idAlbumSelected)

  $.ajax({
    url: urlTracks,
    headers: {
        Authorization: 'Bearer ' + token
    }
  })
  .then( function(response) {

    var tracks = response.items
    var contentList = ''
    var listElementTpl = '<li><a href="<%TRACK_URL%>" target="_blank"><%TRACK_NAME%></a></li>'

    tracks.forEach( function(track, i) {
      contentList += listElementTpl
                        .replace('<%TRACK_NAME%>', track.name)
                        .replace('<%TRACK_URL%>', track.preview_url)
    })

    $('#tracks ul').html(contentList)
    $('#tracks').removeClass('hidden')
  })

})
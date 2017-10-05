const token = 'BQDkuAGjd0FhNkXaslV9HiqgxxmJsRJrKVv3SainWkpcb8Hu1xnsL16EAPizE-S4rn6SJSqiVhmNPcT47Tj1-7UgsotCSUg0vm2HWK4JDKIlXefA9V_3AYINNwiusgs2ro17_hH0w9uyVKZZRBgT'

const urlSearch = 'https://api.spotify.com/v1/search'
const urlGetAlbums = 'https://api.spotify.com/v1/artists/<%ID_ARTIST%>/albums'
const urlGetTracks = 'https://api.spotify.com/v1/albums/<%ID_ALBUM%>/tracks'

const defaultImg = 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=4577402'

const itemResultTpl = $('#tplItemResult').text().trim()

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
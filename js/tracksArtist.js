(function () {

  const defaultImg = 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=4577402'
    const itemResultTpl = $('#tplItemResult').text().trim()

  $('#albums .results').on('click', 'a', function(e) {
    e.preventDefault()
    var idAlbumSelected = $(this).parent().data('id')
    $(this).closest('.card-result')
      .addClass('selected')
      .siblings().addClass('hidden')

    SPOTIFY_SERVICE.getTracks(idAlbumSelected)
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

})()

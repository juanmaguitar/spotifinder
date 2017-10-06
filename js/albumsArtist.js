(function() {

  const defaultImg = 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=4577402'

  const itemResultTpl = $('#tplItemResult').text().trim()

  $('#artists .results').on('click', 'a', function(e) {
    e.preventDefault()
    var idArtistSelected = $(this).parent().data('id')
    $(this).closest('.card-result')
      .addClass('selected')
      .siblings().addClass('hidden')

    SPOTIFY_SERVICE.getAlbums(idArtistSelected)
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


})()

(function() {

  const defaultImg = 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=4577402'
  const itemResultTpl = $('#tplItemResult').text().trim()

  $('#search').on('submit', function(e) {

      e.preventDefault()

      const query = $(this).find('input').val()

      SPOTIFY_SERVICE.searchArtist(query)
        .then(function(oData) {

            const { items: artists } = oData.artists

            const contentSelect = artists.reduce( (html, artist) => {
              const imageBand = artist.images && artist.images[0] && artist.images[0].url || defaultImg
              html += itemResultTpl
                        .replace('<%IMG%>', imageBand )
                        .replace('<%ID%>', artist.id)
                        .replace('<%NAME%>', artist.name)
              return html
            }, '')

            $('#artists')
              .removeClass('hidden')
              .find('.results')
                .html(contentSelect)

            $('#albums, #tracks').addClass('hidden')

        })
  })

})()
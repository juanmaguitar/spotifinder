(function() {

  const token = 'BQDkuAGjd0FhNkXaslV9HiqgxxmJsRJrKVv3SainWkpcb8Hu1xnsL16EAPizE-S4rn6SJSqiVhmNPcT47Tj1-7UgsotCSUg0vm2HWK4JDKIlXefA9V_3AYINNwiusgs2ro17_hH0w9uyVKZZRBgT'

  const urlSearch = 'https://api.spotify.com/v1/search'
  const defaultImg = 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=4577402'
  const itemResultTpl = $('#tplItemResult').text().trim()

  $('#search').on('submit', function(e) {

      e.preventDefault()

      const url = urlSearch
      const q = $(this).find('input').val()
      const type = 'artist'
      const Authorization = 'Bearer ' + token

      $.ajax({
        url,
        data: { q, type },
        headers: { Authorization }
      })
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
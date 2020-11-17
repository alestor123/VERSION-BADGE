var axios = require('axios')
axios.get('https://raw.githubusercontent.com/alestor123/OCTO-DAYS/master/package.json')
  .then((response) => {
      console.log(response.body)
})
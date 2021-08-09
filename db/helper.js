module.exports = {
  formatReviews: (productid, page, count, rows) => {
    var obj = {
      'product' :  productid,
      'page' : page,
      'count' : count,
      'results' : []
    }

    rows.forEach(review => {
      var found = false
      var index = -1
      for (var i=0; i < obj['results'].length; i++) {
        console.log('in loop results', obj['results'][i]['review_id'])
        console.log('reviewid match',review.id)
        if (obj['results'][i]['review_id'] === review.id){
          found = true
          index = i
        }
      }
      console.log('exists:', found)
      if(!found){
        var isTrueSet = (review.recommend === 'true')
        var reviewObj = {
          "review_id": review.id,
          "rating": review.rating,
          "summary": review.summary,
          "recommend": isTrueSet,
          "response": review.response,
          "body": review.body,
          "date": "2019-04-14T00:00:00.000Z",
          "reviewer_name": review.reviewer_name,
          "helpfulness": review.helpfulness,
          "photos": []
        }
        if(review.url !== null) {
          var photoObj = {
            'id': 1,
            'url': review.url
          }
          reviewObj["photos"].push(photoObj)
        }
        obj['results'].push(reviewObj)
      }
    if(found){
      if(review.url !== null) {
        obj['results'][index]["photos"].push({
          'id': 1,
          'url': review.url
        })
      }

    }
  })
  conaole.log(obj)
    return obj
  },

  formatMeta: (productid, rows) => {
    var obj = {
      'product_id' :  productid,
      'ratings' : {},
      'recommended' : {},
      'characteristics' : {}
    }
    rows.forEach(row => {
      obj['ratings'][row.rating] = (parseInt(obj['ratings'][row.rating]) | 0) + 1
      if(row.recommend === 'true') {
        obj['recommended']['1'] = (parseInt(obj['recommended']['1']) | 0) + 1
      } else if(row.recommend === 'false') {
          obj['recommended']['0'] = (parseInt(obj['recommended']['0']) | 0) + 1
      }
      if(obj['characteristics'][row.name] === undefined) {
        obj['characteristics'][row.name] = { 'id': row.characteristic_id, 'value': row.value, 'count': 1}
      } else {
        obj['characteristics'][row.name]['value'] = (obj['characteristics'][row.name]['value']* obj['characteristics'][row.name]['count']+ row.value)/ (obj['characteristics'][row.name]['count'] + 1)
        obj['characteristics'][row.name]['count'] = obj['characteristics'][row.name]['count'] + 1
      }
    })
    return obj
  }




}
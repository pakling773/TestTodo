'use strict'

var getRawBody = require('raw-body');
const todo = require('./todo.js')

exports.handler = (req, resp, context) => {
  resp.setHeader('content-type', 'application/json')
  var uri = (req.url).split('/')
  if (uri.length == 0) {
    resp.send(JSON.stringify({ 'code': 400, 'body': 'Bad request' }))
  } else {
    var route = uri[uri.length - 1]
    switch (req.method) {

      // List End point
      case 'GET':
        switch (route) {
          case "list":
            resp.send(JSON.stringify(todo.list()))
            break
          default:
            resp.send(JSON.stringify({ 'code': 400, 'body': 'Bad request' }))
            break
        }
        break

      // Add End point
      case 'POST':
        switch (route) {
          case "add":
            getRawBody(req, (err, body) => {
              resp.send(JSON.stringify(todo.add(body)))
            })
            break
          default:
            resp.send(JSON.stringify({ 'code': 400, 'body': 'Bad request' }))
            break
        }
        break

      // Remove End point
      case 'PUT':
        switch (route) {
          case "remove":
            resp.send(JSON.stringify(todo.remove()))
            break
          default:
            resp.send(JSON.stringify({ 'code': 400, 'body': 'Bad request' }))
            break
        }
      default:
        resp.send(JSON.stringify({ 'code': 400, 'body': 'Bad requset' }))
    }
  }
}
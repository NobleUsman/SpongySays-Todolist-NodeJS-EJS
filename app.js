
import { getDate } from "./date.js" // ES6 module syntax

//const express = require("express") nodejs/commonjs module syntax
import express from "express" // ES6 module syntax

//const bodyparser = require("body-parser") //nodejs/commonjs module syntax
import bodyparser from "body-parser" // ES6 module syntax

// nodejs/commonjs module syntax
// const date = require(__dirname + "/date.js")

const app = express()

let todos = ["Click", "Clack", "Kick"]

let workTodos = []

// set the view engine to ejs
app.set("view engine", "ejs")

app.use(bodyparser.urlencoded({ extended : true }))

app.use(express.static('public'))

app.get("/", function(req, res) {

    

    // use res.render to load up an ejs view file/template
    res.render("list", {listTitle : getDate() , todo : todos})
})


app.post("/", function(req, res) {

    console.log(req.body)

    // In ejs file, we have just named "button" as "list". And given its "value" as "<%= listTitle %>" which is a marker
    // whose value is specified in app.get("/work") request's work route 
    // And if we catch any item from list, we push it in work array, else we push it in previous page array.
    const todoItem = req.body.todoItem

    if (req.body.list === "Work") {  // if value comes from page title named "Work"(which comes from value attr of button), then save it in work array
        workTodos.push(todoItem)
        res.redirect("/work")
    } else {  // else save in previous array as that page title is a date
        todos.push(todoItem)
        res.redirect("/")
    }

    // const todoItem = req.body.todoItem
    // console.log(todoItem)

    // todos.push(todoItem)

    // res.redirect("/")
})

// Working with "Layouts" using EJS
// in layots, MARKER in ejs file will remain same, ONLY the VALUE will change, which is provided from the app.js
app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", todo: workTodos})
})

// wont need app.post for "/work" route as the same is being handled by using EJS markers in "/" route's .post request.


app.get("/about", function(req, res) {
    res.render("about")
})


const port = process.env.PORT || 3000

app.listen(port, function(req, res) {
    console.log(`Server started at port: ${port}`)
})

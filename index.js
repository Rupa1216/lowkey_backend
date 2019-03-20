const {app,} = require('./app')

app.listen(process.env.PORT || 3003, () => {
    console.log('listening on port 3003')
})
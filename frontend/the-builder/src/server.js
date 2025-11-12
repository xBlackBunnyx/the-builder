import express from 'express';
const app = express();
const port = 3000;
import path from 'path';

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post('/submitMessage', function(request, response){
    message = request.body.message;
    console.log("Message: " + message);
    response.send('Server response message!!');
})


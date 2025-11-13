import express from 'express';
const app = express();
const port = 3001;
import path from 'path';
import cors from 'cors';

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
});


// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cors());
app.post('/submitMessage', function(request, response){
    let message = request.body.message;
    console.log("Message: " + message);
    response.send('Server response message!!');
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

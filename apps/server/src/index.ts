const Express = require('express');

const app = Express();

app.get('/', (req: any, res: any) => {
    res.send('Hello World');
});

app.listen(8080);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET CON QUERY TIPO SEARCH (OJO QUE ES EL MISMO!)
app.get('/', (req, res) => {
  const { query } = req;
});

//GET CON ID IDENTIFICADOR EN LA URL TIPO PARAMS
app.get('/:id', (req, res) => {
  const { id } = req.params;
});

//POST CON BODY (SIN ID!!)
app.post('/api/usuarios', (req, res) => {
  const { body } = req;
});

//PUT CON ID PARAMS SIEMPRE y BODY!
app.put('/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
});

//DELETE CON ID PARAMS SIEMPRE
app.delete('/:id', (req, res) => {
  const { id } = req.params;
});

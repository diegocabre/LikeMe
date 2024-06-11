const express = require("express");
const { crearPost, obtenerPosts, sumarLike } = require("./consultas");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/post", async (req, res) => {
  try {
    const { usuario, URL, descripcion } = req.body;
    const nuevoPost = await crearPost(usuario, URL, descripcion);
    res.status(201).json(nuevoPost);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el post" });
  }
});

app.put("/post", async (req, res) => {
  try {
    const { id } = req.query;
    const postActualizado = await sumarLike(id);
    res.status(200).json(postActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al sumar like" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await obtenerPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener posts" });
  }
});

app.delete("/post", async (req, res) => {
  try {
    const { id } = req.query;
    await borrarPost(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error al borrar el post" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

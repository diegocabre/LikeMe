const pool = require("./db");

const crearPost = async (usuario, URL, descripcion) => {
  const consulta =
    "INSERT INTO posts (usuario, url, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *";
  const valores = [usuario, URL, descripcion];
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

const obtenerPosts = async () => {
  const consulta = "SELECT * FROM posts";
  const resultado = await pool.query(consulta);
  return resultado.rows;
};

const sumarLike = async (id) => {
  const consulta =
    "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
  const valores = [id];
  const resultado = await pool.query(consulta, valores);
  return resultado.rows[0];
};

const borrarPost = async (id) => {
  const consulta = "DELETE FROM posts WHERE id = $1";
  const valores = [id];
  await pool.query(consulta, valores);
};

module.exports = { crearPost, obtenerPosts, sumarLike, borrarPost };

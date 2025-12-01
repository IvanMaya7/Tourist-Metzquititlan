import { useEffect, useState } from "react";
import { getGastronomy, createGastronomy, updateGastronomy, deleteGastronomy
} from "../api/gastronomy";

function Gastronomy() {
  const [items, setItems] = useState([]);

  // Form principal
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    images: "",
    recommendedPlaces: ""
  });

  // ID del que estamos editando (null si es uno nuevo)
  const [editId, setEditId] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const loadData = async () => {
    try {
      const res = await getGastronomy();
      setItems(res.data.data);
      setFilteredItems(res.data.data);
    } catch (error) {
      console.error("Error cargando gastronomía:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // PREPARAR formulario para editar
  const startEdit = (item) => {
    setEditId(item._id);
    setFormData({
      name: item.name,
      description: item.description,
      ingredients: item.ingredients.join("\n"),
      images: item.images.join("\n"),
      recommendedPlaces: item.recommendedPlaces.join("\n")
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setFormData({
      name: "",
      description: "",
      ingredients: "",
      images: "",
      recommendedPlaces: ""
    });
  };

  const handleSearchByName = (value) => {
  setSearchName(value);

  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );

  setFilteredItems(filtered);
  };

  const handleDelete = async (id) => {
  try {
    await deleteGastronomy(id);
    alert("Platillo eliminado correctamente");
    loadData(); // vuelve a cargar la lista
  } catch (error) {
    console.error("Error eliminando:", error);
    alert("Hubo un error al eliminar el platillo");
  }
};

  const handleSubmit = async (e) => { 
  e.preventDefault();

  const formDataToSend = new FormData();

  // Campos normales
  formDataToSend.append("name", formData.name);
  formDataToSend.append("description", formData.description);

  // Convertimos los textos en arreglos reales
  formDataToSend.append(
    "ingredients",
    JSON.stringify(formData.ingredients.split("\n").filter(Boolean))
  );

  formDataToSend.append(
    "recommendedPlaces",
    JSON.stringify(formData.recommendedPlaces.split("\n").filter(Boolean))
  );

  // IMÁGENES: si no hay imágenes, no enviamos nada
  if (formData.images && formData.images.length > 0) {
    formData.images.forEach((file) => {
      formDataToSend.append("images", file);
    });
  }

  try {
    if (editId) {
      await updateGastronomy(editId, formDataToSend);
      alert("Platillo actualizado");
    } else {
      await createGastronomy(formDataToSend);
      alert("Platillo guardado");
    }

    cancelEdit();
    loadData();

  } catch (error) {
    console.error("Error guardando:", error);
    alert("Error, revisa la consola");
  }
};


  return (
    <div style={{ padding: 20 }}>
      <h1>Gastronomía</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <h2>{editId ? "Editar Platillo" : "Agregar Platillo"}</h2>

        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
        />
        <br /><br />

        <textarea
          name="ingredients"
          placeholder="Ingredientes (uno por línea)"
          value={formData.ingredients}
          onChange={handleChange}
        />
        <br /><br />

       <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
                setFormData({ ...formData, images: Array.from(e.target.files) })
            }
        />

        <br /><br />

        <textarea
          name="recommendedPlaces"
          placeholder="Lugares recomendados (uno por línea)"
          value={formData.recommendedPlaces}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">
          {editId ? "Actualizar" : "Guardar"}
        </button>


        {editId && (
          <button
            type="button"
            onClick={cancelEdit}
            style={{ marginLeft: 10 }}
          >
            Cancelar edición
          </button>
        )}
      </form>

{/* BUSCAR POR NOMBRE */}
<div style={{ marginBottom: 40 }}>
  <h2>Buscar por nombre</h2>

  <input
    type="text"
    placeholder="Escribe el nombre del platillo"
    value={searchName}
    onChange={(e) => handleSearchByName(e.target.value)}
    style={{ width: "300px" }}
  />
</div>


      {/* LISTA */}
      <h2>Lista de platillos</h2>
<ul>
  {filteredItems.map((item) => (
    <li key={item._id} style={{ marginBottom: 20, border: "1px solid #ccc", padding: 10 }}>
      <h3>{item.name}</h3>

      <div><strong>Descripción:</strong> {item.description}</div>

      <div>
        <strong>Ingredientes:</strong>
        <ul>
          {item.ingredients?.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Imágenes:</strong>
        <ul>
          {item.images?.map((img, idx) => (
            <li key={idx}>
              <a href={img} target="_blank">{img}</a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Lugares recomendados:</strong>
        <ul>
          {item.recommendedPlaces?.map((place, idx) => (
            <li key={idx}>{place}</li>
          ))}
        </ul>
      </div>

      <button onClick={() => startEdit(item)}>Editar</button>
      <button onClick={() => handleDelete(item._id)}>Eliminar</button>
    </li>
  ))}
</ul>

    </div>
  );
}

export default Gastronomy;

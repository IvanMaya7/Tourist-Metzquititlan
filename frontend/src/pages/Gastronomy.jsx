import { useEffect, useState } from "react";
import axios from "axios";
import {
  getGastronomy,
  createGastronomy,
  updateGastronomy,
  deleteGastronomy
} from "../api/gastronomy";

// IMPORTANTE: Importar el CSS
import "../styles/Gastronomy.css"; 

function Gastronomy() {
  const [items, setItems] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: "",
    images: [],
    recommendedPlaces: ""
  });

  const [editId, setEditId] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  // TUS CREDENCIALES DE CLOUDINARY (Recuerda poner las tuyas)
  const CLOUDINARY_CLOUD_NAME = "TU_CLOUD_NAME"; 
  const CLOUDINARY_UPLOAD_PRESET = "TU_PRESET"; 

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFilesToUpload(Array.from(e.target.files));
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        data
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error subiendo imagen:", error);
      throw error;
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setFilesToUpload([]);
    setFormData({
      name: item.name,
      description: item.description,
      ingredients: item.ingredients.join("\n"),
      recommendedPlaces: item.recommendedPlaces.join("\n"),
      images: item.images || []
    });
  };

  const cancelEdit = () => {
    setEditId(null);
    setFilesToUpload([]);
    setFormData({
      name: "",
      description: "",
      ingredients: "",
      images: [],
      recommendedPlaces: ""
    });
  };

  const handleSearchByName = (value) => {
    setSearchName(value);
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleDelete = async (id) => {
    if(!window.confirm("¿Estás seguro de eliminar este platillo?")) return;
    try {
      await deleteGastronomy(id);
      loadData();
    } catch (error) {
      console.error("Error eliminando:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrls = formData.images;
      if (filesToUpload.length > 0) {
        const uploadPromises = filesToUpload.map((file) => uploadToCloudinary(file));
        const newUrls = await Promise.all(uploadPromises);
        imageUrls = [...imageUrls, ...newUrls];
      }

      const payload = {
        name: formData.name,
        description: formData.description,
        ingredients: formData.ingredients.split("\n").filter(Boolean),
        images: imageUrls,
        recommendedPlaces: formData.recommendedPlaces.split("\n").filter(Boolean),
      };

      if (editId) {
        await updateGastronomy(editId, payload);
      } else {
        await createGastronomy(payload);
      }
      cancelEdit();
      loadData();
    } catch (error) {
      console.error("Error guardando:", error);
      alert("Error al guardar. Revisa la consola.");
    }
  };

  return (
    <div className="gastronomy-container">
      <h1 className="title-main">Gestión de Gastronomía</h1>

      {/* --- FORMULARIO --- */}
      <form onSubmit={handleSubmit} className="gastronomy-form">
        <h2>{editId ? "Editar Platillo" : "Agregar Nuevo Platillo"}</h2>

        <div className="form-group">
          <input
            className="input-field"
            type="text"
            name="name"
            placeholder="Nombre del platillo"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            className="textarea-field"
            name="description"
            placeholder="Descripción detallada..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <textarea
            className="textarea-field"
            name="ingredients"
            placeholder="Ingredientes (Escribe uno por línea)"
            value={formData.ingredients}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="section-label">Subir Imágenes:</label>
          <input
            className="file-input"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          {filesToUpload.length > 0 && <small>{filesToUpload.length} archivos seleccionados.</small>}
        </div>

        <div className="form-group">
          <textarea
            className="textarea-field"
            name="recommendedPlaces"
            placeholder="Lugares recomendados (Uno por línea)"
            value={formData.recommendedPlaces}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {editId ? "Actualizar Platillo" : "Guardar Platillo"}
        </button>

        {editId && (
          <button type="button" onClick={cancelEdit} className="btn btn-secondary">
            Cancelar Edición
          </button>
        )}
      </form>

      {/* --- BUSCADOR --- */}
      <div className="search-section">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Buscar platillo por nombre..."
          value={searchName}
          onChange={(e) => handleSearchByName(e.target.value)}
        />
      </div>

      {/* --- LISTADO (GRID) --- */}
      <ul className="cards-grid">
        {filteredItems.map((item) => (
          <li key={item._id} className="gastronomy-card">
            <div className="card-content">
              <h3 className="card-title">{item.name}</h3>
              
              <div className="card-section">
                <p>{item.description}</p>
              </div>

              <div className="card-section">
                <span className="section-label">Ingredientes:</span>
                <ul className="simple-list">
                  {item.ingredients?.slice(0, 3).map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                  {item.ingredients?.length > 3 && <li>...</li>}
                </ul>
              </div>

              {item.images?.length > 0 && (
                <div className="card-section">
                  <span className="section-label">Galería:</span>
                  <div className="image-gallery">
                    {item.images.map((img, idx) => (
                      <img key={idx} src={img} alt={item.name} className="card-img" />
                    ))}
                  </div>
                </div>
              )}

              <div className="card-section">
                <span className="section-label">Lugares:</span>
                <ul className="simple-list">
                    {item.recommendedPlaces?.map((place, idx) => (
                        <li key={idx}>{place}</li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="card-actions">
              <button onClick={() => startEdit(item)} className="btn btn-action btn-edit">
                Editar
              </button>
              <button onClick={() => handleDelete(item._id)} className="btn btn-action btn-delete">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Gastronomy;
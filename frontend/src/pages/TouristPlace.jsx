import { useEffect, useState } from "react";
import axios from "axios"; // 1. Importante: Axios para subir a Cloudinary
import {
    getTouristPlace,
    createTouristPlace,
    updateTouristPlace,
    deleteTouristPlace
} from "../api/touristPlace";
import "../styles/Gastronomy.css"; 

function TouristPlaces() {
    const [items, setItems] = useState([]);
    
    // 2. Estado para los archivos seleccionados
    const [filesToUpload, setFilesToUpload] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        images: [], // 3. Inicializamos como Array [], no string
        category: "otro",
        openHours: "",
        price: ""
    });

    const [editId, setEditId] = useState(null);
    const [searchName, setSearchName] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    // --- CONFIGURACIÓN CLOUDINARY ---
    // Asegúrate de usar tus credenciales correctas
    const CLOUDINARY_CLOUD_NAME = "duiwgaaxh"; 
    const CLOUDINARY_UPLOAD_PRESET = "mo17q6fo"; // <--- Pega tu preset 'unsigned'

    const loadData = async () => {
        try {
            const res = await getTouristPlace();
            setItems(res.data.data);
            setFilteredItems(res.data.data);
        } catch (error) {
            console.error("Error cargando lugares:", error);
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

    // 4. Manejador de selección de archivos
    const handleFileChange = (e) => {
        setFilesToUpload(Array.from(e.target.files));
    };

    // 5. Función de subida a Cloudinary
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
        setFilesToUpload([]); // Limpiar archivos nuevos
        setFormData({
            name: item.name,
            description: item.description,
            location: item.location,
            images: item.images || [], // Mantener array existente
            category: item.category,
            openHours: item.openHours,
            price: item.price
        });
    };

    const cancelEdit = () => {
        setEditId(null);
        setFilesToUpload([]);
        setFormData({
            name: "",
            description: "",
            location: "",
            images: [],
            category: "otro",
            openHours: "",
            price: ""
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
        if(!window.confirm("¿Seguro que deseas eliminar este lugar?")) return;
        try {
            await deleteTouristPlace(id);
            alert("Lugar eliminado");
            loadData();
        } catch (error) {
            console.error("Error eliminando:", error);
            alert("Hubo un error al eliminar el lugar");
        }
    };

    // 6. HandleSubmit con lógica de subida
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrls = formData.images; // URLs existentes

            // Subir archivos nuevos si los hay
            if (filesToUpload.length > 0) {
                const uploadPromises = filesToUpload.map(file => uploadToCloudinary(file));
                const newUrls = await Promise.all(uploadPromises);
                imageUrls = [...imageUrls, ...newUrls];
            }

            const payload = {
                name: formData.name,
                description: formData.description,
                location: formData.location,
                images: imageUrls, // Array final de URLs
                category: formData.category,
                openHours: formData.openHours,
                price: formData.price
            };

            if (editId) {
                await updateTouristPlace(editId, payload);
                alert("Lugar actualizado");
            } else {
                await createTouristPlace(payload);
                alert("Lugar guardado");
            }

            cancelEdit();
            loadData();
        } catch (error) {
            console.error("Error guardando:", error);
            alert("Error, revisa consola");
        }
    };

    return (
        <div className="gastronomy-container">
            <h1 className="title-main">Lugares Turísticos</h1>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="gastronomy-form">
                <h2>{editId ? "Editar lugar" : "Agregar lugar"}</h2>

                <div className="form-group">
                    <input
                        className="input-field"
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <textarea
                        className="input-field"
                        name="description"
                        placeholder="Descripción"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        className="input-field"
                        type="text"
                        name="location"
                        placeholder="Ubicación"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    {/* Input de Archivos */}
                    <label>Imágenes:</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                    />
                    {filesToUpload.length > 0 && <small> {filesToUpload.length} archivos seleccionados</small>}
                </div>

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="natural">Natural</option>
                    <option value="histórico">Histórico</option>
                    <option value="religioso">Religioso</option>
                    <option value="mirador">Mirador</option>
                    <option value="gastronomía">Gastronomía</option>
                    <option value="otro">Otro</option>
                </select>

                <div className="form-group">
                    <input
                        className="input-field"
                        type="text"
                        name="openHours"
                        placeholder="Horario"
                        value={formData.openHours}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        className="input-field"
                        type="text"
                        name="price"
                        placeholder="Precio"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    {editId ? "Actualizar" : "Guardar"}
                </button>

                {editId && (
                    <button
                        type="button"
                        onClick={cancelEdit}
                        className="btn btn-secondary"
                    >
                        Cancelar
                    </button>
                )}
            </form>

            {/* SEARCH */}
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Escribe el nombre del lugar"
                    value={searchName}
                    onChange={(e) => handleSearchByName(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* LIST */}
            <ul className="cards-grid">
                {filteredItems.map((item) => (
                    <li
                        key={item._id}
                        className="gastronomy-card"
                    >
                        <div className="card-content">
                            <h3>{item.name}</h3>

                            <div className="card-section"><strong>Descripción:</strong> {item.description}</div>
                            <div className="card-section"><strong>Ubicación:</strong> {item.location}</div>
                            <div className="card-section"><strong>Categoría:</strong> {item.category}</div>
                            <div className="card-section"><strong>Horario:</strong> {item.openHours}</div>
                            <div className="card-section"><strong>Precio:</strong> {item.price}</div>

                            <div className="card-section">
                                <strong className="section-label">Imágenes:</strong>
                                {/* Galería visual */}
                                <div className="image-gallery">
                                    {item.images?.map((img, idx) => (
                                    <img 
                                        key={idx} 
                                        src={img} 
                                        alt={item.name} 
                                        className="card-img"
                                    />
                                ))}
                                </div>
                            </div>
                        </div>

                        <div className="card-actions">
                            <button onClick={() => startEdit(item)} className="btn btn-action btn-edit">Editar</button>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="btn btn-action btn-delete"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TouristPlaces;
import { useEffect, useState } from "react";
import axios from "axios"; // 1. Importamos axios
import { getHistory, createHistory, updateHistory, deleteHistory } from "../api/history";
import "../styles/Gastronomy.css"; 

function History() {
    const [items, setItems] = useState([]);
    
    // 2. Estado separado para los archivos que el usuario selecciona
    const [filesToUpload, setFilesToUpload] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        images: [], // 3. Ahora esto es un array [], no un string ""
        author: ""
    });

    const [editId, setEditId] = useState(null);
    const [searchName, setSearchName] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    // --- CONFIGURACIÓN CLOUDINARY ---
    // Asegúrate de usar los mismos datos que en Gastronomy
    const CLOUDINARY_CLOUD_NAME = "duiwgaaxh"; 
    const CLOUDINARY_UPLOAD_PRESET = "mo17q6fo"; // <--- Pega aquí tu preset 'unsigned'

    const loadData = async () => {
        try {
            const res = await getHistory();
            setItems(res.data.data);
            setFilteredItems(res.data.data);
        } catch (error) {
            console.error("Error cargando historia:", error);
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

    // 4. Función para manejar la selección de archivos
    const handleFileChange = (e) => {
        setFilesToUpload(Array.from(e.target.files));
    };

    // 5. Función para subir a Cloudinary
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
        setFilesToUpload([]); // Limpiamos selección nueva
        setFormData({
            title: item.title,
            content: item.content,
            images: item.images || [], // Mantenemos el array existente
            author: item.author
        });
    };

    const cancelEdit = () => {
        setEditId(null);
        setFilesToUpload([]);
        setFormData({
            title: "",
            content: "",
            images: [],
            author: ""
        });
    };

    const handleSearchByName = (value) => {
        setSearchName(value);
        const filtered = items.filter(item =>
            item.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    const handleDelete = async (id) => {
        if(!window.confirm("¿Seguro que quieres eliminar esta historia?")) return;
        try {
            await deleteHistory(id);
            alert("Historia eliminada");
            loadData();
        } catch (error) {
            console.error("Error eliminando:", error);
            alert("Hubo un error al eliminar dato histórico");
        }
    };

    // 6. HandleSubmit modificado
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrls = formData.images; // URLs existentes (si estamos editando)

            // Si hay archivos nuevos, los subimos primero
            if (filesToUpload.length > 0) {
                const uploadPromises = filesToUpload.map(file => uploadToCloudinary(file));
                const newUrls = await Promise.all(uploadPromises);
                imageUrls = [...imageUrls, ...newUrls]; // Agregamos las nuevas a las existentes
            }

            const payload = {
                title: formData.title,
                content: formData.content,
                images: imageUrls, // Array de URLs
                author: formData.author
            };

            if (editId) {
                await updateHistory(editId, payload);
                alert("Historia actualizada");
            } else {
                await createHistory(payload);
                alert("Historia guardada");
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
            <h1 className="title-main">Historia</h1>

            <form onSubmit={handleSubmit} className="gastronomy-form">
                <h2> {editId ? "Editar historia" : "Agregar historia"} </h2>

                <div className="form-group">
                    <input
                        className="input-field"
                        type="text"
                        name="title"
                        placeholder="Título"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <textarea
                        className="input-field"
                        name="content"
                        placeholder="Contenido"
                        value={formData.content}
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
                    {filesToUpload.length > 0 && <span> {filesToUpload.length} seleccionadas</span>}
                </div>

                <div className="form-group">
                    <input
                        className="input-field"
                        type="text"
                        name="author"
                        placeholder="Autor"
                        value={formData.author}
                        onChange={handleChange}
                        required
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

            <div className="search-section">
                <input
                    type="text"
                    placeholder="Escribe el nombre del dato histórico"
                    value={searchName}
                    onChange={(e) => handleSearchByName(e.target.value)}
                    className="search-input"
                />
            </div>

            <ul className="cards-grid">
                {filteredItems.map((item) => (
                    <li key={item._id} className="gastronomy-card">
                        <div className="card-content">
                            <h3 className="card-title">{item.title}</h3>
                            <div className="card-section">
                                <strong>Acontecimiento:</strong> {item.content}
                            </div>
                            <div className="card-section">
                                <strong>Autor:</strong> {item.author}
                            </div>
                        
                            {/* Renderizado de imágenes mejorado */}
                            <div className="card-section">
                                <strong className="section-label">Imágenes:</strong>
                                <div className="image-gallery">
                                    {item.images?.map((img, idx) => (
                                    <img 
                                        key={idx} 
                                        src={img} 
                                        alt="historia" 
                                        className="card-img"
                                    />
                                ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="card-actions">
                            <button onClick={() => startEdit(item)} className="btn btn-action btn-edit">Editar</button>
                            <button onClick={() => handleDelete(item._id)} className="btn btn-action btn-delete">Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default History;
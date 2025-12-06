import { useEffect, useState } from "react";

import {
    getTouristPlace,
    createTouristPlace,
    updateTouristPlace,
    deleteTouristPlace
} from "../api/touristPlace";

function TouristPlaces() {
    const [items, setItems] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        images: "",
        category: "otro",
        openHours: "",
        price: ""
    });

    const [editId, setEditId] = useState(null);
    const [searchName, setSearchName] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

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

    const startEdit = (item) => {
        setEditId(item._id);
        setFormData({
            name: item.name,
            description: item.description,
            location: item.location,
            images: item.images.join("\n"),
            category: item.category,
            openHours: item.openHours,
            price: item.price
        });
    };

    const cancelEdit = () => {
        setEditId(null);
        setFormData({
            name: "",
            description: "",
            location: "",
            images: "",
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
        try {
            await deleteTouristPlace(id);
            alert("Lugar eliminado");
            loadData();
        } catch (error) {
            console.error("Error eliminando:", error);
            alert("Hubo un error al eliminar el lugar");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            description: formData.description,
            location: formData.location,
            images: formData.images.split("\n").filter(Boolean),
            category: formData.category,
            openHours: formData.openHours,
            price: formData.price
        };

        try {
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
        <div style={{ padding: 20 }}>
            <h1>Lugares Turísticos</h1>

            {/* FORM */}
            <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
                <h2>{editId ? "Editar lugar" : "Agregar lugar"}</h2>

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
                    required
                />
                <br /><br />

                <input
                    type="text"
                    name="location"
                    placeholder="Ubicación"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
                <br /><br />

                <textarea
                    name="images"
                    placeholder="URLs de imágenes (una por línea)"
                    value={formData.images}
                    onChange={handleChange}
                />
                <br /><br />

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
                <br /><br />

                <input
                    type="text"
                    name="openHours"
                    placeholder="Horario"
                    value={formData.openHours}
                    onChange={handleChange}
                />
                <br /><br />

                <input
                    type="text"
                    name="price"
                    placeholder="Precio"
                    value={formData.price}
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
                        Cancelar
                    </button>
                )}
            </form>

            {/* SEARCH */}
            <div style={{ marginBottom: 40 }}>
                <h2>Buscar por nombre</h2>

                <input
                    type="text"
                    placeholder="Escribe el nombre del lugar"
                    value={searchName}
                    onChange={(e) => handleSearchByName(e.target.value)}
                    style={{ width: "300px" }}
                />
            </div>

            {/* LIST */}
            <h2>Lista de lugares turísticos</h2>

            <ul>
                {filteredItems.map((item) => (
                    <li
                        key={item._id}
                        style={{
                            marginBottom: 20,
                            border: "1px solid #ccc",
                            padding: 10
                        }}
                    >
                        <h3>{item.name}</h3>

                        <div><strong>Descripción:</strong> {item.description}</div>
                        <div><strong>Ubicación:</strong> {item.location}</div>
                        <div><strong>Categoría:</strong> {item.category}</div>
                        <div><strong>Horario:</strong> {item.openHours}</div>
                        <div><strong>Precio:</strong> {item.price}</div>

                        <div>
                            <strong>Imágenes:</strong>
                            <ul>
                                {item.images?.map((img, idx) => (
                                    <li key={idx}>
                                        <a href={img} target="_blank" rel="noreferrer">{img}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button onClick={() => startEdit(item)}>Editar</button>
                        <button
                            onClick={() => handleDelete(item._id)}
                            style={{ marginLeft: 10, color: "red" }}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TouristPlaces;

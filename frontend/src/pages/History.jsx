import { useEffect, useState } from "react";

import { getHistory, createHistory, updateHistory, deleteHistory } from "../api/history";

function History(){
    const [items, setItems] = useState([]);
    
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        images: "",
        author: ""
    });

    const [editId, setEditId] = useState(null);
    const [searchName, setSearchName] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);

    const loadData = async () => {
        try {
            const res = await getHistory();
            setItems(res.data.data);
            setFilteredItems(res.data.data);
        } catch (error) {
            console.error("Error cargando historia:", error);
        }
    };

    useEffect(() =>{
        loadData();
    }, []);

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const startEdit = (item) => {
        setEditId(item._id);
        setFormData({
            title: item.title,
            content: item.content,
            images: item.images.join("\n"),
            author: item.author
        });
    };

    const cancelEdit = () =>{
        setEditId(null);
        setFormData({
        title: "",
        content: "",
        images: "",
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
        try {
            await deleteHistory(id);
        } catch (error) {
            console.error("Error eliminando:", error);
            alert("Hubo un error al eliminar dato historico");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title: formData.title,
            content: formData.content,
            images: formData.images.split("\n").filter(Boolean),
            author: formData.author
        };
        try {
            if(editId) {
                await updateHistory(editId, payload);
                alert("Platillo actualizado");
            }
            else {
                await createHistory(payload);
                alert("Platillo guardado");
            }
            cancelEdit();
            loadData();
        } catch (error) {
            console.error("Error guardando:", error);
            alert("Error, revisa consola");
        }
    };

    return (
        <div style={{padding: 20}}>
            <h1>Historia</h1>

            <form onSubmit={handleSubmit} style={{marginBottom: 30}}>
                <h2> {editId ? "Editar historia" : "Agregar historia"} </h2>

                <input
                    type="text"
                    name="title"
                    placeholder="Titulo"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <br /><br />

                <textarea
                    name="content"
                    placeholder="Contenido"
                    value={formData.content}
                    onChange={handleChange}
                    required
                />
                <br /><br />

                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                        setFormData({ ...formData, images: Array.from(e.target.files)})
                     }
                />
                <br /><br />
                
                <input
                    type="text"
                    name="author"
                    placeholder="Autor"
                    value={formData.author}
                    onChange={handleChange}
                    required
                />
                <br /><br />

                <button type="submit">
                     {editId ? "actualizar" : "Guardar"}
                </button>

                {editId && (
                    <button
                        type="button"
                        onClick={cancelEdit}
                        style={{marginLeft: 10}}
                    ></button>
                )}
            </form>
            <div style={{marginBottom: 40}}>
                <h2>Buscar por nombre</h2>

                <input
                    type="text"
                    placeholder="Escribe el nomre del dato historico"
                    value={searchName}
                    onChange={(e) => handleSearchByName(e.target.value)}
                    style={{width: "300px"}}
                />
            </div>

            <h2>Lista de datos historicos</h2>

            <ul>
                {filteredItems.map((item) =>(
                    <li key={item._id} style={{marginBottom: 20, border:"1px solid #ccc", padding: 10}}>
                        <h3>{item.title}</h3>
                        <div>
                            <strong>Acontecimiento</strong> {item.content}
                        </div>
                        <div>
                            <strong>Autor</strong> {item.author}
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

                    </li>
                ))}
            </ul>

        </div>
    );

}

export default History;
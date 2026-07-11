import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const CMS = () => {


  const [id, setId] = useState(null);
  const[idData, setIdData] = useState(null);

//==========MODAL for add woods ===============
  const [show, setModal] = useState(false);

  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);
  //==========MODAL for add woods ===============



  //==========MODAL for delete woods ===============
  const [deleteModalShow, setDeleteModalShow] = useState(false);

  const handleDeleteClose = () => setDeleteModalShow(false);
  const handleShowDelete = (id) => {
    setId(id);
    setDeleteModalShow(true);

  }
  //==========MODAL for delete woods ===============


 //==========MODAL for edit woods ===============
 const[showEdit, setShowEdit] = useState(false);

 const handleEditClose = () => setShowEdit(false);
 const handleShowEdit = (data) => {
    setIdData(data);
    setShowEdit(true);

  };
  //============MODAL for edit woods ===============
  

  const [woods, setWoods] = useState([]);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [origin, setOrigin] = useState("");
  const [color, setColor] = useState("");
  const [density, setDensity] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [description, setDescription] = useState("");
  const [available, setAvailable] = useState(true);

  const [editId, setEditId] = useState(null);

  const API = "https://mywoods-api.onrender.com/api/woods";

  // ================= GET =================
  const fetchWoods = async () => {
    try {
      const response = await fetch(API);
      const result = await response.json();

      console.log(result);

      setWoods(Array.isArray(result) ? result : result.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWoods();
  }, []);

  // ================= CREATE =================
  const addWood = async () => {
    const wood = {
      name,
      type,
      origin,
      color,
      density: Number(density),
      pricePerUnit: Number(pricePerUnit),
      description,
      available,
    };

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wood),
      });

      if (response.ok) {
        alert("Wood Added Successfully");
        clearForm();
        fetchWoods();
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================= UPDATE =================
  const updateWood = async () => {
    const wood = {
      name,
      type,
      origin,
      color,
      density: Number(density),
      pricePerUnit: Number(pricePerUnit),
      description,
      available,
    };

    try {
      const response = await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wood),
      });

      if (response.ok) {
        alert("Updated Successfully");
        setEditId(null);
        clearForm();
        fetchWoods();
      } else {
        alert("Update API not available yet.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE =================
  const deleteWood = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this wood?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Deleted Successfully");
        fetchWoods();
      } else {
        alert("Delete API not available yet.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================= EDIT =================
  const editWood = (wood) => {
    setEditId(wood._id || wood.id);

    setName(wood.name);
    setType(wood.type);
    setOrigin(wood.origin);
    setColor(wood.color);
    setDensity(wood.density);
    setPricePerUnit(wood.pricePerUnit);
    setDescription(wood.description);
    setAvailable(wood.available);
  };

  // ================= CLEAR =================
  const clearForm = () => {
    setName("");
    setType("");
    setOrigin("");
    setColor("");
    setDensity("");
    setPricePerUnit("");
    setDescription("");
    setAvailable(true);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Wood CMS</h2>

      <div style={{ marginBottom: "25px" }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <input
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />

        <input
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <input
          placeholder="Density"
          value={density}
          onChange={(e) => setDensity(e.target.value)}
        />

        <input
          placeholder="Price"
          value={pricePerUnit}
          onChange={(e) => setPricePerUnit(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <br />

        <button onClick={editId ? updateWood : addWood}>
          {editId ? "Update Wood" : "Add Wood"}
        </button>

        <button
          onClick={clearForm}
          style={{ marginLeft: "10px" }}
        >
          Clear
        </button>
      </div>

      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Origin</th>
            <th>Color</th>
            <th>Density</th>
            <th>Price</th>
            <th>Description</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {woods.length > 0 ? (
            woods.map((wood) => (
              <tr key={wood._id || wood.id}>
                <td>{wood.name}</td>
                <td>{wood.type}</td>
                <td>{wood.origin}</td>
                <td>{wood.color}</td>
                <td>{wood.density}</td>
                <td>{wood.pricePerUnit}</td>
                <td>{wood.description}</td>
                <td>{wood.available ? "Yes" : "No"}</td>

                <td>
                  <button onClick={() => editWood(wood)}>
                    Edit
                  </button>

                  <button
                    onClick={() => deleteWood(wood._id || wood.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" align="center">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CMS;
import React, { useState } from "react";
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  
  const [add1, setAdd1] = useState(initialColor); 
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log('colorToEdit', colorToEdit)
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(res =>{ 
      console.log('color list response', res)
    }).catch(err => { 
      console.log('color list error', err)
    })
    updateColors(true); 
    
  };

  const deleteColor = e => {
    e.preventDefault();
    axiosWithAuth()
    .delete(`colors/${colorToEdit.id}`)
    .then(res => { 
      console.log('delete response', res)
    }).catch(err => { 
      console.log('delete error', err);
    })
    updateColors(true);
  };

  const handleSubmit = e => { 
    axiosWithAuth()
    .post(`colors`, add1 )
    .then(res => { 
      console.log('add color response', res)
    }).catch(err => {
      console.log('add color error', err); 
    })
    updateColors(true)
  }

  const handleChange1 = e => { 
    e.preventDefault();
    setAdd1({...add1, [e.target.name]: e.target.value});
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            {/* {setId(color.id)} */}
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
            <button onClick={deleteColor}>Delete</button>
          </div>
        </form>
      )}
      
      
      <form onSubmit={handleSubmit} style={{backgroundColor: `#00b159`, width:`250px`, height: `200px`, display: `flex`, flexDirection: `column`, justifyContent: `space-between` ,alignItems: `center`, paddingBottom: `50px`}}>
        <h2>Add Color</h2>
        <input 
        type="text"
        value={add1.color}
        name="color"
        placeholder="color name"
        onChange={handleChange1}
        />
        <input 
        type="text"
        value={add1.code.hex}
        name="code"
        placeholder="hex code"
        onChange={handleChange1}
        />
        <button style={{backgroundColor:'#4be58f'}}>Add color</button>
      </form>
      <div className="spacer" />
    </div>

    
  );
};

export default ColorList;

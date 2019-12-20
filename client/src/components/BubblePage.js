import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [updateColors, setUpdateColors] = useState(false); 
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => { 
    axiosWithAuth()
    .get('/colors')
    .then(res => { 
      console.log('colors response', res)
      setColorList(res.data)
      setUpdateColors(false)
    })
  },[updateColors])

  return (
    <>
      <ColorList colors={colorList} updateColors={setUpdateColors} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

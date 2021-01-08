import React, {useState} from 'react';
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    iconCell: {
      padding: 0,
      height: 48,
      width: 48
    }
})

const SizeTable = (props) => {
  const [selectedS, setSelectedS] = useState(false);
  const [selectedM, setSelectedM] = useState(false);
  const [selectedL, setSelectedL] = useState(false);
  const ChangedSize = (size) => {
    if(size === "S"){
      setSelectedM(false);
      setSelectedL(false);
      setSelectedS(true);
    } else if(size === "M"){
      setSelectedL(false);
      setSelectedS(false);
      setSelectedM(true);
    } else {
      setSelectedS(false);
      setSelectedM(false);
      setSelectedL(true);
    }
    
    props.addSize(size);
  }
  const classes = useStyles()
  
  
  return (
    <div>      
    
    {props.sizes[0].quantity >0 && (
      <button
        style={{
          background:
            selectedS === true
            ? "#248"
            : "#FFF"
        }}
        onClick={() => ChangedSize(props.sizes[0].size)}
      >{props.sizes[0].size}</button>
    )}
    {props.sizes[1].quantity >0 && (
      <button
        style={{
          background:
            selectedM === true
            ? "#248"
            : "#FFF"
        }}
        onClick={() => ChangedSize(props.sizes[1].size)}
      >{props.sizes[1].size}</button>
    )}
    {props.sizes[2].quantity >0 && (
      <button
        style={{
          background:
            selectedL === true
            ? "#248"
            : "#FFF"
        }}
        onClick={() => ChangedSize(props.sizes[2].size)}
      >{props.sizes[2].size}</button>
    )}


      {/* {props.sizes.map((item, index) => (
        <div>
        {item.quantity > 0 && (
            <button 
              
              onClick={() => ChangedSize(item.size)}>{item.size}</button>
        )}
        </div>
        onClick={() => props.addSize(item.size)}>{item.size}</button>
      ))
      } */}
    </div>
  );
};

export default SizeTable;
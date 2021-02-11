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
import {createStyles} from "@material-ui/core";


// const useStyles = makeStyles((theme) =>
//     createStyles({
//       "iconCell": {
//         padding: 0,
//         height: 40,
//         width: 40
//       },
//       "sizesButton": {
//         border: '2px solid #999',
//         border_radius: 0,
//         background: '#fff',
//         "&:hover": {
//           color: '#999',
//           backgroundColor: '#000'
//         }
//       }
//     })
// )


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
  // const classes = useStyles()
  
  
  return (
    <div>      
    
    {props.sizes[0].quantity >0 && (
      <button
        style={{
          color:
            selectedS === true
            ? "#FFF"
            : "#999",
          border: "1px solid #999",
          width:"2rem",
          height:"2rem",
          marginRight: "1rem",
          border_radius: 0,
          outline: selectedS === true && 0,
          background:
            selectedS === true
            ? "#999"
            : "#FFF"
        }}
        onClick={() => ChangedSize(props.sizes[0].size)}
      >{props.sizes[0].size}</button>
    )}
    {props.sizes[1].quantity >0 && (
      <button
        style={{
          color:
            selectedM === true
            ? "#FFF"
            : "#999",
          border: "1px solid #999",
          width:"2rem",
          height:"2rem",
          marginRight: "1rem",
          border_radius: 0,
          outline: selectedM === true && 0,
          background:
            selectedM === true
            ? "#999"
            : "#FFF"
        }}
        onClick={() => ChangedSize(props.sizes[1].size)}
      >{props.sizes[1].size}</button>
    )}
    {props.sizes[2].quantity >0 && (
      <button
        style={{
          color:
            selectedL === true
            ? "#FFF"
            : "#999",
          border: "1px solid #999",
          width:"2rem",
          height:"2rem",
          marginRight:"1rem",
          border_radius: 0,
          outline: selectedL === true && 0,
          background:
            selectedL === true
            ? "#999"
            : "#FFF"
        }}
        onClick={() => ChangedSize(props.sizes[2].size)}
      >{props.sizes[2].size}</button>
    )}
    </div>
  );
};

export default SizeTable;
import React from 'react';
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
  const classes = useStyles()
  

  return (
    <div>      
      {props.sizes.map((item, index) => (
        <div>
        {item.quantity > 0 && (
            <button onClick={() => props.addProduct(item.size)}>{item.size}</button>
        )}
        </div>
      ))
      }
    </div>
  );
};

export default SizeTable;
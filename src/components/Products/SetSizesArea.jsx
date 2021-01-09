import React, {useCallback, useEffect, useState} from 'react';
import {TextInput} from "../UIkit";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    checkIcon: {
        float: 'right'
    },
    iconCell: {
        padding: 0,
        height: 48,
        width: 48
    }
})

const SetSizesArea = (props) => {
    const classes = useStyles()
		const [quantity, setQuantity] = useState({
			S: 0,
			M: 0,
			L: 0
		});
    const [index, setIndex] = useState(0),
          // [size, setSize] = useState(""),
          [quantityS, setQuantityS] = useState(0),
					[quantityM, setQuantityM] = useState(0),
					[quantityL, setQuantityL] = useState(0);

    // const inputSize = useCallback((event) => {
    //     setSize(event.target.value)
    // }, [setSize]);

    const inputQuantity = useCallback((event) => {
			const target = event.target;
			const value = target.value;
			const name = target.name;
			if(name === "S"){
				setQuantityS(value);
			} else if(name === "M"){
				setQuantityM(value);
			} else {
				setQuantityL(value);
			}    
    }, []);

    const addSize = (quantityS, quantityM, quantityL) => {
			props.setSizes(prevState => [ 
			{size: "S", quantity: quantityS},
			{size: "M", quantity: quantityM},
			{size: "L", quantity: quantityL},
			])
			
			
			// setValues({ ...values, [name]: value });
        // if (size === "" || quantity === 0) {
        //     // Required input is blank
        //     return false
        // } else {
        //     if (index === props.sizes.length) {
        //         props.setSizes(prevState => [...prevState, {size: size, quantity: quantity}]);
        //         // setIndex(index + 1);
        //         setSize("");
        //         setQuantity(0)
        //     } else {
        //         const newSizes = props.sizes;
        //         // newSizes[index] = {size: size, quantity: quantity};
        //         props.setSizes(newSizes);
        //         // setIndex(newSizes.length);
        //         setSize("");
        //         setQuantity(0);
        //     }
        // }
    }

    const editSize = (index, size, quantity) => {
        // setIndex(index)
        // setSize(size)
        setQuantity(quantity)
    }

    const deleteSize = (deleteIndex) => {
        const newSizes = props.sizes.filter((item, index) => index !== deleteIndex)
        // props.setSizes(newSizes);
    }

    useEffect(() => {
        // setIndex(props.sizes.length)
    },[props.sizes.length])

    return (
        <div aria-label="サイズ展開">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Size</TableCell>
                            <TableCell>Quantity</TableCell>
                            {/* <TableCell className={classes.iconCell} />
                            <TableCell className={classes.iconCell} /> */}
                        </TableRow>
                    </TableHead>
                    {/* <TableBody>
                        {props.sizes.length > 0 && (
                            props.sizes.map((item, index) => (
                                <TableRow key={item.size}>
                                    <TableCell component="th" scope="row">{item.size}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell} onClick={() => editSize(index, item.size, item.quantity)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell className={classes.iconCell}>
                                        <IconButton className={classes.iconCell} onClick={() => deleteSize(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody> */}
                </Table>
                <div>
<p>S</p>
                    <TextInput
                        fullWidth={false} label={"Quantity"} multiline={false} required={true}
                        onChange={inputQuantity} rows={1} name="S" value={quantityS} type={"number"}
                    />
<p>M</p>
                    <TextInput
                        fullWidth={false} label={"Quantity"} multiline={false} required={true}
                        onChange={inputQuantity} rows={1} name="M"  value={quantityM} type={"number"}
                    />
<p>L</p>
                    <TextInput
                        fullWidth={false} label={"Quantity"} multiline={false} required={true}
                        onChange={inputQuantity} rows={1} name="L"  value={quantityL} type={"number"}
                    />
                </div>
                <IconButton className={classes.checkIcon} onClick={() => addSize(quantityS, quantityM, quantityL)}>
                    <CheckCircleIcon/>
                </IconButton>
            </TableContainer>
						<p>quantityS{quantityS}</p>
						<p>{quantityM}</p>
						<p>{quantityL}</p>
            <div className="module-spacer--small"/>
        </div>
    );
};

export default SetSizesArea;
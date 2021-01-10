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

const EditSizesArea = (props) => {
    const classes = useStyles()

    const [index, setIndex] = useState(0),
					[editSFlg, setEditSFlg] = useState(false),
					[editMFlg, setEditMFlg] = useState(false),
					[editLFlg, setEditLFlg] = useState(false),
          [size, setSize] = useState(""),
          [quantity, setQuantity] = useState(0),
					[quantityS, setQuantityS] = useState(0),
					[quantityM, setQuantityM] = useState(0),
					[quantityL, setQuantityL] = useState(0);

    const inputSize = useCallback((event) => {
        setSize(event.target.value)
    }, [setSize]);

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
        // setQuantity(event.target.value)
    }, [setQuantity]);

    const addSize = (quantityS, quantityM, quantityL) => {
			if (quantityS === "") {
				setQuantityS(props.sizes[0].quantity);
			} else if (quantityM === "") {
				setQuantityM(props.sizes[1].quantity);
			} else if (quantityL === "") {
				setQuantityL(props.sizes[2].quantity);
			}
			props.setSizes(prevState => [ 
				{size: "S", quantity: quantityS},
				{size: "M", quantity: quantityM},
				{size: "L", quantity: quantityL},
			])
    }

    const editSize = (size) => {
			if(size === "S"){
				setEditSFlg(true);
			} else if(size === "M"){
				setEditMFlg(true);
			} else {
				setEditLFlg(true);
			}  
			
    }
    useEffect(() => {
			setIndex(props.sizes.length)
				
    },[props.sizes.length])
		// console.log("props",props.sizes[0].quantity);
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
                    <TableBody>
										{props.sizes.length > 0 && (
											<div>
											<TableRow>
											<TableCell component="th" scope="row"> S </TableCell>
											{editSFlg ? 
												<TextInput
														fullWidth={false} label={"Quantity"} multiline={false} required={true}
														onChange={inputQuantity} rows={1} name="S" value={quantityS} type={"number"}
												/>
												: 
												<div>
												<TableCell>{props.sizes[0].quantity}</TableCell>
													<TableCell className={classes.iconCell}>
													<IconButton className={classes.iconCell} onClick={() => editSize("S")}>
													<EditIcon />
													</IconButton>
												</TableCell>
												</div>
											}
											</TableRow>
											<TableRow>
												<TableCell component="th" scope="row"> M </TableCell>
												{editMFlg ? 
													<TextInput
															fullWidth={false} label={"Quantity"} multiline={false} required={true}
															onChange={inputQuantity} rows={1} name="M" value={quantityM} type={"number"}
													/>
													: 
													<div>
													<TableCell>{props.sizes[1].quantity}</TableCell>
														<TableCell className={classes.iconCell}>
														<IconButton className={classes.iconCell} onClick={() => editSize("M")}>
														<EditIcon />
														</IconButton>
													</TableCell>
													</div>
												}
											</TableRow>
											<TableRow>
												<TableCell component="th" scope="row"> L </TableCell>
												{editLFlg ? 
													<TextInput
															fullWidth={false} label={"Quantity"} multiline={false} required={true}
															onChange={inputQuantity} rows={1} name="L" value={quantityL} type={"number"}
													/>
													: 
													<div>
													<TableCell>{props.sizes[2].quantity}</TableCell>
														<TableCell className={classes.iconCell}>
														<IconButton className={classes.iconCell} onClick={() => editSize("L")}>
														<EditIcon />
														</IconButton>
													</TableCell>
													</div>
												}
											</TableRow>
											</div>
										)}



                        {/* {props.sizes.length > 0 && (
                            props.sizes.map((item, index) => (
                                <TableRow key={item.size}>
                                    <TableCell component="th" scope="row">{item.size}</TableCell>
																		{editFlg ? 
																			<input name="S" onChange={inputQuantity} value="" type={"number"} />
																			 : <TableCell>{item.quantity}</TableCell>
																		}
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
                        )} */}
                    </TableBody>
                </Table>
                <div>
                </div>
                <IconButton className={classes.checkIcon} onClick={() => addSize(quantityS, quantityM, quantityL)}>
                    <CheckCircleIcon/>
                </IconButton>
            </TableContainer>
            <div className="module-spacer--small"/>
        </div>
    );
};

export default EditSizesArea;
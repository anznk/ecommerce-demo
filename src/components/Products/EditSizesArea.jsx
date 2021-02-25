import React, {useCallback, useState} from 'react';
import {TextInput} from "../UIkit";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import DeleteIcon from '@material-ui/icons/Delete';
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
	let orgS, orgM, orgL;
	if(props.sizes.length > 0){
		orgS = props.sizes[0].quantity;
		orgM = props.sizes[1].quantity;
		orgL = props.sizes[2].quantity;
	}	
	const classes = useStyles()
	// const [index, setIndex] = useState(0),
	const	[editSFlg, setEditSFlg] = useState(false),
				[editMFlg, setEditMFlg] = useState(false),
				[editLFlg, setEditLFlg] = useState(false),
				// [size, setSize] = useState(""),
				// [quantity, setQuantity] = useState(0),
				[quantityS, setQuantityS] = useState(orgS),
				[quantityM, setQuantityM] = useState(orgM),
				[quantityL, setQuantityL] = useState(orgL);

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
			// setQuantity(event.target.value)
	}, []);

	const addSize = (quantityS, quantityM, quantityL) => {
		if(props.sizes.length > 0){
			orgS = props.sizes[0].quantity;
			orgM = props.sizes[1].quantity;
			orgL = props.sizes[2].quantity;
		}
		setEditSFlg(false);
		setEditMFlg(false);
		setEditLFlg(false);
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
    // useEffect(() => {
		// 	setIndex(props.sizes.length)
    // },[props.sizes.length])

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
							{props.sizes.length > 0 && (
								<TableBody>
								<TableRow>
								<TableCell component="th" scope="row"> S </TableCell>
								{editSFlg ? 
									<TextInput
										fullWidth={false} label={"Quantity"} multiline={false} required={true}
										onChange={inputQuantity} rows={1} name="S" value={quantityS} type={"number"}
									/>
									: 
									<div>
									<TableCell>{orgS}</TableCell>
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
										<TableCell>{orgM}</TableCell>
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
										<TableCell>{orgL}</TableCell>
											<TableCell className={classes.iconCell}>
											<IconButton className={classes.iconCell} onClick={() => editSize("L")}>
											<EditIcon />
											</IconButton>
										</TableCell>
										</div>
									}
								</TableRow>
								</TableBody>
							)}
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
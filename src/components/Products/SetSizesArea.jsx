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
          [quantityS, setQuantityS] = useState(0),
					[quantityM, setQuantityM] = useState(0),
					[quantityL, setQuantityL] = useState(0);

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
    }

    return (
			<div aria-label="Size">
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Size</TableCell>
								<TableCell>Quantity</TableCell>
							</TableRow>
						</TableHead>
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
				<div className="module-spacer--small"/>
			</div>
    );
};

export default SetSizesArea;
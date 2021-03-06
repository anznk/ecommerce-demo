import React from 'react';
import {push} from "connected-react-router"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import NoImage from '../../assets/img/src/no_image.png'
import {useDispatch, useSelector} from "react-redux";
import {getUserRole} from "../../reducks/users/selectors";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {deleteProduct} from "../../reducks/products/operations";
import '../../assets/styles/productCard.scss';

const ProductCard = (props) => {
    
    const dispatch = useDispatch()
    const selector = useSelector(state => state);
    const userRole = getUserRole(selector)
    const isAdministrator = (userRole === "administrator");

    const images = (props.images.length > 0) ? props.images : [NoImage]
    const price = props.price.toLocaleString();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
			<Card className="productCard">
					<CardMedia
							className= "media"
							image={images[0].path}
							onClick={() => dispatch(push('/product/'+props.id))}
							title=""
					/>
					<CardContent className="content">
							<div onClick={() => dispatch(push('/product/'+props.id))}>
									<Typography className="productName" color="textSecondary" component="p">
											{props.name}
									</Typography>
									<Typography className="price" component="p">
											${price}
									</Typography>
							</div>
							{isAdministrator && (
								<>
									<IconButton className= "icon" onClick={handleClick}>
										<MoreVertIcon />
									</IconButton>
									<Menu
										id="menu-appbar"
										anchorEl={anchorEl}
										keepMounted
										open={Boolean(anchorEl)}
										onClose={handleClose}
									>
										<MenuItem
												onClick={() => {
														dispatch(push('/product/edit/'+props.id))
														handleClose()
												}}
										>
											Edit
										</MenuItem>
										<MenuItem
												onClick={() => {
														dispatch(deleteProduct(props.id))
														handleClose()
												}}
										>
											Delete
										</MenuItem>
								</Menu>
							</>
						)}
					</CardContent>
			</Card>
    );
}

export default ProductCard

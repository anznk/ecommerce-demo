import {isValidEmailFormat, isValidRequiredInput} from "../../function/common";
import {auth, db, FirebaseTimestamp} from "../../firebase/index"
import {push, goBack} from 'connected-react-router'
import {
    signOutAction,
    signInAction,
    editProfileStateAction,
    fetchProductsInCartAction, fetchOrdersHistoryAction,
} from "./actions";
import {hideLoadingAction, showLoadingAction} from "../loading/actions";
import {initProductsAction} from "../products/actions";

const usersRef = db.collection('users')

export const addProductToCart = (addedProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const cartRef = usersRef.doc(uid).collection('cart').doc();
    addedProduct['cartId'] = cartRef.id;
    await cartRef.set(addedProduct);
    dispatch(push('/cart'))
  }
}

export const fetchProductsInCart = (products) => {
  return async (dispatch) => {
    dispatch(fetchProductsInCartAction(products))
  }
}


export const fetchOrdersHistory = () => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const list = []

        usersRef.doc(uid).collection('orders')
            .orderBy('updated_at', "desc").get()
            .then(snapshots => {
                snapshots.forEach(snapshot => {
                    const data = snapshot.data();
                    list.push(data)
                });
                dispatch(fetchOrdersHistoryAction(list))
            })
    }
}


export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    // Validations
    if(!isValidRequiredInput(username, email, password, confirmPassword)) {
      alert('This field is required');
      return false
    }

    if(!isValidEmailFormat(email)) {
      alert('invalid email address')
      return false
    }
    if (password !== confirmPassword) {
      alert("Password doesn't match")
      return false
    }
    if (password.length < 6) {
      alert('password must be at least 6 characters long')
      return false
    }
    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        dispatch(showLoadingAction("Sign up..."))
        const user = result.user;
        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            customer_id: "",
            created_at: timestamp,
            email: email,
            role: "customer",
            payment_method_id: "",
            uid: uid,
            updated_at: timestamp,
            username: username
          };

          usersRef.doc(uid).set(userInitialData).then(async () => {
            dispatch(push('/'))
            dispatch(hideLoadingAction())
          })
        }
      }).catch((error) => {
        dispatch(hideLoadingAction())
        alert('Sorry.... Failed to register. Try again.')
        throw new Error(error)
      })
  }
}

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        usersRef.doc(user.uid).get()
          .then(snapshot => {
            const data = snapshot.data()
            if (!data) {
                throw new Error('user not found')
            }

            // Update logged in user state
            dispatch(signInAction({
                customer_id: (data.customer_id) ? data.customer_id : "",
                email: data.email,
                isSignedIn: true,
                payment_method_id: (data.payment_method_id) ? data.payment_method_id : "",
                role: data.role,
                uid: user.uid,
                username: data.username,
            }))
          })
      } else {
        dispatch(push('/signin'))
      }
    })
  }
};

export const signIn = (email, password) => {
    return async (dispatch) => {
        dispatch(showLoadingAction("Sign in..."));
        if (!isValidRequiredInput(email, password)) {
            dispatch(hideLoadingAction());
            alert('This field is required')
            return false
        }
        if (!isValidEmailFormat(email)) {
            dispatch(hideLoadingAction());
            alert('Invalid email address')
            return false
        }
        return auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const userState = result.user
                if (!userState) {
                    dispatch(hideLoadingAction());
                    throw new Error("Couldn't get user ID");
                }
                const userId = userState.uid;

                return usersRef.doc(userId).get().then(snapshot => {
                    const data = snapshot.data();
                    if (!data) {
                        dispatch(hideLoadingAction());
                        throw new Error("Couldn't find user ID");
                    }

                    dispatch(signInAction({
                        customer_id: (data.customer_id) ? data.customer_id : "",
                        email: data.email,
                        isSignedIn: true,
                        role: data.role,
                        payment_method_id: (data.payment_method_id) ? data.payment_method_id : "",
                        uid: userId,
                        username: data.username,
                    }));

                    dispatch(hideLoadingAction());
                    dispatch(push('/'))
                })
            }).catch(() => {
                dispatch(hideLoadingAction());
            });
    }
};

export const resetPassword = (email) => {
    return async (dispatch) => {
        if (!isValidEmailFormat(email)) {
            alert('Invalid email address')
            return false
        } else {
            return auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('Please check email address')
                    dispatch(push('/signin'))
                }).catch(() => {
                    alert('Invalid email address')
                })
        }
    }
}

export const signOut = () => {
    return async (dispatch, getState) => {
        dispatch(showLoadingAction("Sign out..."));
        const uid = getState().users.uid

        // Delete products from the user's cart
        await usersRef.doc(uid).collection('cart').get()
            .then(snapshots => {
                snapshots.forEach(snapshot => {
                    usersRef.doc(uid).collection('cart').doc(snapshot.id).delete()
                })
            });

        // Sign out with Firebase Authentication
        auth.signOut().then(() => {
            dispatch(signOutAction());
            dispatch(initProductsAction())
            dispatch(hideLoadingAction());
            dispatch(push('/signin'));
        }).catch(() => {
            dispatch(hideLoadingAction());
            throw new Error('Failed to logout')
        })
    }
};
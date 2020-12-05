import {isValidEmailFormat, isValidRequiredInput} from "../../function/common";
import {auth, db, FirebaseTimestamp} from "../../firebase/index"
import {push, goBack} from 'connected-react-router'


const usersRef = db.collection('users')

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    // Validations
    if(!isValidRequiredInput(username, email, password, confirmPassword)) {
        alert('必須項目が未入力です。');
        return false
    }

    if(!isValidEmailFormat(email)) {
        alert('メールアドレスの形式が不正です。もう1度お試しください。')
        return false
    }
    if (password !== confirmPassword) {
        alert('パスワードが一致しません。もう1度お試しください。')
        return false
    }
    if (password.length < 6) {
        alert('パスワードは6文字以上で入力してください。')
        return false
    }
    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        // dispatch(showLoadingAction("Sign up..."))
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
            // dispatch(hideLoadingAction())
          })
        }
      })
  }
}
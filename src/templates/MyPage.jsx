import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {SecondaryButton, TextDetail} from "../components/UIkit";
import {getUsername} from "../reducks/users/selectors";
import {push} from "connected-react-router";
import "../assets/styles/mypage.scss"

const UserMyPage = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const username = getUsername(selector);

  const transition = useCallback((path) => {
    dispatch(push(path))
  }, []);

  return (
    <section className="c-section-container mypage">
      <h2 className="u-text-center">Account</h2>
      <div className="module-spacer--medium" />
      <TextDetail label="User Name" value={username} />
      <div className="module-spacer--small" />
      <div className="center">
        <button className="button" onClick={() => transition('/user/payment/edit')} >Edit your payment method</button>
        <button className="button" onClick={() => transition('/order/history')} >Order history</button>
        {/* <SecondaryButton label={"Edit your payment method"} onClick={() => transition('/user/payment/edit')} /> */}
        {/* <SecondaryButton label={"Order history"} onClick={() => transition('/order/history')}/> */}
      </div>
    </section>
  );
};

export default UserMyPage;
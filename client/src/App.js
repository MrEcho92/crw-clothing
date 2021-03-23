import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { GlobalStyle } from "./global.styles";

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  // unsubscribeFromAuth = null;
  // componentDidMount() {
  //   const { checkUserSession } = this.props;
  //   checkUserSession();
  //   // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
  //   //   if (userAuth) {
  //   //     const userRef = await createUserProfileDocument(userAuth);
  //   //     userRef.onSnapshot((snapShot) => {
  //   //       setCurrentUser({
  //   //         id: snapShot.id,
  //   //         ...snapShot.data(),
  //   //       });
  //   //     });
  //   //   }
  //   //   setCurrentUser(userAuth);
  //   // });
  // }
  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }

  return (
    <div>
      <GlobalStyle />
      <Header></Header>
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner></Spinner>}>
            <Route exact path="/" component={HomePage} />

            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckoutPage} />
            <Route
              exact
              path="/signin"
              render={() =>
                currentUser ? (
                  <Redirect to="/"></Redirect>
                ) : (
                  <SignInAndSignUpPage></SignInAndSignUpPage>
                )
              }
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

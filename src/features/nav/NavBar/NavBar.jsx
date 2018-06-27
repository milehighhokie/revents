import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu, Container, Button } from 'semantic-ui-react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import SignedOutMenu from '../Menus/SignedOutMenu'
import SignedInMenu from '../Menus/SignedInMenu'
import { openModal } from '../../modals/modalActions'
import { withFirebase } from 'react-redux-firebase'

const actions ={
  openModal
}

const mapState = (state) => ({
  auth: state.firebase.auth
})

 class NavBar extends Component {
   handleSignedIn = () => {
    this.props.openModal('LoginModal')
   }

   handleRegister = () => {
    this.props.openModal('RegisterModal')
   }

   handleSignedOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/')
   }


  render() {
    const {auth} = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item header as={ Link } to ='/'>
            <img src="/assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={ NavLink } to ='/events' name="Events" />
          <Menu.Item as={ NavLink } to ='/test' name="Test" />
          { authenticated && <Menu.Item as={ NavLink } to ='/people' name="People" />}
          { authenticated && <Menu.Item>
            <Button as={Link} to='/createEvent' floated="right" positive inverted content="Create Event" />
          </Menu.Item> }
          {authenticated ? <SignedInMenu auth={auth} signOut={this.handleSignedOut}/> : 
                           <SignedOutMenu signIn={this.handleSignedIn} register={this.handleRegister} />}
        </Container>
      </Menu>
    )
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavBar)));
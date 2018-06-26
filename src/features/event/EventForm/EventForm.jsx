/*global google*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import cuid  from 'cuid';
import { reduxForm, Field } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import { isRequired, combineValidators, composeValidators, hasLengthGreaterThan } from 'revalidate';
import moment from 'moment';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Script from 'react-load-script';

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event
  }
}
const actions = {
  createEvent,
  updateEvent
}

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators ({
  title: isRequired({message: 'Thie event title is required'}),
  category: isRequired({message: 'Please select a category'}),
  description: composeValidators(
    isRequired({message: 'Please enter a description'}),
    hasLengthGreaterThan(4)({message: 'The description must be at least 5 characters long'})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
})

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
    .then(results => getLatLng(results[0]))
    .then(latlng => {
      this.setState({
              cityLatLng: latlng
      });
    })
    .then(() => {
      this.props.change('city', selectedCity)
    })
  }
  
  handleVenueSelect = (selectedVenue) => {
    geocodeByAddress(selectedVenue)
    .then(results => getLatLng(results[0]))
    .then(latlng => {
      this.setState({
          venueLatLng: latlng
      });
    })
    .then(() => {
      this.props.change('venue', selectedVenue)
    })
  }

  onFormSubmit = values => {
    values.date = moment(values.date).format();
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Bob'
      }
      this.props.createEvent(newEvent);
      this.props.history.push('/events');
    }
  };

  render() {
    const {invalid, submitting, pristine} = this.props;
    return (
      <Grid>
        <Script
        url='https://maps.googleapis.com/maps/api/js?key=AIzaSyDk0X4cNWC9P3ynei84lUuDvpgW9Tn-sZU&libraries=places'
        onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
        <Segment>
          <Header sub color='teal' content='Event Details'/>
        <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
        <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                type="text"
                options={category}
                component={SelectInput}
                placeholder="What is your event about"
              />
              <Field
                name="description"
                type="text"
                component={TextArea}
                rows={3}
                placeholder="Tell us about your event"
              />
        <Header sub color='teal' content='Event Location Details'/>
        <Field name='city' type='text' component={PlaceInput} 
               options={{types: ['(cities)']}}
               placeholder='City where event is taking place'
               onSelect={this.handleCitySelect}
        />
        {this.state.scriptLoaded &&
        <Field name='venue' type='text' 
                       options={{
                        location: new google.maps.LatLng(this.state.cityLatLng),
                        radius: 1000,
                        types: ['establishment']
                        }}
                        component={PlaceInput} 
                       placeholder='Venue for your event'
                       onSelect={this.handleVenueSelect}
                       />
        }
        <Header sub color='teal' content='Event Date'/>
        <Field name='date' type='text' component={DateInput} dateFormat="YYYY-MM-DD HH:mm" timeFormat='HH:mm' showTimeSelect placeholder="Date of your event"/>
          <Button disabled={invalid || submitting || pristine} positive type="submit">
            Submit
          </Button>
          <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
        </Form>
      </Segment>
        </Grid.Column>
      </Grid>

    );
  }
}

export default connect(mapState, actions)(reduxForm({form: 'eventForm', enableReinitialize: true, validate})(EventForm));

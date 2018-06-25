import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Segment, Icon } from 'semantic-ui-react'


const EventDetailedMap = ({lat, lng}) => {
    const center = [lat, lng];
    const zoom = 14;
    const Marker = () => <Icon name='marker' size='big' color ='red'/>

  return (
    <Segment attached='bottom' style={{padding: 0}}>
        <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyBp6UPKkbcqALY79hsbXYFrmK_YnZSuHjM' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <Marker
            lat={lat}
            lng={lng}
          />
        </GoogleMapReact>
      </div>
    </Segment>
  )
}

export default EventDetailedMap
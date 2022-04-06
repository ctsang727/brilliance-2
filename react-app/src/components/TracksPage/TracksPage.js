import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as trackActions from '../../store/track'; 
import * as annoActions from '../../store/annotation'

const TracksPage = () => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(trackActions.getAllTracksThunk());
        dispatch(annoActions.getAnnoThunk());
    }, [dispatch])

    const tracksObj = useSelector(state => state.track)
    const tracks = Object.values(tracksObj);

    return(
        <ul>
          {tracks?.map(({id, lyrics, title, artist, userId, album_image}) => {
              return(
                  <li key={id}>
                    <NavLink to={{pathname: `/tracks/${id}`, state: {id, lyrics, title, artist, userId, album_image}}}>
                        {title}
                    </NavLink>
                  </li>
              )
          })}
        </ul>
    )
}

export default TracksPage
import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as trackActions from '../../store/track'; 

import './HomePage.css';

const HomePage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(trackActions.getAllTracksThunk());
    })();
}, [dispatch])

  const tracksObj = useSelector(state => state.track)
  const tracks = Object.values(tracksObj);





  return (
    <div className='main-page'>

      <div id='topTracks'>
        <h1 className='main-headers'>Charts</h1>
        <p className='main-headers'>Trending on Brilliance</p>

        <div id='typeOfTracks'>

        </div>

        <div id='track-cont'>
        {tracks?.map(({id, lyrics, title, artist, userId, album_image}) => {
          if(!album_image) album_image = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9398c530-d0a7-4c46-99b4-423a6aabf39f/d3kxnbe-f16dabfb-0cf1-436c-9315-915fbe462f23.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzkzOThjNTMwLWQwYTctNGM0Ni05OWI0LTQyM2E2YWFiZjM5ZlwvZDNreG5iZS1mMTZkYWJmYi0wY2YxLTQzNmMtOTMxNS05MTVmYmU0NjJmMjMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Gk0TAQTWUZBrHFjRC0y7pMEEdep95g7p6upVZNpXaZg'
          return(
            <NavLink key={id} to={{pathname: `/tracks/${id}`, state: {id, lyrics, title, artist, userId, album_image}}}>
              <div className='single-track-list'>
                <div className='track-id'><img alt='' src={album_image} /></div>
                <div className='track-title'>{title}</div>
                <div className='track-artist'>{artist}</div>
                <div className='track-likes'>🔥</div>
              </div>
            </NavLink>
          )
          })}
        </div>

      </div>

    </div>
    
  )

}


export default HomePage
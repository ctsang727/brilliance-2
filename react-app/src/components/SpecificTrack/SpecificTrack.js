import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import * as trackActions from '../../store/track';
import EditTrackForm from '../EditTrack/EditTrack';
import '../SpecificTrack/specificTrack.css'


const SpecificTrack = () => {

    const dispatch = useDispatch();
    const {trackId} = useParams()


    useEffect(() => {
      dispatch(trackActions.getAllTracksThunk());
  }, [dispatch]);

    const tracksObj = useSelector(state => state.track)
    const tracks = Object.values(tracksObj);

    const [editTrackForm, showEditTrackForm] = useState(false)

    const location = useLocation()
    const history = useHistory()


    const openForm = () => {
        if (editTrackForm) return;
        showEditTrackForm(true);
      };

    const handleDelete = (e) => {
        e.preventDefault()

        dispatch(trackActions.deleteTrackThunk(trackId));
        history.push('/tracks')
    }



    return(
        <>
        <div>
          <div className="header">
              <img src={location.state.album_image}></img>
              <h1>
                {location.state.title}
              </h1>
              <p>
                {location.state.artist}
              </p>
          </div>

          <div className="songPage">
            <p className='lyricTitle'>{location.state.title} lyrics</p>
            <p className='lyrics'>{location.state.lyrics}</p>


          </div>

          <div className='annotationsRight'>

          </div>

          <button type='submit' onClick={(openForm)}>Edit</button>
          {editTrackForm && (<EditTrackForm/>)}
          <button type='submit' onClick={handleDelete}>Delete</button>

          <div className='comments'>
          <h1>Comments</h1>

          </div>
        </div>
        </>

    )
}

export default SpecificTrack

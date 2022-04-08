import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as trackActions from '../../store/track';
import EditTrackForm from '../EditTrack/EditTrack';
import AnnoForm from '../AnnoForm/AnnoForm';
import Votes from '../Votes/index'
import '../SpecificTrack/specificTrack.css'

const SpecificTrack = () => {

  const dispatch = useDispatch();
  const { trackId } = useParams()

  useEffect(() => {
    (async() => {
      await dispatch(trackActions.getTrackThunk(trackId));
    })();
  }, [dispatch, trackId]);

  const tracksObj = useSelector(state => state.track)
  const track = Object.values(tracksObj)[0]

  useEffect(() => {
    dispatch(trackActions.getTrackThunk(trackId))
    dispatch(trackActions.getVoteThunk())
  }, [dispatch, trackId,]);


  const commentsObj = track?.comments

  const [editTrackForm, showEditTrackForm] = useState(false)
  const [annotationForm, setAnnotationForm] = useState(false)

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

  const handleMouseUp = () => {
    // console.log(`${window.getSelection().toString()}`)
    let strObj = window.getSelection()
    // let paras = document.getElementsByTagName('p')[0]
    // let rect = strObj.getBoundingClientRect()
    let initialIndex = strObj.anchorOffset
    let finalIndex = strObj.focusOffset
    console.log('ind2', finalIndex)
    console.log('ind1', initialIndex)
    let newHTML = `<span key=${track.annotations.length + 1}>${strObj.toString()}</span>`
    console.log('html', newHTML)
    console.log('strObj', strObj)
    // console.log(rect)
    let lyricArr = track.lyrics.split('')
    lyricArr.splice(initialIndex, finalIndex - initialIndex, newHTML).join('')
    console.log('Arr', lyricArr)
    const highlightedLyrics = lyricArr.join('')
    console.log('hiiiii', highlightedLyrics)
    console.log('lyrics', track.lyrics)
    setAnnotationForm(true)
    // return highlightedLyrics
  }

  

  return (
    <>
      <div>
        <div className="header">
          <div className='image-box'>
            <img alt='' src={track?.album_image}></img>
          </div>
          <h1>
            {track?.title}
          </h1>
          <p>
            {track?.artist}
          </p>
        </div>

        <div className="songPage">
          <p className='lyricTitle'>{track?.title} lyrics</p>
          <p className='lyrics' onMouseUp={handleMouseUp}>
            {annotationForm ? (<AnnoForm track={track} />) : null}
            {track?.lyrics}
            {/* {highlightedLyrics} */}
          </p>


        </div>

        <div className='annotationsRight'>
        
        </div>

        <div className='comments'>
          <h1>Comments</h1>
          {commentsObj?.map(comment => (
            <div>
              <p>{comment.content}</p>
              <p>{comment.vote_score}</p>
              <Votes comment_id={comment.id}/>
            </div>
          ))}

        <button type='submit' onClick={(openForm)}>Edit Track</button>
        {editTrackForm && (<EditTrackForm />)}
        <button type='submit' onClick={handleDelete}>Delete Track</button>
        </div>
      </div>
    </>

  )
}

export default SpecificTrack

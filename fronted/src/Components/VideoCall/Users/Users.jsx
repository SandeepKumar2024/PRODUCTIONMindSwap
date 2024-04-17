import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Users.css'
import { BASE_URL } from "./../../../link"
import axios from "axios"
import Peer from "peerjs"
import Features from '../Features/Features'
function Users() {
  const value = useParams();
  const roomId = value.id;

  const [peerId, setPeerId] = useState('');
  const [remotePeerId, setRemotePeerId] = useState('')
  const remoteVideoRef = useRef(null);;
  const localVideoRef = useRef(null);;
  const peerInstance = useRef(null);;
  console.log("PeerID is : ", peerId)

  // Function to handle video on/off
  const toggleVideo = () => {
    const localStream = localVideoRef.current.srcObject;
    const tracks = localStream.getVideoTracks();

    tracks.forEach(track => {
      track.enabled = !track.enabled; // Toggle video track state
    });
  };

  // Function to handle mute/unmute
  const toggleAudio = () => {
    const localStream = localVideoRef.current.srcObject;
    const tracks = localStream.getAudioTracks();

    tracks.forEach(track => {
      track.enabled = !track.enabled; // Toggle audio track state
    });
  };

  // Function to handle ending the call
  const endCall = () => {
    const localStream = localVideoRef.current.srcObject;
    const tracks = localStream.getTracks();

    tracks.forEach(track => {
      track.stop(); // Stop all tracks
    });

    // Close peer connection
    peerInstance.current.destroy();

    // Reset video and audio sources
    localVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;
  };




  useEffect(() => {
    const peer = new Peer();

    const handleOpen = (id) => {
      setPeerId(id);
      // Now you have the peer ID, you can store it in the database
      axios.post(`/api/create-peer/${roomId}`, { peerId: id })
        .then(response => {
          console.log('PeerId stored successfully:', response.data);
        })
        .catch(error => {
          console.error('Error storing peerId:', error);
        });
    };

    peer.on('open', handleOpen);

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          localVideoRef.current.srcObject = mediaStream;
          localVideoRef.current.play();
          call.answer(mediaStream);
          call.on('stream', (remoteStream) => {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          });
        })
        .catch((error) => {
          console.error('Error accessing media devices:', error);
        });
    });

    peerInstance.current = peer;

    // Clean up function to remove the event listener when the component unmounts
    return () => {
      peer.off('open', handleOpen);
    };
  }, []);



  useEffect(() => {
    try {
      const fetchPeer = async () => {
        const res = await axios.get(`/api/get-peer/${roomId}`);
        if (res.data) {
          setRemotePeerId(res.data.peerId)

        }
      }
      fetchPeer();

    } catch (error) {
      console.log("error getting peer", error);

    }
  }, [])



  // ----------------------------------
  const call = (remotePeerId) => {
    console.log("I am calling ")
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        localVideoRef.current.srcObject = mediaStream;
        localVideoRef.current.play();
        const call = peerInstance.current.call(remotePeerId, mediaStream);
        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });
  }

  return (
    <>

      <div id="user-container">
        <div className="user1">
          {/* <img src="/public/Images/profile.png" alt="" /> */}
          <video ref={localVideoRef} autoPlay muted></video>
          <h4>Pravu Ram</h4>
        </div>

        <div className="user2">
          {/* <img src="/public/Images/profile.png" alt="" /> */}
          <video ref={remoteVideoRef} autoPlay></video>
          <h4>Maa Sita</h4>
        </div>
      </div>
      <div className="call-button">
        <button onClick={() => call(remotePeerId)}>Call</button>
      </div>
      <Features toggleVideo={toggleVideo} toggleAudio={toggleAudio} endCall={endCall} />
    </>
  )

}

export default Users

import Features from '../../Components/VideoCall/Features/Features'
import Whiteboard from '../../Components/VideoCall/Whiteboard/Whiteboard'
import './VideoCallPage.css'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import Peer from "peerjs"
import { useSelector } from "react-redux"
import socket from '../Socket Connection/Socket'
import Waiting from '../../Components/VideoCall/Waiting Animation/Waiting'
import Container from '../../Components/VideoCall/Whiteboard/Container/Container'



const VideoCallPage = () => {

  const [remoteName, setRemoteName] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const userId = useSelector((state) => state.auth.userId || null);

  //Socket connection Established
  useEffect(() => {
    socket.emit("new-user-add", userId);
  }, [userId]);

  const value = useParams();
  const roomId = value.id;
  const [peerId, setPeerId] = useState('');
  const [remotePeerId, setRemotePeerId] = useState('')
  const remoteVideoRef = useRef(null);;
  const localVideoRef = useRef(null);;
  const peerInstance = useRef(null);;
  const [localName, setLocalName] = useState([])
  const [isCall, setIsCall] = useState(false)


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

  const call = (remotePeerId) => {
    setIsCall(!isCall)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        localVideoRef.current.srcObject = mediaStream;
        localVideoRef.current.play();
        const call = peerInstance.current.call(remotePeerId, mediaStream);
        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });

        savedHistory();
      })


      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });






  }

  //for disabling refresh and inspect
  useEffect(() => {
    // Prevent page refresh
    const preventRefresh = (e) => {
      const message = 'You may lost your connection after refreshing the page !';
      e.preventDefault();
      e.returnValue = message;
      return message;
    };
    window.addEventListener('beforeunload', preventRefresh);

    // Prevent opening Developer Tools
    const preventDevTools = (e) => {
      if ((e.ctrlKey && e.shiftKey && e.keyCode === 73) || (e.metaKey && e.altKey && e.keyCode === 73)) { // Ctrl+Shift+I or Cmd+Alt+I
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', preventDevTools);

    
 
    // Prevent refresh on F5 key press
    const preventF5Refresh = (e) => {
      if ((e.which || e.keyCode) === 116) { // F5 key code
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', preventF5Refresh);
    // Prevent right-click
    const preventRightClick = (e) => {
      e.preventDefault();
    };
    window.addEventListener('contextmenu', preventRightClick);


    // Prevent refresh when navigating away from the page
    const preventUnloadRefresh = (e) => {
      e.preventDefault();
    };
    window.addEventListener('unload', preventUnloadRefresh);

    // Prevent F12 key
    const preventF12Key = (e) => {
      if (e.keyCode === 123) { // F12 key code
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', preventF12Key);

    return () => {
      window.removeEventListener('beforeunload', preventRefresh);
      window.removeEventListener('contextmenu', preventRightClick);
      window.removeEventListener('keydown', preventDevTools);
      window.removeEventListener('keydown', preventF5Refresh);
      window.removeEventListener('unload', preventUnloadRefresh);
      window.removeEventListener('keydown', preventF12Key);
    };
  }, []);


  //user name display in video call 
  const [user, setUser] = useState({})
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const res = await axios.get(`/api/get-user-info/${roomId}`);
        if (res.data) {
          setUser(res.data)
        }

      } catch (error) {
        console.log("error getting user name", error);

      }
    }
    fetchUserName();
  }, [roomId, remoteName]);



  //local user info
  const fetchData = async (id) => {
    try {
      const res = await axios.get(`/api/user/get/${id}`)

      if (res.data) {
        setLocalName(res.data)
      }
    } catch (error) {
      console.log("error getting user name", error);
    }


  }
  //remote user info
  const fetchDataRemote = async (id) => {
    try {
      const res = await axios.get(`/api/user/get/${id}`)

      if (res.data) {
        setRemoteName(res.data)
      }
    } catch (error) {
      console.log("error getting user name", error);
    }


  }

  const objectUser = Object.values(user)
  //filter reciver id from localName property where userid isnot equal to localName
  const filterReciverId = (userId) => {
    return objectUser.filter((item) => {
      return item !== userId;
    })
  }


  useEffect(() => {
    fetchData(userId)
  }, [userId])

  useEffect(() => {

    fetchDataRemote(filterReciverId(userId))

  }, [filterReciverId(userId)])




  const initiateTime = () => {
    setStartTime(new Date())

  }

  const endCallTimer = async () => {
    const data = {
      userId: remoteName?._id,
      startTime: startTime,
    }
    await axios.post(`/api/create/analytics`, data);
  }
  window.addEventListener('beforeunload', endCallTimer);
  const savedHistory = () => {
    const data = {
      acceptId: remoteName._id,
      senderId: userId,
    }
    axios.post(`/api/history`, data);
  }


  return (
    <>
      {userId === user.reciever ? "" : !isCall && <div className="call-button">
        <div id='Call-BTN'>
          {remoteName && remoteName._id ? <button onClick={() => { call(remotePeerId); initiateTime(); }}>Let's Start &#8594;</button> : <Waiting />}
        </div>
      </div>}

      <div id="v-container">
        <div id="v-top">
          <div id="v-top-left">

            <div id="logo">
              <h1>
                MindSwap
              </h1>
            </div>
            <div id="user-container">
              <div className="user1">

                <video ref={localVideoRef} autoPlay muted></video>
                <h5>{localName.name}(You)</h5>
              </div>
              <div className="user2">

                <video ref={remoteVideoRef} autoPlay ></video>
                <h5>{remoteName.name}</h5>


              </div>
            </div>


          </div>
          <div id="v-top-right">
            {/* <Whiteboard /> */}
            <Container />
          </div>
        </div>
        <div id="v-bottom">
          <Features toggleVideo={toggleVideo} toggleAudio={toggleAudio} endCall={endCall} reportId={remoteName?._id} userId={userId} startTime={startTime} />

        </div>
      </div>
    </>
  )
}
export default VideoCallPage

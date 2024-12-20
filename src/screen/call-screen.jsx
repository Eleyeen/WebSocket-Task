import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { RTCIceCandidate, RTCPeerConnection, RTCSessionDescription, mediaDevices } from "react-native-webrtc";
import TextComponent from "../component/global/text-component";
import { Callendicon, Micicon, Profileicon, Speakericon } from "../../static-img-url";
const SIGNALING_SERVER_URL = "wss://app.openhome.xyz/websocket/shared-personality?token=eyJ1c2VyX2lkIjoxLCJwZXJzb25hbGl0eV9pZCI6MzEwNiwiZXhwaXJlc190aW1lIjpudWxsfQ.Z0B7yA.ISehLPk6tuQ1w0xU6En1gBXlvCA&demo=true";

const CallScreen = ({ navigation }) => {
    const [isCallActive, setIsCallActive] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);

    const peerConnection = useRef(null);
    const socket = useRef(null);

    useEffect(() => {
        // Initialize WebSocket connection
        socket.current = new WebSocket(SIGNALING_SERVER_URL);

        socket.current.onopen = () => {
            console.log("WebSocket connected");

            setIsConnected(true);

            startCall();


        };

        socket.current.onmessage = async (message) => {
            const data = JSON.parse(message.data);

            if (data.type === "offer") {
                await handleOffer(data.offer);
            } else if (data.type === "answer") {
                await handleAnswer(data.answer);
            } else if (data.type === "ice-candidate") {
                handleNewICECandidate(data.candidate);
            }
        };

        socket.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };


        return () => {
            if (socket.current) socket.current.close();
        };
    }, []);


    const startCall = async () => {
        try {
            // Ensure peerConnection is not null
            if (!peerConnection.current) {
                console.error("Peer connection is not initialized!");
                return;
            }

            // Create the PeerConnection object
            peerConnection.current = createPeerConnection();
            console.log("Peer connection created");

            // Get local media stream
            const stream = await mediaDevices.getUserMedia({ audio: true, video: false });
            setLocalStream(stream);
            console.log("Local stream initialized");

            // Add tracks to peer connection
            stream.getTracks().forEach((track) => peerConnection.current.addTrack(track, stream));

            // Create an offer
            const offer = await peerConnection.current.createOffer();
            console.log("Offer created:", offer);

            // Set the local description
            setTimeout(async () => {
                try {
                    await peerConnection.current.setLocalDescription(offer);
                    console.log("Local description set successfully:", peerConnection.current.localDescription);
                } catch (error) {
                    console.error("Error setting local description:", error);
                    // Handle error in setting local description
                    return;
                }
                // Send the offer to the signaling server
                socket.current.send(
                    JSON.stringify({ type: "offer", offer: peerConnection.current.localDescription })
                );
                setIsCallActive(true);
            }, 5000);



        } catch (error) {
            console.error("Error starting call:", error);
        }
    };


    const endCall = () => {
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }

        if (localStream) {
            localStream.getTracks().forEach((track) => track.stop());
            setLocalStream(null);
        }

        if (remoteStream) {
            remoteStream.getTracks().forEach((track) => track.stop());
            setRemoteStream(null);
        }
        navigation.pop()

        setIsCallActive(false);
    };

    const createPeerConnection = () => {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                console.log("ICE Candidate:", event.candidate);
                socket.current.send(
                    JSON.stringify({ type: "ice-candidate", candidate: event.candidate })
                );
            }
        };

        pc.ontrack = (event) => {
            console.log("Remote stream added:", event.streams[0]);
            setRemoteStream(event.streams[0]);
        };

        return pc;
    };

    const handleOffer = async (offer) => {
        try {
            peerConnection.current = createPeerConnection();

            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));

            const stream = await mediaDevices.getUserMedia({ audio: true, video: false });
            setLocalStream(stream);
            console.log("Local stream initialized for offer");

            stream.getTracks().forEach((track) => {
                peerConnection.current.addTrack(track, stream);
            });

            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);

            socket.current.send(
                JSON.stringify({ type: "answer", answer: peerConnection.current.localDescription })
            );
        } catch (error) {
            console.error("Error handling offer:", error);
        }
    };

    const handleAnswer = async (answer) => {
        try {
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
            console.log("Remote description set with answer:", answer);
        } catch (error) {
            console.error("Error setting remote description with answer:", error);
        }
    };

    const handleNewICECandidate = (candidate) => {
        if (peerConnection.current) {
            peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
    };

    return (
        <SafeAreaView className="flex-1  bg-white" >
            <View className='flex-1 w-full items-center justify-center'>

                <View className='absolute top-0 '>

                    <TextComponent css="text-[16px] text-center font-[600] text-[#000]" text='Openhome' />
                    <TextComponent css="text-[12px] text-center font-[400]  text-[#000]" text='End-to-end encrypted' />


                </View>

                <View className='mt-[300px]'>
                    <Profileicon width={200} hieght={200} />
                </View>

                <View className='flex-row '>
                    <TouchableOpacity>
                        <Speakericon width={40} hieght={40} />
                    </TouchableOpacity>
                    <TouchableOpacity className='mx-[20]'>
                        <Micicon width={40} hieght={40} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => endCall()} >
                        <Callendicon width={40} hieght={40} />
                    </TouchableOpacity>

                </View>

            </View>


        </SafeAreaView>
    );
};

export default CallScreen;

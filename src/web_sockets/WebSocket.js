import Stomp from "stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export const isStompClientConnected = () => {
  return stompClient !== null;
};

export const connect = () => {
    let socket = new SockJS('http://dev.codespell.live:8090/code-spell/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/code-spell/outgoing/execution-report', function (response) {
            console.log(JSON.parse(response.body).content);
        });
    });
};

export const disconnect = () => {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
};
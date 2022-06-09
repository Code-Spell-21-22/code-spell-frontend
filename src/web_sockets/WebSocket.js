import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { updateOutput, updateId, updateScore, updateSteps, updateExecutionStatus, updateErrors, updateAnalysisStatus } from "../features/code/codeSlice";
import {store} from "../app/store";

let stompClient = null;
let codeId = null;

export const isStompClientConnected = () => {
  return stompClient !== null;
};

export const updateCodeId = (id) => {
    codeId = id;
}

export const connect = () => {

    let socket = new SockJS('https://websockets.dev.codespell.live/code-spell/websocket');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/code-spell/outgoing/execution-report', function (response) {
            // console.log(JSON.parse(response.body));

            const id  = JSON.parse(response.body).id;

            if (codeId && id === codeId) {
                store.dispatch(updateId(id));

                const output = JSON.parse(response.body).output;
                store.dispatch(updateOutput(output));

                const score = JSON.parse(response.body).score;
                store.dispatch(updateScore(score));

                const steps = JSON.parse(response.body).steps;
                store.dispatch(updateSteps(steps));

                const executionStatus = JSON.parse(response.body).executionStatus;
                store.dispatch(updateExecutionStatus(executionStatus));

                const errors = JSON.parse(response.body).errors;
                store.dispatch(updateErrors(errors));

                const analysisStatus = JSON.parse(response.body).analysisStatus;
                store.dispatch(updateAnalysisStatus(analysisStatus));

                codeId = null;
            }
        });
    });
};

export const disconnect = () => {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
};
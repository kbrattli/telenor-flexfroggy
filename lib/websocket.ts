import {Level} from "@/lib/types";
import useWebSocket, { ReadyState } from "react-use-websocket"
import {useEffect, useState} from "react";
import {WebSocketHook} from "react-use-websocket/src/lib/types";

export type WsMessage = {
    action: "start" | "restart" | "fail" | "answer" | "next" | "set" |"countdown";
    content?: string;
}


export const webSocket = (ws:WebSocketHook ) =>{

    const { sendMessage, lastMessage, readyState } = ws;

    const send = (message: WsMessage) => {
        if (readyState === ReadyState.OPEN) {
            sendMessage(JSON.stringify(message));
        } else {
            console.error('WebSocket is not open. Ready state:', readyState);
        }
    }

    const sendStartMessage = () => {
        const msg:WsMessage = {
            action: "start",
        };
        send(msg);
    }

    const sendAnswerMessage = (answer: number) => {
        const msg: WsMessage = {
            action: "answer",
            content: answer.toString(),
        };
        send(msg);
    }

    const sendRestartMessage = () => {
        const msg: WsMessage = {
            action: "restart",
        };
        send(msg);
    }

    const sendFailMessage = () => {
        const msg: WsMessage = {
            action: "fail",
        };
        send(msg);
    }

    const sendNextMessage = (nextLevelInfo: Level) => {
        const msg: WsMessage = {
            action: "next",
            content: JSON.stringify(nextLevelInfo)
        };
        send(msg);
    }
    const sendSetMessage = (levels: number[]) => {
        const msg: WsMessage = {
            action: "set",
            content: levels.toString(),
        };

        send(msg);
    }

    const sendCountdownMessage = () => {
        const msg: WsMessage = {
            action: "countdown",
        };
        send(msg);
    }

    return {
        sendStartMessage,
        sendAnswerMessage,
        sendFailMessage,
        sendRestartMessage,
        sendNextMessage,
        sendSetMessage,
        sendCountdownMessage,
        lastMessage
    }
};
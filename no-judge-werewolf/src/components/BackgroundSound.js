import React from 'react'

import game_start from '../sound/game_start.mp3'
import ancient from '../sound/ancient.mp3'
import savior from '../sound/savior.mp3'
import werewolf from '../sound/werewolf.mp3'
import witch from '../sound/witch.mp3'
import seer from '../sound/seer.mp3'
import game_end from '../sound/game_end.mp3'

class BackgroundSound extends React.Component {
    constructor(props) {
        super(props);

        let audio_queue = [game_start];
        let i = 0;
        for (; i < this.props.orders.length; ++i) {
            let turn = this.props.orders[i];
            if (turn === 'Ancient') {
                audio_queue.push(ancient);
            } else if (turn === 'Savior') {
                audio_queue.push(savior);
            } else if (turn === 'Werewolf') {
                audio_queue.push(werewolf);
            } else if (turn === 'Witch') {
                audio_queue.push(witch);
            }
        }
        // Always include seer and game_end sound
        audio_queue.push(seer);
        audio_queue.push(game_end);

        this.state = {
            start: false,
            audio: new Audio(audio_queue[0]),
            audio_queue: audio_queue,
            audio_index: 0,
        };

        this.state.audio.onended = () => {
            this.setState((prevState) => {
                let next_index = prevState.audio_index + 1;
                this.setState({ audio_index: next_index });
                if (next_index < this.state.audio_queue.length) {
                    this.state.audio.src = this.state.audio_queue[next_index];
                } else {
                    this.state.audio.src = null;
                }
            });
        };
    }

    render() {
        if (this.state.audio_index < this.state.audio_queue.length) {
            this.state.audio.play();
        } else {
            this.state.audio.pause();
        }
        return <div></div>;
    }
}

export default BackgroundSound;
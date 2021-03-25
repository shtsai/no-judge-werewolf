import React from 'react'

import game_start from '../sound/game_start.mp3'
import seer from '../sound/seer.mp3'
import game_end from '../sound/game_end.mp3'

import ancient_start from '../sound/ancient_start.mp3'
import savior_start from '../sound/savior_start.mp3'
import werewolf_start from '../sound/werewolf_start.mp3'
import witch_start from '../sound/witch_start.mp3'
import ancient_end from '../sound/ancient_end.mp3'
import savior_end from '../sound/savior_end.mp3'
import werewolf_end from '../sound/werewolf_end.mp3'
import witch_end from '../sound/witch_end.mp3'


class BackgroundSound extends React.Component {
    constructor(props) {
        super(props);

        let sounds_by_role = {
            'Ancient': {
                "start": ancient_start,
                "end": ancient_end,
            },
            'Savior': {
                "start": savior_start,
                "end": savior_end,
            },
            'Werewolf': {
                "start": werewolf_start,
                "end": werewolf_end,
            },
            'Witch': {
                "start": witch_start,
                "end": witch_end,
            },
        };

        let audio_queues_by_role = {};
        let i = 0;
        for (; i < this.props.orders.length; ++i) {
            let turn = this.props.orders[i];

            let audio_queue = [];
            if (i === 0) {
                audio_queue.push(game_start);
            } else {
                let previous_turn = this.props.orders[i - 1];
                audio_queue.push(sounds_by_role[previous_turn]['end']);
            }
            if (turn in sounds_by_role) {
                audio_queue.push(sounds_by_role[turn]['start']);
            }

            // Last section: Result
            if (i === this.props.orders.length - 1) {
                // Seer doesn't have a round, so inject sound file in Result's turn
                audio_queue.push(seer);
                audio_queue.push(game_end);
            }

            audio_queues_by_role[turn] = audio_queue;
        }

        this.state = {
            start: false,
            audio: new Audio(),
            audio_queues_by_role: audio_queues_by_role,
            audio_queue: [],
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
                this.state.audio.play();
            });
        };

    }

    componentDidUpdate(prevProps) {
        if (this.props.current !== prevProps.current && this.props.current !== null) {
            this.state.audio.pause();

            this.setState(function (state, props) {
                this.state.audio.src = this.state.audio_queues_by_role[props.current][0];
                this.state.audio.play();
                return {
                    audio_queue: this.state.audio_queues_by_role[props.current],
                    audio_index: 0,
                };
            });


        }
    }

    render() {
        return <div></div>;
    }
}

export default BackgroundSound;
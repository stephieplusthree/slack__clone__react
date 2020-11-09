import React, { useEffect, useState } from "react";

import MessageHeader from "./MessageHeader/MessageHeader.component";
import MessageInput from "./MessageInput/MessageInput.component";
import MessageContent from "./MessageContent/MessageContent.component";
import { connect } from "react-redux";
import firebase from "../../server/firebase";
import { Segment, Comment } from "semantic-ui-react";
import "./Messages.css";

const Messages = (props) => {
    const messageRef = firebase.database().ref('messages');

    const [messagesState, setMessagesState] = useState([]);

    useEffect(() => {
        if (props.channel) {
            setMessagesState([]);
            messageRef.child(props.channel.id).on('child_added', (snap) => {
                setMessagesState((currentState) => {
                    let updatedState = [...currentState];
                    updatedState.push(snap.val());
                    return updatedState;
                })
            })

            return () => messageRef.child(props.channel.id).off();
        }
    }, [props.channel])

    const displayMessages = () => {
        if (messagesState.length > 0) {
            return messagesState.map((message) => {
        return (
          <MessageContent key={message.timestamp} message={message} />
        );
      });
    }
  };

  return (
    <div>
      <MessageHeader />
      <Segment className="messagecontent">
        <Comment.Group>{displayMessages()}</Comment.Group>
      </Segment>
      <MessageInput />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    channel: state.channel.currentChannel
  };
};

export default connect(mapStateToProps)(Messages);

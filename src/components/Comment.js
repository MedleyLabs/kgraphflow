import React, { useState } from 'react';
import styled from 'styled-components';

import upvoteIcon from '../assets/arrow-up.svg';
import downvoteIcon from '../assets/arrow-down.svg'
import replyIcon from '../assets/reply-icon.svg'
import downTriangleIcon from '../assets/triangle-down-sharp.png';
import rightTriangleIcon from '../assets/triange-right-sharp.png';

const ToggleIcon = styled.img`
  height: 14px;
  width: 14px;
  margin-right: 5px;
  transform: translateY(1px);
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`

const Column = styled.div`
  flex: 1;
`

const CommentContainer = styled.div``

const CommentHeader = styled.div`
  position: relative;
  margin-bottom: 8px;
`

const CommentBody = styled.div`
  margin-bottom: 8px;
`

const CommentFooter = styled.div`
  position: relative;
  border-bottom: 1px solid lightgray;
  padding-bottom: 5px;
`

const PostedTime = styled.i`
  position: absolute;
  right: 0;
`

const VoteCounter = styled.span`
  margin-right: 10px;
`

const Icon = styled.img`
  height: 10px;
  width: 10px;
`

const ReplyContainer = styled.span`
  position: absolute;
  right: 0;
`

const Comment = ({text, user, time, upvotes, downvotes, replies}) => {

    const [isOpen, setIsOpen] = useState(true);

    const toggleCallback = () => {
        setIsOpen(!isOpen)
    }

    return (
        <Container>
            <Column style={{flex: "0 0 auto"}} onClick={toggleCallback}>
                <ToggleIcon src={isOpen ? downTriangleIcon : rightTriangleIcon}/>
            </Column>
            <Column>
                <CommentContainer>
                    <CommentHeader>
                        <strong>{user}</strong>
                        {!isOpen
                            ? (
                                <>
                                    <VoteCounter style={{position: 'absolute', right: 135}}>
                                        <Icon src={upvoteIcon}/> {upvotes}
                                    </VoteCounter>
                                    <VoteCounter style={{position: 'absolute', right: 100}}>
                                        <Icon src={downvoteIcon}/> {downvotes}
                                    </VoteCounter>
                                </>
                            ): null}
                        <PostedTime>{time}</PostedTime>
                    </CommentHeader>
                    {isOpen
                        ? (
                            <>
                                <CommentBody dangerouslySetInnerHTML={{ __html: text }}/>
                                <CommentFooter>
                                    <VoteCounter>
                                        <Icon src={upvoteIcon}/> {upvotes}
                                    </VoteCounter>
                                    <VoteCounter>
                                        <Icon src={downvoteIcon}/> {downvotes}
                                    </VoteCounter>
                                    <ReplyContainer>
                                        <Icon src={replyIcon}/> Reply
                                    </ReplyContainer>
                                </CommentFooter>
                            </>
                        ) : null
                    }
                </CommentContainer>
                {replies.map((item, i) => (
                    <Comment
                        text={item.text}
                        user={item.user}
                        time={item.time}
                        upvotes={item.upvotes}
                        downvotes={item.downvotes}
                        replies={item.replies}
                        key={i}
                    />
                ))}
            </Column>
        </Container>
    );
};

export default Comment;
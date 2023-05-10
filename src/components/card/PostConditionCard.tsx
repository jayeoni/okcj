import React from 'react';

export interface Condition {
  id: number;
  text: string;
  post: number;
}

interface ConditionCardProps {
  items: Condition;
}

export const PostConditionCard = (props: ConditionCardProps) => {
  const { items } = props;

  return <p>{items.text}</p>;
};

export default PostConditionCard;

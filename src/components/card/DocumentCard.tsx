import React from 'react';

interface Items {
  id: number;
  title: string;
  file?: string; //파일 들어가야
}

interface DocumentCardProps {
  items: Items;
}

export const DocumentCard = (props: DocumentCardProps) => {
  const { items } = props;
  return (
    <div className="wh-20 flex items-center justify-center rounded-lg bg-brand-1 text-white ">
      {items.title}
    </div>
  );
};

export default DocumentCard;

import { useRouter } from 'next/router';
import React from 'react';
import { Icon } from 'src/components/common/Icon';
interface Items {
  id: number;
  title: string;
  url?: string; //서류 발급 사이트
}

interface DocumentCardProps {
  items: Items;
}

export const DocumentCard = (props: DocumentCardProps) => {
  const { items } = props;
  const { push } = useRouter();

  return (
    <div
      className="flex w-max items-center justify-center rounded-lg bg-brand-1 py-0.5 px-2 text-white"
      onClick={() => push(`{items.url}`)}
    >
      <Icon.Paste className="mr-1.5" />
      {items.title}
    </div>
  );
};

export default DocumentCard;

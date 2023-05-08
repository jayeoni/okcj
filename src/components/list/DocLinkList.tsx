import Link from 'next/link';
import React from 'react';

interface DocLink {
  id: number;
  document: string;
  url: string;
}

interface DocLinkListProps {
  items: DocLink;
}

const DocLinkList = (props: DocLinkListProps) => {
  const { items } = props;
  return (
    <Link
      className="m-1.5 flex w-fit flex-col rounded-full border border-brand-1 py-1 px-2 text-start text-brand-1 underline-offset-4 focus:bg-brand-1 focus:text-white"
      href={items.url}
    >
      {items.document}
    </Link>
  );
};

export default DocLinkList;

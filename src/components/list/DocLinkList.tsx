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
      className="ml-3 flex flex-col text-start underline-offset-4 focus:text-brand-1 focus:underline"
      href={items.url}
    >
      {items.document}
    </Link>
  );
};

export default DocLinkList;

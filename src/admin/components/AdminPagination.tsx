import { split } from 'lodash';
import { useRouter } from 'next/router';
import { stringify } from 'qs';
import { ButtonHTMLAttributes, FC, HTMLAttributes } from 'react';
import { DEFAULT_ITEMS_PER_PAGE } from 'src/constants/api';
import { range } from 'src/utils';

export interface AdminPaginationProps extends HTMLAttributes<HTMLDivElement> {}

const AdminPagination: FC<AdminPaginationProps> & {
  Label: FC<PaginationLabelProps>;
  Nav: FC<AdminPaginationNavProps> & { Button: FC<PaginationNavButtonProps> };
} = ({ children, className, ...props }) => {
  return (
    <div className={`pagination ${className}`} {...props}>
      {children}
    </div>
  );
};

export interface PaginationLabelProps
  extends HTMLAttributes<HTMLParagraphElement> {
  count: number;
  total: number;
}

const AdminPaginationLabel: FC<PaginationLabelProps> = ({
  className,
  count,
  total,
  ...props
}) => {
  return (
    <p className={`pagination-label ${className}`} {...props}>
      Count:
      <span className="font-medium"> {count} </span>/ Total:
      <span className="font-medium"> {total} </span>
    </p>
  );
};

export interface AdminPaginationNavProps
  extends HTMLAttributes<HTMLDivElement> {
  basePath: string;
  total: number;
  maxPageSetLength?: number;
}

const AdminPaginationNav: FC<AdminPaginationNavProps> & {
  Button: FC<PaginationNavButtonProps>;
} = ({ className, basePath, total, maxPageSetLength = 7, ...props }) => {
  const router = useRouter();
  const originUrl = split(basePath, '?')[0];
  const { page = 1, limit = DEFAULT_ITEMS_PER_PAGE } = router.query;
  const pageCount = Math.ceil(total / +limit);
  const pageSet = Math.ceil(+page / maxPageSetLength);
  const pageSetLength = Math.min(
    pageCount - (pageSet - 1) * maxPageSetLength,
    maxPageSetLength
  );
  const prevPage = (pageSet - 2) * pageSetLength + 1;
  const nextPage = pageSet * maxPageSetLength + 1;
  const pageQueryString = (page: number) => {
    return stringify(
      {
        ...router.query,
        page,
        limit,
      },
      {
        addQueryPrefix: true,
        encode: false,
      }
    );
  };

  return (
    <nav className={`pagination-nav ${className}`} {...props}>
      <AdminPaginationNavButton
        className="rounded-l-md"
        to={`${originUrl}${pageQueryString(prevPage)}`}
        disabled={prevPage < 1}
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
        </svg>
      </AdminPaginationNavButton>
      {range(pageSetLength, (pageSet - 1) * maxPageSetLength + 1).map((i) => (
        <AdminPaginationNavButton
          key={i}
          to={`${originUrl}${pageQueryString(i)}`}
          selected={i === +page}
        >
          {i}
        </AdminPaginationNavButton>
      ))}
      <AdminPaginationNavButton
        className="rounded-r-md"
        to={`${originUrl}${pageQueryString(nextPage)}`}
        disabled={nextPage > pageCount}
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
        </svg>
      </AdminPaginationNavButton>
    </nav>
  );
};

export interface PaginationNavButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  to?: string;
  selected?: boolean;
}

const AdminPaginationNavButton: FC<PaginationNavButtonProps> = ({
  children,
  className,
  text,
  to,
  selected,
  onClick,
  ...props
}) => {
  const router = useRouter();
  return (
    <button
      className={`pagination-nav-button ${
        selected
          ? 'z-10 border-indigo-500 bg-indigo-50 text-indigo-600'
          : 'z-0 border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
      } ${className}`}
      onClick={to ? () => router.push(to) : onClick}
      {...props}
    >
      {text ?? children}
    </button>
  );
};

AdminPagination.Label = AdminPaginationLabel;
AdminPagination.Nav = AdminPaginationNav;
AdminPaginationNav.Button = AdminPaginationNavButton;

export { AdminPagination as Pagination };

import { FC, HTMLAttributes } from 'react';

export interface AdminCardProps extends HTMLAttributes<HTMLDivElement> {}

export const AdminCard: FC<AdminCardProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
};

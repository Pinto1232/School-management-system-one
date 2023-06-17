// BreadcrumbNavigation.jsx
import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Box } from '@chakra-ui/react';

const BreadcrumbNavigation = ({ items }) => {
  return (
    <Breadcrumb fontWeight="medium" fontSize="sm">
      {items.map((item, index) => (
        <BreadcrumbItem key={item.label} isCurrentPage={index === items.length - 1}>
          <BreadcrumbLink href={item.path}>{item.label}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbNavigation;

import TableOperations from '../../ui/TableOperations.jsx';
import Filter from '../../ui/Filter.jsx';
import SortBy from '../../ui/SortBy.jsx';

export function CabinTableOperations() {
  return (
      <TableOperations>
        <Filter
            filterField={'discount'}
            options={[
              {
                value: 'all',
                label: 'All'
              },
              {
                value: 'no-discount',
                label: 'No discount'
              },
              {
                value: 'with-discount',
                label: 'With discount'
              },
            ]}
        />
        <SortBy
            options={[
              {
                value: 'name-asc',
                label: 'Sort by name (alphabetical)'
              },
              {
                value: 'name-desc',
                label: 'Sort by name (reverse alphabetical)',
              },
              {
                value: 'regularPrice-asc',
                label: 'Sort by date (recent first)',
              },
              {
                value: 'regularPrice-desc',
                label: 'Sort by date (earlier first)',
              },
              {
                value: 'maxCapacity-desc',
                label: 'Sort by amount (high first)',
              },
              {
                value: 'maxCapacity-asc',
                label: 'Sort by amount (low first)'
              },
            ]}
        />
      </TableOperations>
  );
}
